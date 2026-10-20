// Theme lives on <html class="dark">; an inline script in layout.js applies it before paint.
export function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}

export const OPEN_COMMAND_MENU = "open-command-menu";
