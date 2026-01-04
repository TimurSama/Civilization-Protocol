"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/hooks/useApi';
import { X, Image, Hash, Send, Loader2, Globe, Lock, Users } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

export default function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const { user } = useAuth();
  const { createPost, loading } = usePosts();
  
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [type, setType] = useState('text');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const postTypes = [
    { id: 'text', label: 'Публикация', icon: Globe },
    { id: 'report', label: 'Отчёт', icon: Globe },
    { id: 'research', label: 'Исследование', icon: Globe },
    { id: 'proposal', label: 'Предложение', icon: Users },
    { id: 'news', label: 'Новость', icon: Globe },
  ];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().replace(/^#/, '');
      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('Напишите что-нибудь');
      return;
    }

    setError('');
    const result = await createPost(content, type, tags);
    
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        setContent('');
        setTags([]);
        setType('text');
        setSuccess(false);
        onClose();
        onPostCreated?.();
      }, 1000);
    } else {
      setError('Ошибка публикации');
    }
  };

  const resetForm = () => {
    setContent('');
    setTags([]);
    setType('text');
    setError('');
    setSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/70 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-2xl border border-ocean-light/30 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-water-400 to-water-600 flex items-center justify-center text-sm font-bold">
                  {user?.avatar || user?.name?.slice(0, 2).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2">
                    {user?.name || 'Пользователь'}
                    {user?.isPioneer && <span className="text-yellow-400 text-xs">🏆</span>}
                  </div>
                  <div className="text-xs text-white/50">@{user?.email?.split('@')[0] || 'user'}</div>
                </div>
              </div>
              <button
                onClick={() => { resetForm(); onClose(); }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Post Type Selector */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {postTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setType(pt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      type === pt.id
                        ? 'bg-water-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Что нового в мире водных ресурсов? Поделитесь данными, идеями или новостями..."
                className="w-full h-40 bg-transparent border-none outline-none resize-none text-lg placeholder:text-white/30"
                maxLength={1000}
              />

              {/* Character Count */}
              <div className="flex justify-end mb-4">
                <span className={`text-xs ${content.length > 900 ? 'text-yellow-400' : 'text-white/30'}`}>
                  {content.length}/1000
                </span>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-water-500/20 text-water-400 text-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-white transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Hash size={16} className="text-white/30" />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Добавьте теги (Enter для добавления)"
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-white/30"
                    disabled={tags.length >= 5}
                  />
                  <span className="text-xs text-white/30">{tags.length}/5</span>
                </div>
              </div>

              {/* Error/Success */}
              {error && (
                <div className="p-3 mb-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="p-3 mb-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
                  ✓ Опубликовано! +10 XP
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                  <Image size={20} />
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !content.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-water-500 to-water-600 hover:from-water-400 hover:to-water-500 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Публикация...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Опубликовать</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}










