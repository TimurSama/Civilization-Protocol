"use client";

import BlockchainInfoDashboard from "@/components/BlockchainInfoDashboard";
import SmartContractsList from "@/components/SmartContractsList";
import SecurityAuditDashboard from "@/components/SecurityAuditDashboard";

export default function BlockchainPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Blockchain Network Info */}
        <BlockchainInfoDashboard />

        {/* Smart Contracts */}
        <SmartContractsList />

        {/* Security Audit */}
        <SecurityAuditDashboard />
      </div>
    </div>
  );
}







