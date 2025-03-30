"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
const DarkModeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // hoặc có thể trả về một loading spinner
  }
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    // <div>
    //   <input
    //     type="checkbox"
    //     className="toggle toggle-warning"
    //     defaultChecked={theme === "dark"}
    //     onChange={toggleTheme}
    //   />
    // </div>
    <>
      <div onClick={toggleTheme} className="cursor-pointer">
        {theme === "dark" ? (
          <div className="rounded-md border-2 mb-2 p-1.5 hover:bg-gray-100/20 ">
            <Sun className=" h-5 w-5" />
          </div>
        ) : (
          <div className="rounded-md border-2 mb-2 p-1.5 hover:bg-gray-100 ">
            {" "}
            <Moon className=" h-5 w-5" />
          </div>
        )}
      </div>
    </>
  );
};
export default DarkModeSwitch;
