"use client";

import { useState, useCallback } from 'react';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Базовый хук для API запросов
export function useApi<T = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(async (url: string, options?: ApiOptions): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options?.headers,
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers,
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ошибка запроса');
      }

      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setState({ data: null, loading: false, error: errorMessage });
      return null;
    }
  }, []);

  return { ...state, request };
}

// Хук для постов
export function usePosts() {
  const { request, loading, error } = useApi();

  const getPosts = useCallback(async (params?: { type?: string; authorId?: string; page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set('type', params.type);
    if (params?.authorId) searchParams.set('authorId', params.authorId);
    if (params?.page) searchParams.set('page', params.page.toString());
    
    return request(`/api/posts?${searchParams}`);
  }, [request]);

  const createPost = useCallback(async (content: string, type?: string, tags?: string[]) => {
    return request('/api/posts', {
      method: 'POST',
      body: { content, type, tags },
    });
  }, [request]);

  const likePost = useCallback(async (postId: string) => {
    return request(`/api/posts/${postId}/like`, { method: 'POST' });
  }, [request]);

  const addComment = useCallback(async (postId: string, content: string) => {
    return request(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: { content },
    });
  }, [request]);

  return { getPosts, createPost, likePost, addComment, loading, error };
}

// Хук для сообщений
export function useMessages() {
  const { request, loading, error } = useApi();

  const getChats = useCallback(async () => {
    return request('/api/messages');
  }, [request]);

  const getMessages = useCallback(async (partnerId: string, page?: number) => {
    const searchParams = new URLSearchParams();
    if (page) searchParams.set('page', page.toString());
    
    return request(`/api/messages/${partnerId}?${searchParams}`);
  }, [request]);

  const sendMessage = useCallback(async (receiverId: string, content: string) => {
    return request('/api/messages', {
      method: 'POST',
      body: { receiverId, content },
    });
  }, [request]);

  return { getChats, getMessages, sendMessage, loading, error };
}

// Хук для друзей
export function useFriends() {
  const { request, loading, error } = useApi();

  const getFriends = useCallback(async (status?: string) => {
    const searchParams = new URLSearchParams();
    if (status) searchParams.set('status', status);
    
    return request(`/api/friends?${searchParams}`);
  }, [request]);

  const addFriend = useCallback(async (friendId: string) => {
    return request('/api/friends', {
      method: 'POST',
      body: { friendId },
    });
  }, [request]);

  const sendRequest = useCallback(async (friendId: string) => {
    return request('/api/friends', {
      method: 'POST',
      body: { friendId },
    });
  }, [request]);

  const acceptRequest = useCallback(async (friendshipId: string) => {
    return request(`/api/friends/${friendshipId}`, {
      method: 'PUT',
      body: { action: 'accept' },
    });
  }, [request]);

  const rejectRequest = useCallback(async (friendshipId: string) => {
    return request(`/api/friends/${friendshipId}`, {
      method: 'PUT',
      body: { action: 'reject' },
    });
  }, [request]);

  const respondToRequest = useCallback(async (friendshipId: string, action: 'accept' | 'reject' | 'block') => {
    return request(`/api/friends/${friendshipId}`, {
      method: 'PUT',
      body: { action },
    });
  }, [request]);

  const removeFriend = useCallback(async (friendshipId: string) => {
    return request(`/api/friends/${friendshipId}`, { method: 'DELETE' });
  }, [request]);

  return { getFriends, addFriend, sendRequest, acceptRequest, rejectRequest, respondToRequest, removeFriend, loading, error };
}

// Хук для групп
export function useGroups() {
  const { request, loading, error } = useApi();

  const getGroups = useCallback(async (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    
    return request(`/api/groups?${searchParams}`);
  }, [request]);

  const getGroup = useCallback(async (groupId: string) => {
    return request(`/api/groups/${groupId}`);
  }, [request]);

  const createGroup = useCallback(async (data: { name: string; description?: string; type?: string; category?: string }) => {
    return request('/api/groups', {
      method: 'POST',
      body: data,
    });
  }, [request]);

  const joinGroup = useCallback(async (groupId: string) => {
    return request(`/api/groups/${groupId}/join`, { method: 'POST' });
  }, [request]);

  return { getGroups, getGroup, createGroup, joinGroup, loading, error };
}

// Хук для DAO
export function useDao() {
  const { request, loading, error } = useApi();

  const getProposals = useCallback(async (params?: { category?: string; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.status) searchParams.set('status', params.status);
    
    return request(`/api/dao/proposals?${searchParams}`);
  }, [request]);

  const createProposal = useCallback(async (data: { title: string; description: string; category: string; budgetRequested?: number }) => {
    return request('/api/dao/proposals', {
      method: 'POST',
      body: data,
    });
  }, [request]);

  const vote = useCallback(async (proposalId: string, vote: 'for' | 'against' | 'abstain') => {
    return request(`/api/dao/proposals/${proposalId}/vote`, {
      method: 'POST',
      body: { vote },
    });
  }, [request]);

  return { getProposals, createProposal, vote, loading, error };
}

// Хук для наград
export function useRewards() {
  const { request, loading, error } = useApi();

  const getRewards = useCallback(async (status?: string) => {
    const searchParams = new URLSearchParams();
    if (status) searchParams.set('status', status);
    
    return request(`/api/rewards?${searchParams}`);
  }, [request]);

  const claimReward = useCallback(async (rewardId: string) => {
    return request('/api/rewards', {
      method: 'POST',
      body: { rewardId },
    });
  }, [request]);

  return { getRewards, claimReward, loading, error };
}

// Хук для транзакций
export function useTransactions() {
  const { request, loading, error } = useApi();

  const getTransactions = useCallback(async (params?: { type?: string; tokenType?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set('type', params.type);
    if (params?.tokenType) searchParams.set('tokenType', params.tokenType);
    
    return request(`/api/transactions?${searchParams}`);
  }, [request]);

  const transfer = useCallback(async (toAddress: string, amount: number, tokenType?: string) => {
    return request('/api/transactions', {
      method: 'POST',
      body: { toAddress, amount, tokenType },
    });
  }, [request]);

  return { getTransactions, transfer, loading, error };
}

// Хук для поиска пользователей
export function useUsers() {
  const { request, loading, error } = useApi();

  const searchUsers = useCallback(async (query: string, role?: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('q', query);
    if (role) searchParams.set('role', role);
    
    return request(`/api/users/search?${searchParams}`);
  }, [request]);

  const getUser = useCallback(async (userId: string) => {
    return request(`/api/users/${userId}`);
  }, [request]);

  return { searchUsers, getUser, loading, error };
}

