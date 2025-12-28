"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code, FileJson, ChevronRight, ChevronDown, Copy, Check,
  Lock, Globe, Zap, Database, Users, MessageSquare, Vote,
  Wallet, Shield, Search, Filter, Book, ExternalLink, Server
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  description: string;
  auth: boolean;
  parameters?: {
    name: string;
    in: "path" | "query" | "body" | "header";
    type: string;
    required: boolean;
    description: string;
  }[];
  requestBody?: {
    type: string;
    properties: Record<string, { type: string; required?: boolean; description: string }>;
  };
  responses: Record<string, {
    description: string;
    example?: unknown;
  }>;
}

interface APIGroup {
  name: string;
  icon: React.ReactNode;
  description: string;
  endpoints: Endpoint[];
}

const apiGroups: APIGroup[] = [
  {
    name: "Authentication",
    icon: <Lock size={20} />,
    description: "User authentication and session management",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/register",
        summary: "Register new user",
        description: "Create a new user account with email and password or wallet address",
        auth: false,
        requestBody: {
          type: "object",
          properties: {
            email: { type: "string", required: true, description: "User email address" },
            password: { type: "string", required: true, description: "User password (min 8 chars)" },
            username: { type: "string", required: true, description: "Unique username" },
            role: { type: "string", description: "User role (citizen, investor, scientist, etc.)" },
            referralCode: { type: "string", description: "Optional referral code" }
          }
        },
        responses: {
          "201": { 
            description: "User created successfully",
            example: { user: { id: "1", username: "user1", email: "user@example.com" }, token: "jwt_token_here" }
          },
          "400": { description: "Invalid input data" },
          "409": { description: "User already exists" }
        }
      },
      {
        method: "POST",
        path: "/api/auth/login",
        summary: "User login",
        description: "Authenticate user with email/password and get JWT token",
        auth: false,
        requestBody: {
          type: "object",
          properties: {
            email: { type: "string", required: true, description: "User email" },
            password: { type: "string", required: true, description: "User password" }
          }
        },
        responses: {
          "200": { 
            description: "Login successful",
            example: { token: "jwt_token_here", user: { id: "1", username: "user1" } }
          },
          "401": { description: "Invalid credentials" }
        }
      },
      {
        method: "POST",
        path: "/api/auth/telegram",
        summary: "Telegram login",
        description: "Authenticate via Telegram Mini App",
        auth: false,
        requestBody: {
          type: "object",
          properties: {
            initData: { type: "string", required: true, description: "Telegram WebApp initData" }
          }
        },
        responses: {
          "200": { description: "Login successful" },
          "401": { description: "Invalid Telegram data" }
        }
      },
      {
        method: "GET",
        path: "/api/auth/me",
        summary: "Get current user",
        description: "Get authenticated user profile",
        auth: true,
        responses: {
          "200": { 
            description: "User profile",
            example: { id: "1", username: "user1", email: "user@example.com", role: "citizen", vodBalance: 1000, xp: 250 }
          },
          "401": { description: "Unauthorized" }
        }
      },
      {
        method: "POST",
        path: "/api/auth/verify-email",
        summary: "Verify email",
        description: "Verify user email with token",
        auth: false,
        parameters: [
          { name: "token", in: "query", type: "string", required: true, description: "Verification token" }
        ],
        responses: {
          "200": { description: "Email verified" },
          "400": { description: "Invalid token" }
        }
      }
    ]
  },
  {
    name: "Users",
    icon: <Users size={20} />,
    description: "User profiles and social features",
    endpoints: [
      {
        method: "GET",
        path: "/api/users",
        summary: "List users",
        description: "Get paginated list of users",
        auth: false,
        parameters: [
          { name: "page", in: "query", type: "number", required: false, description: "Page number (default: 1)" },
          { name: "limit", in: "query", type: "number", required: false, description: "Items per page (default: 20)" },
          { name: "role", in: "query", type: "string", required: false, description: "Filter by role" }
        ],
        responses: {
          "200": { description: "List of users" }
        }
      },
      {
        method: "GET",
        path: "/api/users/{id}",
        summary: "Get user profile",
        description: "Get public profile of a specific user",
        auth: false,
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "User ID" }
        ],
        responses: {
          "200": { description: "User profile" },
          "404": { description: "User not found" }
        }
      },
      {
        method: "PUT",
        path: "/api/users/{id}",
        summary: "Update profile",
        description: "Update user profile (authenticated user only)",
        auth: true,
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "User ID" }
        ],
        requestBody: {
          type: "object",
          properties: {
            username: { type: "string", description: "New username" },
            bio: { type: "string", description: "User bio" },
            avatar: { type: "string", description: "Avatar URL" }
          }
        },
        responses: {
          "200": { description: "Profile updated" },
          "403": { description: "Forbidden" }
        }
      },
      {
        method: "GET",
        path: "/api/users/search",
        summary: "Search users",
        description: "Search users by username or email",
        auth: false,
        parameters: [
          { name: "q", in: "query", type: "string", required: true, description: "Search query" }
        ],
        responses: {
          "200": { description: "Search results" }
        }
      }
    ]
  },
  {
    name: "Posts",
    icon: <MessageSquare size={20} />,
    description: "Social posts and content",
    endpoints: [
      {
        method: "GET",
        path: "/api/posts",
        summary: "List posts",
        description: "Get paginated feed of posts",
        auth: false,
        parameters: [
          { name: "page", in: "query", type: "number", required: false, description: "Page number" },
          { name: "limit", in: "query", type: "number", required: false, description: "Items per page" },
          { name: "tag", in: "query", type: "string", required: false, description: "Filter by tag" }
        ],
        responses: {
          "200": { 
            description: "List of posts",
            example: { posts: [{ id: "1", content: "Hello world", author: { username: "user1" }, likes: 10 }], total: 100 }
          }
        }
      },
      {
        method: "POST",
        path: "/api/posts",
        summary: "Create post",
        description: "Create new post",
        auth: true,
        requestBody: {
          type: "object",
          properties: {
            content: { type: "string", required: true, description: "Post content" },
            tags: { type: "array", description: "List of hashtags" },
            media: { type: "array", description: "Media URLs" }
          }
        },
        responses: {
          "201": { description: "Post created" },
          "401": { description: "Unauthorized" }
        }
      },
      {
        method: "POST",
        path: "/api/posts/{id}/like",
        summary: "Like/unlike post",
        description: "Toggle like on a post",
        auth: true,
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "Post ID" }
        ],
        responses: {
          "200": { description: "Like toggled" }
        }
      },
      {
        method: "POST",
        path: "/api/posts/{id}/comments",
        summary: "Add comment",
        description: "Add comment to a post",
        auth: true,
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "Post ID" }
        ],
        requestBody: {
          type: "object",
          properties: {
            content: { type: "string", required: true, description: "Comment text" }
          }
        },
        responses: {
          "201": { description: "Comment added" }
        }
      }
    ]
  },
  {
    name: "DAO & Governance",
    icon: <Vote size={20} />,
    description: "DAO proposals and voting",
    endpoints: [
      {
        method: "GET",
        path: "/api/dao/proposals",
        summary: "List proposals",
        description: "Get all DAO proposals",
        auth: false,
        parameters: [
          { name: "status", in: "query", type: "string", required: false, description: "Filter by status (active, passed, rejected)" },
          { name: "category", in: "query", type: "string", required: false, description: "Filter by category" }
        ],
        responses: {
          "200": { description: "List of proposals" }
        }
      },
      {
        method: "POST",
        path: "/api/dao/proposals",
        summary: "Create proposal",
        description: "Submit new DAO proposal",
        auth: true,
        requestBody: {
          type: "object",
          properties: {
            title: { type: "string", required: true, description: "Proposal title" },
            description: { type: "string", required: true, description: "Detailed description" },
            category: { type: "string", required: true, description: "Proposal category" },
            votingPeriod: { type: "number", description: "Voting period in days (default: 7)" }
          }
        },
        responses: {
          "201": { description: "Proposal created" },
          "403": { description: "Insufficient voting power" }
        }
      },
      {
        method: "POST",
        path: "/api/dao/proposals/{id}/vote",
        summary: "Cast vote",
        description: "Vote on a proposal",
        auth: true,
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "Proposal ID" }
        ],
        requestBody: {
          type: "object",
          properties: {
            choice: { type: "string", required: true, description: "Vote choice: for, against, abstain" },
            votingPower: { type: "number", description: "Voting power to use" }
          }
        },
        responses: {
          "200": { description: "Vote cast" },
          "400": { description: "Already voted or voting closed" }
        }
      },
      {
        method: "POST",
        path: "/api/dao/delegate",
        summary: "Delegate votes",
        description: "Delegate voting power to another address",
        auth: true,
        requestBody: {
          type: "object",
          properties: {
            delegateTo: { type: "string", required: true, description: "Delegate address" },
            amount: { type: "number", description: "Amount to delegate (default: all)" }
          }
        },
        responses: {
          "200": { description: "Delegation successful" }
        }
      }
    ]
  },
  {
    name: "Tokens & Wallet",
    icon: <Wallet size={20} />,
    description: "Token operations and wallet management",
    endpoints: [
      {
        method: "GET",
        path: "/api/tokens",
        summary: "Get balances",
        description: "Get user token balances",
        auth: true,
        responses: {
          "200": { 
            description: "Token balances",
            example: { VODG: 1000, VODP: 500, VODU: 250, stakingBalance: 100 }
          }
        }
      },
      {
        method: "POST",
        path: "/api/tokens",
        summary: "Token operations",
        description: "Perform token operations (transfer, stake, claim)",
        auth: true,
        requestBody: {
          type: "object",
          properties: {
            action: { type: "string", required: true, description: "Action: transfer, stake, unstake, claim_reward" },
            amount: { type: "number", required: true, description: "Amount of tokens" },
            recipient: { type: "string", description: "Recipient address (for transfer)" },
            tokenType: { type: "string", description: "Token type: VODG, VODP, VODU" }
          }
        },
        responses: {
          "200": { description: "Operation successful" },
          "400": { description: "Insufficient balance" }
        }
      },
      {
        method: "GET",
        path: "/api/transactions",
        summary: "Transaction history",
        description: "Get user transaction history",
        auth: true,
        parameters: [
          { name: "type", in: "query", type: "string", required: false, description: "Filter by type" },
          { name: "limit", in: "query", type: "number", required: false, description: "Number of transactions" }
        ],
        responses: {
          "200": { description: "Transaction list" }
        }
      }
    ]
  },
  {
    name: "Rewards",
    icon: <Zap size={20} />,
    description: "Rewards, missions, and achievements",
    endpoints: [
      {
        method: "GET",
        path: "/api/rewards",
        summary: "Get rewards",
        description: "Get available rewards and user achievements",
        auth: true,
        responses: {
          "200": { 
            description: "Rewards data",
            example: { availableRewards: 50, totalEarned: 500, missions: [], badges: [] }
          }
        }
      },
      {
        method: "POST",
        path: "/api/rewards/claim",
        summary: "Claim reward",
        description: "Claim available reward",
        auth: true,
        requestBody: {
          type: "object",
          properties: {
            rewardId: { type: "string", required: true, description: "Reward ID to claim" }
          }
        },
        responses: {
          "200": { description: "Reward claimed" }
        }
      },
      {
        method: "POST",
        path: "/api/rewards/mission/{id}/complete",
        summary: "Complete mission",
        description: "Mark mission as completed",
        auth: true,
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "Mission ID" }
        ],
        responses: {
          "200": { description: "Mission completed, reward granted" }
        }
      }
    ]
  },
  {
    name: "Groups",
    icon: <Users size={20} />,
    description: "Community groups and discussions",
    endpoints: [
      {
        method: "GET",
        path: "/api/groups",
        summary: "List groups",
        description: "Get community groups",
        auth: false,
        responses: {
          "200": { description: "List of groups" }
        }
      },
      {
        method: "POST",
        path: "/api/groups",
        summary: "Create group",
        description: "Create new community group",
        auth: true,
        requestBody: {
          type: "object",
          properties: {
            name: { type: "string", required: true, description: "Group name" },
            description: { type: "string", description: "Group description" },
            category: { type: "string", description: "Group category" },
            isPrivate: { type: "boolean", description: "Private group flag" }
          }
        },
        responses: {
          "201": { description: "Group created" }
        }
      },
      {
        method: "POST",
        path: "/api/groups/{id}/join",
        summary: "Join group",
        description: "Join a community group",
        auth: true,
        parameters: [
          { name: "id", in: "path", type: "string", required: true, description: "Group ID" }
        ],
        responses: {
          "200": { description: "Joined group" }
        }
      }
    ]
  },
  {
    name: "GIS & Data",
    icon: <Globe size={20} />,
    description: "Geographic and environmental data",
    endpoints: [
      {
        method: "GET",
        path: "/api/gis/points",
        summary: "Get GIS points",
        description: "Get water infrastructure points",
        auth: false,
        parameters: [
          { name: "region", in: "query", type: "string", required: false, description: "Filter by region" },
          { name: "type", in: "query", type: "string", required: false, description: "Point type (sensor, facility, etc.)" }
        ],
        responses: {
          "200": { description: "GIS points data" }
        }
      },
      {
        method: "POST",
        path: "/api/gis/reports",
        summary: "Submit water report",
        description: "Submit water quality report",
        auth: true,
        requestBody: {
          type: "object",
          properties: {
            location: { type: "object", required: true, description: "{ lat, lng }" },
            metrics: { type: "object", description: "Water quality metrics (pH, oxygen, etc.)" },
            description: { type: "string", description: "Report description" },
            images: { type: "array", description: "Image URLs" }
          }
        },
        responses: {
          "201": { description: "Report submitted" }
        }
      }
    ]
  }
];

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  PATCH: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

export default function APIDocsPage() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("Authentication");
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredGroups = apiGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.endpoints.some(e => 
      e.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-ocean-deep py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Server className="text-cyan-glow" size={40} />
            <h1 className="text-5xl font-black">API Documentation</h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Complete REST API reference for VODeco platform integration
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="px-4 py-2 glass rounded-xl flex items-center gap-2">
              <span className="text-slate-500">Base URL:</span>
              <code className="text-cyan-glow">https://api.vodeco.app/v1</code>
            </div>
            <div className="px-4 py-2 glass rounded-xl flex items-center gap-2">
              <span className="text-slate-500">Version:</span>
              <code className="text-cyan-glow">1.0.0</code>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative max-w-xl mx-auto mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search endpoints..."
            className="w-full pl-12 pr-4 py-4 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </motion.div>

        {/* Quick Auth Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8 border-cyan-500/20"
        >
          <div className="flex items-start gap-4">
            <Shield className="text-cyan-glow shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2">Authentication</h3>
              <p className="text-slate-400 text-sm mb-4">
                All authenticated endpoints require a JWT token in the Authorization header.
              </p>
              <div className="bg-black/30 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                <code className="text-cyan-glow">Authorization: Bearer {"<your_jwt_token>"}</code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Groups */}
        <div className="space-y-4">
          {filteredGroups.map((group, groupIndex) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="glass-card overflow-hidden"
            >
              {/* Group Header */}
              <button
                onClick={() => setExpandedGroup(expandedGroup === group.name ? null : group.name)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-glow">
                    {group.icon}
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold">{group.name}</h2>
                    <p className="text-sm text-slate-500">{group.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{group.endpoints.length} endpoints</span>
                  {expandedGroup === group.name ? <ChevronDown /> : <ChevronRight />}
                </div>
              </button>

              {/* Endpoints */}
              <AnimatePresence>
                {expandedGroup === group.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5"
                  >
                    {group.endpoints.map((endpoint, endpointIndex) => {
                      const endpointId = `${group.name}-${endpointIndex}`;
                      const isExpanded = expandedEndpoint === endpointId;

                      return (
                        <div key={endpointId} className="border-b border-white/5 last:border-0">
                          <button
                            onClick={() => setExpandedEndpoint(isExpanded ? null : endpointId)}
                            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className={cn(
                                "px-3 py-1 rounded-lg text-xs font-bold border",
                                methodColors[endpoint.method]
                              )}>
                                {endpoint.method}
                              </span>
                              <code className="text-sm font-mono text-slate-300">{endpoint.path}</code>
                              {endpoint.auth && (
                                <Lock size={14} className="text-yellow-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-500 hidden md:block">{endpoint.summary}</span>
                              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4"
                              >
                                <div className="p-4 bg-black/20 rounded-xl space-y-4">
                                  <p className="text-slate-400">{endpoint.description}</p>

                                  {/* Parameters */}
                                  {endpoint.parameters && endpoint.parameters.length > 0 && (
                                    <div>
                                      <h4 className="font-bold text-sm mb-2">Parameters</h4>
                                      <div className="space-y-2">
                                        {endpoint.parameters.map((param, i) => (
                                          <div key={i} className="flex items-start gap-4 text-sm">
                                            <code className="text-cyan-glow min-w-[100px]">{param.name}</code>
                                            <span className="text-slate-600">{param.in}</span>
                                            <span className="text-slate-500">{param.type}</span>
                                            {param.required && <span className="text-red-400 text-xs">required</span>}
                                            <span className="text-slate-400">{param.description}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Request Body */}
                                  {endpoint.requestBody && (
                                    <div>
                                      <h4 className="font-bold text-sm mb-2">Request Body</h4>
                                      <div className="bg-black/30 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                                        <pre>{JSON.stringify(endpoint.requestBody.properties, null, 2)}</pre>
                                      </div>
                                    </div>
                                  )}

                                  {/* Responses */}
                                  <div>
                                    <h4 className="font-bold text-sm mb-2">Responses</h4>
                                    <div className="space-y-2">
                                      {Object.entries(endpoint.responses).map(([code, response]) => (
                                        <div key={code} className="flex items-start gap-4">
                                          <span className={cn(
                                            "px-2 py-0.5 rounded text-xs font-bold",
                                            code.startsWith("2") ? "bg-emerald-500/20 text-emerald-400" :
                                            code.startsWith("4") ? "bg-yellow-500/20 text-yellow-400" :
                                            "bg-red-500/20 text-red-400"
                                          )}>
                                            {code}
                                          </span>
                                          <span className="text-sm text-slate-400">{response.description}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Example */}
                                  {Object.values(endpoint.responses).some(r => r.example) && (
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-sm">Example Response</h4>
                                        <button
                                          onClick={() => copyCode(JSON.stringify(Object.values(endpoint.responses).find(r => r.example)?.example, null, 2), endpointId)}
                                          className="text-xs text-slate-500 hover:text-cyan-glow flex items-center gap-1"
                                        >
                                          {copiedCode === endpointId ? <Check size={12} /> : <Copy size={12} />}
                                          {copiedCode === endpointId ? "Copied!" : "Copy"}
                                        </button>
                                      </div>
                                      <div className="bg-black/30 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                                        <pre className="text-emerald-400">
                                          {JSON.stringify(Object.values(endpoint.responses).find(r => r.example)?.example, null, 2)}
                                        </pre>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* SDKs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 glass-card p-8 text-center"
        >
          <Book className="mx-auto mb-4 text-cyan-glow" size={40} />
          <h2 className="text-2xl font-black mb-4">SDKs & Libraries</h2>
          <p className="text-slate-400 mb-6">Official SDKs for easy integration</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["JavaScript", "Python", "Go", "Rust"].map(sdk => (
              <div key={sdk} className="px-6 py-3 glass rounded-xl flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                <Code size={18} />
                {sdk}
                <ExternalLink size={14} className="text-slate-500" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


