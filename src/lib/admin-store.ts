import { create } from 'zustand';

interface AdminStore {
  isAdmin: boolean;
  adminPassword: string;
  setAdmin: (isAdmin: boolean) => void;
  setAdminPassword: (password: string) => void;
}

// Simple admin store - in production, use proper authentication
export const useAdminStore = create<AdminStore>((set) => ({
  isAdmin: false,
  adminPassword: 'nidalum2024', // Change this to your desired password
  setAdmin: (isAdmin: boolean) => set({ isAdmin }),
  setAdminPassword: (password: string) => set({ adminPassword: password }),
}));
