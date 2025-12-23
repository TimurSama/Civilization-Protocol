"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletState {
    isConnected: boolean;
    address: string | null;
    balances: {
        VODG: number;
        VODP: number;
        VODU: number;
    };
    transactions: Array<{
        id: string;
        type: "send" | "receive" | "stake" | "reward";
        amount: string;
        token: string;
        date: string;
        status: "completed" | "pending";
    }>;
}

interface WalletContextType extends WalletState {
    connect: () => void;
    disconnect: () => void;
    updateBalance: (token: "VODG" | "VODP" | "VODU", amount: number) => void;
    addTransaction: (tx: Omit<WalletState["transactions"][0], "id" | "date" | "status">) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<WalletState>({
        isConnected: false,
        address: null,
        balances: {
            VODG: 1247.50,
            VODP: 5680.25,
            VODU: 12450.75,
        },
        transactions: [
            { id: "1", type: "receive", amount: "500", token: "VODG", date: "2 часа назад", status: "completed" },
            { id: "2", type: "send", amount: "100", token: "VODP", date: "1 день назад", status: "completed" },
        ],
    });

    const connect = () => {
        setState(prev => ({
            ...prev,
            isConnected: true,
            address: "UQ...v8x2",
        }));
    };

    const disconnect = () => {
        setState(prev => ({
            ...prev,
            isConnected: false,
            address: null,
        }));
    };

    const updateBalance = (token: "VODG" | "VODP" | "VODU", amount: number) => {
        setState(prev => ({
            ...prev,
            balances: {
                ...prev.balances,
                [token]: prev.balances[token] + amount,
            },
        }));
    };

    const addTransaction = (tx: Omit<WalletState["transactions"][0], "id" | "date" | "status">) => {
        const newTx = {
            ...tx,
            id: Math.random().toString(36).substr(2, 9),
            date: "Только что",
            status: "completed" as const,
        };
        setState(prev => ({
            ...prev,
            transactions: [newTx, ...prev.transactions],
        }));
    };

    return (
        <WalletContext.Provider value={{ ...state, connect, disconnect, updateBalance, addTransaction }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
