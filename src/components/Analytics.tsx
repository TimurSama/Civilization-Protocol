"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Analytics configuration
const ANALYTICS_CONFIG = {
  // Plausible Analytics (privacy-friendly)
  plausible: {
    enabled: process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED === "true",
    domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "vodeco.org",
    apiHost: process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || "https://plausible.io"
  },
  // Google Analytics (optional)
  ga: {
    enabled: process.env.NEXT_PUBLIC_GA_ENABLED === "true",
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
  },
  // Internal analytics
  internal: {
    enabled: true
  }
};

// Track page views
function trackPageView(url: string) {
  // Plausible
  if (ANALYTICS_CONFIG.plausible.enabled && typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible("pageview");
  }

  // Google Analytics
  if (ANALYTICS_CONFIG.ga.enabled && typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", ANALYTICS_CONFIG.ga.measurementId, {
      page_path: url,
    });
  }

  // Internal analytics - store in localStorage for demo
  if (ANALYTICS_CONFIG.internal.enabled) {
    const analytics = JSON.parse(localStorage.getItem("vodeco_analytics") || "{}");
    const today = new Date().toISOString().split("T")[0];
    
    if (!analytics.pageViews) analytics.pageViews = {};
    if (!analytics.pageViews[today]) analytics.pageViews[today] = {};
    if (!analytics.pageViews[today][url]) analytics.pageViews[today][url] = 0;
    
    analytics.pageViews[today][url]++;
    analytics.lastVisit = new Date().toISOString();
    analytics.totalViews = (analytics.totalViews || 0) + 1;
    
    localStorage.setItem("vodeco_analytics", JSON.stringify(analytics));
  }
}

// Track custom events
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  // Plausible
  if (ANALYTICS_CONFIG.plausible.enabled && typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(eventName, { props: properties });
  }

  // Google Analytics
  if (ANALYTICS_CONFIG.ga.enabled && typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, properties);
  }

  // Internal analytics
  if (ANALYTICS_CONFIG.internal.enabled) {
    const analytics = JSON.parse(localStorage.getItem("vodeco_analytics") || "{}");
    if (!analytics.events) analytics.events = [];
    
    analytics.events.push({
      name: eventName,
      properties,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 events
    if (analytics.events.length > 100) {
      analytics.events = analytics.events.slice(-100);
    }
    
    localStorage.setItem("vodeco_analytics", JSON.stringify(analytics));
  }

  // Debug log in development
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Analytics Event:", eventName, properties);
  }
}

// Common event helpers
export const analyticsEvents = {
  // User actions
  userRegistered: (method: string) => trackEvent("user_registered", { method }),
  userLoggedIn: (method: string) => trackEvent("user_logged_in", { method }),
  userLoggedOut: () => trackEvent("user_logged_out"),
  
  // Social actions
  postCreated: (type: string) => trackEvent("post_created", { type }),
  postLiked: (postId: string) => trackEvent("post_liked", { post_id: postId }),
  postShared: (postId: string) => trackEvent("post_shared", { post_id: postId }),
  commentAdded: (postId: string) => trackEvent("comment_added", { post_id: postId }),
  storyViewed: (storyId: string) => trackEvent("story_viewed", { story_id: storyId }),
  storyCreated: () => trackEvent("story_created"),
  
  // DAO actions
  proposalViewed: (proposalId: string) => trackEvent("proposal_viewed", { proposal_id: proposalId }),
  voteSubmitted: (proposalId: string, vote: string) => trackEvent("vote_submitted", { proposal_id: proposalId, vote }),
  
  // Token actions
  tokensPurchased: (amount: number) => trackEvent("tokens_purchased", { amount }),
  tokensStaked: (amount: number) => trackEvent("tokens_staked", { amount }),
  rewardsClaimed: (amount: number) => trackEvent("rewards_claimed", { amount }),
  
  // Content actions
  reportSubmitted: (type: string) => trackEvent("report_submitted", { type }),
  missionCompleted: (missionId: string) => trackEvent("mission_completed", { mission_id: missionId }),
  presentationViewed: (section: string) => trackEvent("presentation_viewed", { section }),
  documentDownloaded: (documentType: string) => trackEvent("document_downloaded", { type: documentType }),
  
  // Search & Navigation
  searchPerformed: (query: string) => trackEvent("search_performed", { query: query.substring(0, 50) }),
  cabinetViewed: (cabinetType: string) => trackEvent("cabinet_viewed", { cabinet_type: cabinetType }),
  
  // Conversion events
  betaSignup: (referralCode?: string) => trackEvent("beta_signup", { referral_code: referralCode }),
  investmentInterest: (tier: string) => trackEvent("investment_interest", { tier }),
  onboardingCompleted: () => trackEvent("onboarding_completed"),
};

// Get analytics summary (for admin dashboard)
export function getAnalyticsSummary() {
  if (typeof window === "undefined") return null;
  
  const analytics = JSON.parse(localStorage.getItem("vodeco_analytics") || "{}");
  
  const today = new Date().toISOString().split("T")[0];
  const todayViews = analytics.pageViews?.[today] 
    ? Object.values(analytics.pageViews[today] as Record<string, number>).reduce((a, b) => a + b, 0)
    : 0;
  
  const topPages = analytics.pageViews?.[today]
    ? Object.entries(analytics.pageViews[today] as Record<string, number>)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : [];

  const recentEvents = analytics.events?.slice(-10) || [];

  return {
    totalViews: analytics.totalViews || 0,
    todayViews,
    lastVisit: analytics.lastVisit,
    topPages,
    recentEvents
  };
}

// Analytics Provider Component
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(url);
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}

// Script loader for external analytics
export function AnalyticsScripts() {
  if (!ANALYTICS_CONFIG.plausible.enabled && !ANALYTICS_CONFIG.ga.enabled) {
    return null;
  }

  return (
    <>
      {/* Plausible Analytics */}
      {ANALYTICS_CONFIG.plausible.enabled && (
        <script
          defer
          data-domain={ANALYTICS_CONFIG.plausible.domain}
          src={`${ANALYTICS_CONFIG.plausible.apiHost}/js/script.js`}
        />
      )}

      {/* Google Analytics */}
      {ANALYTICS_CONFIG.ga.enabled && ANALYTICS_CONFIG.ga.measurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.ga.measurementId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_CONFIG.ga.measurementId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}



