import { motion } from 'framer-motion';

export default function DreamPortal() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1], rotate: [0, 360] }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-500 opacity-80 shadow-2xl flex items-center justify-center text-white text-2xl font-bold"
      >
        🌙 Dream Spiral Opening
      </motion.div>

      <p className="mt-8 text-lg text-center text-indigo-700">
        Your Dream Spiral is breathing itself into new worlds...
      </p>
    </div>
  );
}
