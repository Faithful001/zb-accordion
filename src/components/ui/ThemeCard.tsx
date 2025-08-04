import { FaMoon, FaDesktop } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "../../contexts/useThemeContext";

interface ThemeCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCard = ({ isOpen, onClose }: ThemeCardProps) => {
  const { setTheme } = useTheme();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="inset-0 fixed z-50" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            className={`flex flex-col bg-[#1C1C1C] border border-white/30 rounded-lg p-2.5 absolute z-[51] -left-18 top-10`}
          >
            <button
              onClick={() => {
                setTheme("light");
                onClose();
              }}
              className="flex items-center gap-2 p-2 text-white text-sm hover:bg-white/20 rounded cursor-pointer"
            >
              <IoSunnyOutline /> Light
            </button>
            <button
              onClick={() => {
                setTheme("dark");
                onClose();
              }}
              className="flex items-center gap-2 p-2 text-white text-sm hover:bg-white/20 rounded cursor-pointer"
            >
              <FaMoon /> Dark
            </button>
            <button
              onClick={() => {
                setTheme("system");
                onClose();
              }}
              className="flex items-center gap-2 p-2 text-white text-sm hover:bg-white/20 rounded cursor-pointer"
            >
              <FaDesktop /> System
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeCard;
