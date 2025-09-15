// import { useTheme } from "../contexts/ThemeContext";
// import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  //   const { isDark, resolvedTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 p-4">
      {children}
    </header>
  );
};

export default Header;
