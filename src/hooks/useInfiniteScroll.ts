import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions<T> {
  fetchFn: (page: number) => Promise<{ data: T[]; hasMore: boolean }>;
  initialData?: T[];
  pageSize?: number;
  threshold?: number; // Distance from bottom to trigger loading (px)
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  loading: boolean;
  loadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  observerRef: (node: HTMLElement | null) => void;
}

export function useInfiniteScroll<T>({
  fetchFn,
  initialData = [],
  pageSize = 10,
  threshold = 200
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    
    loadingRef.current = true;
    setLoadingMore(true);
    
    try {
      const result = await fetchFn(page);
      setData(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load more"));
    } finally {
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, [fetchFn, page, hasMore]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setPage(1);
    setHasMore(true);
    loadingRef.current = true;
    
    try {
      const result = await fetchFn(1);
      setData(result.data);
      setHasMore(result.hasMore);
      setPage(2);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to refresh"));
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchFn]);

  // Intersection Observer for auto-loading
  const setObserverRef = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
            loadMore();
          }
        },
        { 
          rootMargin: `${threshold}px`,
          threshold: 0.1 
        }
      );
      observerRef.current.observe(node);
    }
  }, [hasMore, loadMore, threshold]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Initial load
  useEffect(() => {
    if (initialData.length === 0) {
      refresh();
    }
  }, []);

  return {
    data,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
    observerRef: setObserverRef
  };
}

// Simple hook for scroll position tracking
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollDirection(position > lastScrollRef.current ? "down" : "up");
      lastScrollRef.current = position;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollPosition, scrollDirection };
}

// Hook for detecting when element is near bottom
export function useNearBottom(threshold: number = 200) {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      setIsNearBottom(scrollHeight - scrollTop - clientHeight < threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isNearBottom;
}
























