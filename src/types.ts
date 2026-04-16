export interface Message {
  id: string;
  text: string;
  sender: 'You' | 'Stranger' | 'System';
  timestamp: string;
}

export interface User {
  id: string;
  interests: string[];
}

export type ChatMode = 'text' | 'video';

export interface ChatSession {
  roomId: string;
  peerId: string;
  mode: ChatMode;
}
