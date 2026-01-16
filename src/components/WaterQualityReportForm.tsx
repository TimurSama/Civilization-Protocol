"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Camera, MapPin, Droplets, Thermometer, AlertTriangle,
  Check, Upload, Trash2, Plus, Send, Loader2, Award,
  Navigation, Beaker, FlaskConical, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface WaterQualityReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (report: WaterReport) => void;
}

interface WaterReport {
  id: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  date: string;
  measurements: {
    ph: number;
    temperature: number;
    turbidity: string;
    odor: string;
    color: string;
  };
  issues: string[];
  description: string;
  photos: string[];
  userId?: string;
}

const translations = {
  ru: {
    title: "Отчёт о качестве воды",
    subtitle: "Помогите нам мониторить водные ресурсы",
    location: "Местоположение",
    locationPlaceholder: "Название места (река, озеро, водоём)",
    useCurrentLocation: "Использовать текущее местоположение",
    measurements: "Измерения",
    ph: "pH уровень",
    temperature: "Температура воды",
    turbidity: "Мутность",
    odor: "Запах",
    color: "Цвет воды",
    turbidityOptions: ["Прозрачная", "Слегка мутная", "Мутная", "Очень мутная"],
    odorOptions: ["Без запаха", "Слабый запах", "Заметный запах", "Сильный запах", "Неприятный"],
    colorOptions: ["Прозрачный", "Желтоватый", "Зеленоватый", "Коричневый", "Другой"],
    issues: "Обнаруженные проблемы",
    issueOptions: [
      "Загрязнение мусором",
      "Масляные пятна",
      "Водоросли",
      "Мёртвая рыба",
      "Неприятный запах",
      "Пена на воде",
      "Изменение цвета",
      "Другое"
    ],
    description: "Описание",
    descriptionPlaceholder: "Опишите состояние водоёма, что вы наблюдали...",
    photos: "Фотографии",
    addPhoto: "Добавить фото",
    maxPhotos: "Максимум 5 фото",
    submit: "Отправить отчёт",
    submitting: "Отправка...",
    success: "Отчёт отправлен!",
    reward: "Вы получите",
    vodReward: "VOD за этот отчёт",
    cancel: "Отмена",
    required: "Обязательное поле",
    photoLimit: "Превышен лимит фото"
  },
  en: {
    title: "Water Quality Report",
    subtitle: "Help us monitor water resources",
    location: "Location",
    locationPlaceholder: "Location name (river, lake, reservoir)",
    useCurrentLocation: "Use current location",
    measurements: "Measurements",
    ph: "pH Level",
    temperature: "Water Temperature",
    turbidity: "Turbidity",
    odor: "Odor",
    color: "Water Color",
    turbidityOptions: ["Clear", "Slightly cloudy", "Cloudy", "Very cloudy"],
    odorOptions: ["No odor", "Slight odor", "Noticeable odor", "Strong odor", "Unpleasant"],
    colorOptions: ["Clear", "Yellowish", "Greenish", "Brown", "Other"],
    issues: "Detected Issues",
    issueOptions: [
      "Trash pollution",
      "Oil stains",
      "Algae",
      "Dead fish",
      "Bad smell",
      "Foam on water",
      "Color change",
      "Other"
    ],
    description: "Description",
    descriptionPlaceholder: "Describe the condition of the water body...",
    photos: "Photos",
    addPhoto: "Add photo",
    maxPhotos: "Maximum 5 photos",
    submit: "Submit Report",
    submitting: "Submitting...",
    success: "Report submitted!",
    reward: "You will receive",
    vodReward: "VOD for this report",
    cancel: "Cancel",
    required: "Required field",
    photoLimit: "Photo limit exceeded"
  },
  ar: {
    title: "تقرير جودة المياه",
    subtitle: "ساعدنا في مراقبة الموارد المائية",
    location: "الموقع",
    locationPlaceholder: "اسم الموقع (نهر، بحيرة، خزان)",
    useCurrentLocation: "استخدم الموقع الحالي",
    measurements: "القياسات",
    ph: "مستوى pH",
    temperature: "درجة حرارة الماء",
    turbidity: "العكارة",
    odor: "الرائحة",
    color: "لون الماء",
    turbidityOptions: ["صافي", "غائم قليلاً", "غائم", "غائم جداً"],
    odorOptions: ["بدون رائحة", "رائحة خفيفة", "رائحة ملحوظة", "رائحة قوية", "رائحة كريهة"],
    colorOptions: ["شفاف", "مصفر", "مخضر", "بني", "آخر"],
    issues: "المشاكل المكتشفة",
    issueOptions: ["تلوث بالقمامة", "بقع زيت", "طحالب", "أسماك ميتة", "رائحة كريهة", "رغوة", "تغير اللون", "أخرى"],
    description: "الوصف",
    descriptionPlaceholder: "صف حالة المسطح المائي...",
    photos: "الصور",
    addPhoto: "إضافة صورة",
    maxPhotos: "حد أقصى 5 صور",
    submit: "إرسال التقرير",
    submitting: "جاري الإرسال...",
    success: "تم إرسال التقرير!",
    reward: "ستحصل على",
    vodReward: "VOD لهذا التقرير",
    cancel: "إلغاء",
    required: "حقل مطلوب",
    photoLimit: "تم تجاوز حد الصور"
  }
};

export default function WaterQualityReportForm({ isOpen, onClose, onSubmit }: WaterQualityReportFormProps) {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.ru;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    locationName: "",
    lat: 0,
    lng: 0,
    ph: 7,
    temperature: 20,
    turbidity: t.turbidityOptions[0],
    odor: t.odorOptions[0],
    color: t.colorOptions[0],
    issues: [] as string[],
    description: "",
    photos: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (formData.photos.length + files.length > 5) {
      alert(t.photoLimit);
      return;
    }

    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) return; // 10MB limit

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const toggleIssue = (issue: string) => {
    setFormData(prev => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue]
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }));
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsGettingLocation(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.locationName.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const report: WaterReport = {
      id: `report-${Date.now()}`,
      location: {
        name: formData.locationName,
        lat: formData.lat,
        lng: formData.lng
      },
      date: new Date().toISOString(),
      measurements: {
        ph: formData.ph,
        temperature: formData.temperature,
        turbidity: formData.turbidity,
        odor: formData.odor,
        color: formData.color
      },
      issues: formData.issues,
      description: formData.description,
      photos: formData.photos,
      userId: user?.id
    };

    if (onSubmit) {
      onSubmit(report);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setFormData({
        locationName: "",
        lat: 0,
        lng: 0,
        ph: 7,
        temperature: 20,
        turbidity: t.turbidityOptions[0],
        odor: t.odorOptions[0],
        color: t.colorOptions[0],
        issues: [],
        description: "",
        photos: []
      });
    }, 2000);
  };

  const rewardAmount = 50 + (formData.photos.length * 10) + (formData.issues.length * 5);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass-card p-6 max-w-2xl w-full my-8"
            onClick={e => e.stopPropagation()}
          >
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500 mx-auto mb-6 flex items-center justify-center">
                  <Check size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4">{t.success}</h2>
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <Award size={24} />
                  <span className="text-xl font-bold">+{rewardAmount} VOD</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Droplets className="text-cyan-glow" />
                      {t.title}
                    </h2>
                    <p className="text-slate-400 text-sm">{t.subtitle}</p>
                  </div>
                  <button type="button" onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                {/* Reward Preview */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="text-yellow-400" size={24} />
                    <div>
                      <div className="text-sm text-slate-400">{t.reward}</div>
                      <div className="font-bold text-yellow-400">{rewardAmount} {t.vodReward}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    +10 VOD / фото • +5 VOD / проблема
                  </div>
                </div>

                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                      <MapPin size={16} className="text-cyan-glow" />
                      {t.location} *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.locationName}
                        onChange={e => setFormData(prev => ({ ...prev, locationName: e.target.value }))}
                        placeholder={t.locationPlaceholder}
                        required
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={isGettingLocation}
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        {isGettingLocation ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Navigation size={16} />
                        )}
                      </button>
                    </div>
                    {formData.lat !== 0 && (
                      <div className="text-xs text-slate-500 mt-1">
                        📍 {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
                      </div>
                    )}
                  </div>

                  {/* Measurements */}
                  <div>
                    <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                      <FlaskConical size={16} className="text-purple-400" />
                      {t.measurements}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* pH */}
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">{t.ph}</label>
                        <input
                          type="number"
                          min="0"
                          max="14"
                          step="0.1"
                          value={formData.ph}
                          onChange={e => setFormData(prev => ({ ...prev, ph: parseFloat(e.target.value) }))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-center focus:border-cyan-glow/50 focus:outline-none"
                        />
                      </div>

                      {/* Temperature */}
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">{t.temperature}</label>
                        <div className="relative">
                          <input
                            type="number"
                            min="-10"
                            max="50"
                            value={formData.temperature}
                            onChange={e => setFormData(prev => ({ ...prev, temperature: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-center focus:border-cyan-glow/50 focus:outline-none"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">°C</span>
                        </div>
                      </div>

                      {/* Turbidity */}
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">{t.turbidity}</label>
                        <select
                          value={formData.turbidity}
                          onChange={e => setFormData(prev => ({ ...prev, turbidity: e.target.value }))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-glow/50 focus:outline-none"
                        >
                          {t.turbidityOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Odor */}
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">{t.odor}</label>
                        <select
                          value={formData.odor}
                          onChange={e => setFormData(prev => ({ ...prev, odor: e.target.value }))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-glow/50 focus:outline-none"
                        >
                          {t.odorOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Issues */}
                  <div>
                    <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                      <AlertTriangle size={16} className="text-orange-400" />
                      {t.issues}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {t.issueOptions.map(issue => (
                        <button
                          key={issue}
                          type="button"
                          onClick={() => toggleIssue(issue)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm transition-colors",
                            formData.issues.includes(issue)
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                          )}
                        >
                          {issue}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-bold mb-2">{t.description}</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={t.descriptionPlaceholder}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-glow/50 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Photos */}
                  <div>
                    <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                      <Camera size={16} className="text-emerald-400" />
                      {t.photos}
                      <span className="text-xs text-slate-500 font-normal">({formData.photos.length}/5)</span>
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden group">
                          <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Trash2 size={20} className="text-red-400" />
                          </button>
                        </div>
                      ))}
                      {formData.photos.length < 5 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-20 h-20 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-1 hover:border-cyan-glow/50 transition-colors"
                        >
                          <Plus size={20} className="text-slate-400" />
                          <span className="text-[10px] text-slate-500">{t.addPhoto}</span>
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors font-bold"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.locationName.trim()}
                    className="flex-1 py-3 bg-cyan-glow text-ocean-deep rounded-xl hover:scale-105 transition-transform font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t.submit}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

























