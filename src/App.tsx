import { useState } from "react";
import "./App.css";
import { items } from "./data/faq-data";
import minus_icon from "../public/assets/icons/minus_icon.svg";
import plus_icon from "../public/assets/icons/plus_icon.svg";
import minus_icon_white from "../public/assets/icons/minus_icon_white.svg";
import plus_icon_white from "../public/assets/icons/plus_icon_white.svg";
import zipBoard from "../public/assets/logos/zipBoard.png";
import zipBoard_light from "../public/assets/logos/zipBoard_light.png";
import { FaDesktop, FaMoon } from "react-icons/fa";
import ThemeCard from "./components/ui/ThemeCard";
import { useTheme } from "./contexts/useThemeContext";
import { IoSunnyOutline } from "react-icons/io5";
import { LocalStorage } from "./utils/local-storage.util";

function App() {
  const [themeCardIsOpen, setThemeCardIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const { theme } = useTheme();

  const isSystemTheme = LocalStorage.get("theme") === "system";
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-y-[126px] p-5 ${
        theme === "dark" ? "bg-[#1C1C1C] text-white" : "bg-white text-black"
      }`}
    >
      {/* theme toggler */}
      <div className="fixed top-10 right-10">
        <button
          onClick={() => setThemeCardIsOpen(!themeCardIsOpen)}
          className="p-2 border rounded cursor-pointer"
        >
          {theme === "light" ? (
            <IoSunnyOutline size={15} />
          ) : isSystemTheme ? (
            <FaDesktop size={15} />
          ) : theme === "dark" ? (
            <FaMoon size={15} />
          ) : (
            <FaDesktop size={15} />
          )}
        </button>
        <ThemeCard
          isOpen={themeCardIsOpen}
          onClose={() => setThemeCardIsOpen(false)}
        />
      </div>
      <div className="fixed top-10 left-10">
        <img
          src={theme === "dark" ? zipBoard_light : zipBoard}
          alt="zipBoard"
          className="h-7"
        />
      </div>

      <h1
        className={`sm:text-[50px] text-[40px] font-bold ${
          theme === "dark"
            ? "text-blue-600"
            : theme === "light"
            ? "text-primary-light "
            : ""
        }`}
      >
        Frequently asked questions
      </h1>

      <div className="accordion md:w-[700px] w-full transition-all duration-500">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-full flex flex-col ${
              activeIndex === index ? "gap-y-[30px]" : ""
            } ${
              index === items.length - 1 ? "border-y" : "border-t"
            } border-[#CDCDCD] transition-all duration-500 py-[23px]`}
          >
            <div
              className={`cursor-pointer w-full flex items-center justify-between focus:outline-none transition-all duration-500 ${
                activeIndex === index ? "active" : ""
              }
              
              `}
              onClick={() => handleToggle(index)}
            >
              <p
                className={`text-black font-bold ${
                  theme === "dark" ? "text-white" : "text-[#1C1C1C]"
                }`}
              >
                {item.question}
              </p>
              <img
                src={
                  activeIndex === index
                    ? theme === "dark"
                      ? minus_icon_white
                      : minus_icon
                    : theme === "dark"
                    ? plus_icon_white
                    : plus_icon
                }
                alt={activeIndex === index ? "minus_icon" : "plus_icon"}
                className={`w-[13px] h-[13px] transition-transform duration-500 ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-sm leading-relaxed">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
