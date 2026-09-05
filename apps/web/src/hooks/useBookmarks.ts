import { useState, useEffect } from 'react';

export interface BookmarkedScheme {
  id: string;
  title: string;
  title_ta: string;
  department: string;
  state: string;
  max_amount: string;
  official_portal_url: string;
  saved_at: string;
  user_notes?: string;
}

const STORAGE_KEY = 'civicproof_saved_bookmarks_v1';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedScheme[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const addBookmark = (scheme: Omit<BookmarkedScheme, 'saved_at'>) => {
    if (!bookmarks.some((b) => b.id === scheme.id)) {
      setBookmarks([
        ...bookmarks,
        { ...scheme, saved_at: new Date().toLocaleDateString('en-IN') }
      ]);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  const updateNotes = (id: string, notes: string) => {
    setBookmarks(
      bookmarks.map((b) => (b.id === id ? { ...b, user_notes: notes } : b))
    );
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    updateNotes,
    clearAllBookmarks
  };
}
