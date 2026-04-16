import { create } from 'zustand';
import { Message, User, ChatMode } from '../types';

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  is18Plus: boolean;
  set18Plus: (val: boolean) => void;
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
  status: 'idle' | 'searching' | 'connected' | 'disconnected';
  setStatus: (status: 'idle' | 'searching' | 'connected' | 'disconnected') => void;
  chatMode: ChatMode;
  setChatMode: (mode: ChatMode) => void;
  isBlurred: boolean;
  setIsBlurred: (val: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  is18Plus: false,
  set18Plus: (is18Plus) => set({ is18Plus }),
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
  status: 'idle',
  setStatus: (status) => set({ status }),
  chatMode: 'text',
  setChatMode: (chatMode) => set({ chatMode }),
  isBlurred: true,
  setIsBlurred: (isBlurred) => set({ isBlurred }),
}));
