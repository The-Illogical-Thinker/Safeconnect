/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useStore } from './store/useStore';
import LandingPage from './components/LandingPage';
import ChatRoom from './components/ChatRoom';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { is18Plus, status } = useStore();

  return (
    <div className="h-screen w-screen overflow-hidden selection:bg-accent selection:text-bg">
      <AnimatePresence mode="wait">
        {!is18Plus ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <LandingPage />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <ChatRoom />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistence message for Dev environment */}
      <div className="fixed bottom-4 left-4 z-[9999] pointer-events-none opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-mono uppercase bg-black px-2 py-1 rounded border border-white/10">
          SECURE_RELAY_v1.0.4
        </p>
      </div>
    </div>
  );
}

