import { writable } from "svelte/store";

// Check for saved theme or default to 'dark'
const defaultTheme = "dark";
const initialTheme =
  typeof window !== "undefined"
    ? localStorage.getItem("theme") || defaultTheme
    : defaultTheme;

export const theme = writable(initialTheme);

// Subscribe to theme changes and save to localStorage
theme.subscribe((value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", value);
    document.documentElement.setAttribute("data-theme", value);
  }
});

export function toggleTheme() {
  theme.update((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
}
