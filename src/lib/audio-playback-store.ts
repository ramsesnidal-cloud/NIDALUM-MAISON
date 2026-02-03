import { create } from 'zustand';

interface AudioPlaybackStore {
  activePlayerId: string | null;
  setActivePlayer: (playerId: string | null) => void;
  isPlayerActive: (playerId: string) => boolean;
}

export const useAudioPlayback = create<AudioPlaybackStore>((set, get) => ({
  activePlayerId: null,
  setActivePlayer: (playerId: string | null) => {
    set({ activePlayerId: playerId });
  },
  isPlayerActive: (playerId: string) => {
    return get().activePlayerId === playerId;
  },
}));
