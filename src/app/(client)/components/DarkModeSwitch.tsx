"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styled from "styled-components";

4;

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
    <div>
      <input
        type="checkbox"
        className="toggle toggle-warning"
        defaultChecked={theme === "dark"}
        onChange={toggleTheme}
      />
    </div>
  );
};
export default DarkModeSwitch;
