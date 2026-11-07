// Runs before first paint: applies the saved theme and enables JS-only effects.
// Kept in its own file so the Content-Security-Policy needs no inline-script hashes.
document.documentElement.classList.add("js");
try {
  const t = localStorage.getItem("theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
} catch (_) {}
