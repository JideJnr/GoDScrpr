import { create } from 'zustand';
import * as api from '../services/api';

interface Match {
  id: string;
  number: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface MatchState {
  Matches: Match[];
  availableMatches: Match[];
  currentMatch: Match | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchMatches: () => Promise<void>;
  getAvailableMatches: () => Promise<void>;
  getMatchById: (id: string) => Promise<void>;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  Matches: [],
  availableMatches: [],
  currentMatch: null,
  loading: false,
  error: null,

  fetchMatches: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getAllMatches();
      if (!response.success) throw new Error(response.error || 'Failed to fetch Matches');
      set({ Matches: response.Matches, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getAvailableMatches: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getAvailableMatches();
      if (!response.success) throw new Error(response.error || 'Failed to fetch available Matches');
      set({ availableMatches: response.Matches, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  getMatchById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.getMatchById(id);
      if (!response.success) throw new Error(response.error || 'Match not found');
      set({ currentMatch: response.Match, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));