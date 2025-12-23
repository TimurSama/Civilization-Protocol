"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Satellite, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { waterGISData, GISPoint } from "@/lib/gis-data";

function AtmosphereShader({ mode }: { mode: "standard" | "satellite" | "ecology" | "infra" }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: {
            value: new THREE.Color(
                mode === "standard" ? "#22d3ee" :
                    mode === "satellite" ? "#facc15" :
                        mode === "ecology" ? "#10b981" : "#3b82f6"
            )
        },
        uOpacity: { value: 0.2 }
    }), [mode]);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2.15, 64, 64]} />
            <shaderMaterial
                transparent
                side={THREE.BackSide}
                uniforms={uniforms}
                vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
                fragmentShader={`
          varying vec3 vNormal;
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uOpacity;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
            gl_FragColor = vec4(uColor, intensity * uOpacity * pulse);
          }
        `}
            />
        </mesh>
    );
}

function Hotspot({ position, data }: { position: [number, number, number], data: GISPoint }) {
    const [hovered, setHovered] = useState(false);

    const color = data.status === "critical" ? "#ef4444" : data.status === "warning" ? "#facc15" : "#22d3ee";

    return (
        <group position={position}>
            <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>
            <mesh scale={[2, 2, 2]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.2} />
            </mesh>

            {hovered && (
                <Html distanceFactor={10}>
                    <div className="glass p-4 rounded-2xl border border-white/20 min-w-[200px] pointer-events-none shadow-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                {data.type}
                            </div>
                            <div className={cn(
                                "w-2 h-2 rounded-full animate-pulse",
                                data.status === 'critical' ? 'bg-red-500' : data.status === 'warning' ? 'bg-yellow-400' : 'bg-cyan-glow'
                            )} />
                        </div>
                        <div className="text-sm font-black mb-1">{data.name}</div>
                        <p className="text-[10px] text-slate-400 mb-3 leading-tight italic">"{data.description}"</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span>ИНДЕКС СОСТОЯНИЯ</span>
                                <span className="text-cyan-glow">{data.value}%</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-glow" style={{ width: `${data.value}%` }} />
                            </div>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

function World({ mode }: { mode: "standard" | "satellite" | "ecology" | "infra" }) {
    const globeRef = useRef<THREE.Mesh>(null!);

    // Загрузка текстур
    const [map, normalMap, roughnessMap, nightMap] = useLoader(THREE.TextureLoader, [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png"
    ]);

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.0015;
        }
    });

    return (
        <group>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh ref={globeRef}>
                    <sphereGeometry args={[2, 64, 64]} />
                    <meshStandardMaterial
                        map={map}
                        normalMap={normalMap}
                        roughnessMap={roughnessMap}
                        roughness={0.7}
                        metalness={0.2}
                        emissive={mode === "satellite" ? "#facc15" : "#22d3ee"}
                        emissiveMap={nightMap}
                        emissiveIntensity={mode === "standard" ? 0.5 : 1.5}
                        transparent={mode === "ecology" || mode === "infra"}
                        opacity={mode === "ecology" || mode === "infra" ? 0.6 : 1}
                    />

                    {/* Дополнительный слой для экологии/инфраструктуры */}
                    {(mode === "ecology" || mode === "infra") && (
                        <mesh scale={[1.01, 1.01, 1.01]}>
                            <sphereGeometry args={[2, 64, 64]} />
                            <meshStandardMaterial
                                wireframe
                                color={mode === "ecology" ? "#10b981" : "#3b82f6"}
                                transparent
                                opacity={0.3}
                            />
                        </mesh>
                    )}

                    {/* Hotspots */}
                    {waterGISData.map((m) => {
                        const phi = (90 - m.lat) * (Math.PI / 180);
                        const theta = (m.lon + 180) * (Math.PI / 180);
                        const x = -(2 * Math.sin(phi) * Math.cos(theta));
                        const z = (2 * Math.sin(phi) * Math.sin(theta));
                        const y = (2 * Math.cos(phi));

                        // Фильтрация по типу в зависимости от режима
                        if (mode === "ecology" && m.type !== "ecology" && m.type !== "river") return null;
                        if (mode === "infra" && m.type !== "dam" && m.type !== "industrial" && m.type !== "irrigation") return null;

                        return <Hotspot key={m.id} position={[x, y, z]} data={m} />;
                    })}
                </mesh>
            </Float>

            <AtmosphereShader mode={mode} />

            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color={mode === "standard" ? "#22d3ee" : "#facc15"} />
        </group>
    );
}

export default function Globe3D() {
    const [viewMode, setViewMode] = useState<"standard" | "satellite" | "ecology" | "infra">("standard");

    return (
        <div className="w-full h-full relative group">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
                <World mode={viewMode} />
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3.5}
                    maxDistance={8}
                    rotateSpeed={0.5}
                    autoRotate={false}
                />
            </Canvas>

            {/* Controls Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 z-20 justify-center md:justify-start">
                {[
                    { id: "standard", label: "Стандарт", icon: Globe, color: "cyan" },
                    { id: "satellite", label: "AI Спутник", icon: Satellite, color: "yellow" },
                    { id: "ecology", label: "Экология", icon: Activity, color: "emerald" },
                    { id: "infra", label: "Инфраструктура", icon: Zap, color: "blue" }
                ].map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => setViewMode(btn.id as any)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            viewMode === btn.id
                                ? `bg-${btn.color}-500 text-ocean-deep shadow-[0_0_20px_rgba(var(--${btn.color}-glow),0.5)]`
                                : "glass text-slate-400 hover:bg-white/5"
                        )}
                    >
                        <btn.icon size={14} /> {btn.label}
                    </button>
                ))}
            </div>

            <div className="absolute top-6 right-6 z-20 hidden md:block">
                <div className="glass px-4 py-2 rounded-xl flex flex-col items-end gap-1 border-cyan-glow/20">
                    <div className="flex items-center gap-2">
                        <Zap className="text-cyan-glow animate-pulse" size={14} />
                        <span className="text-[10px] font-black text-cyan-glow uppercase tracking-widest">GIS Engine Active</span>
                    </div>
                    <div className="text-[8px] text-slate-500 font-bold">DATA SOURCE: FAO / WRI / WORLD BANK</div>
                </div>
            </div>
        </div>
    );
}
