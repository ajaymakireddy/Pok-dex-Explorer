
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-2 border rounded dark:border-white border-black"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}