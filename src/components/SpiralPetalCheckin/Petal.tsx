import { motion } from 'framer-motion';
import { useSoundEffect } from '../../hooks/useSoundEffect';

interface PetalProps {
  id: string;
  color: string;
  label: string;
  angle: number;
  distance: number;
  onDrag: (id: string, event: any, info: any) => void;
}

export default function Petal({ id, color, label, angle, distance, onDrag }: PetalProps) {
  const playBreath = useSoundEffect('/sounds/breath.mp3');

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.4}
      onDragStart={playBreath} // 🌬️ Play breath sound when drag starts
      onDrag={(e, info) => onDrag(id, e, info)}
      whileHover={{ scale: 1.2 }}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer"
      style={{
        backgroundColor: color,
        left: `calc(50% - 32px)`,
        top: `calc(50% - 32px)`,
        transform: `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`,
        boxShadow: `0 0 12px ${color}`,
      }}
    >
      {label}
    </motion.div>
  );
}
