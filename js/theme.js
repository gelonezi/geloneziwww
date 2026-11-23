// Runs before first paint: applies the saved theme and enables JS-only effects.
// Kept in its own file so the Content-Security-Policy needs no inline-script hashes.
document.documentElement.classList.add("js");
try {
  const t = localStorage.getItem("theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
} catch (_) {}

// Safety net: the "js" class hides .reveal content until main.js fades it in. If main.js
// never ran (blocked, offline, an error), take the class back so nothing stays invisible.
addEventListener("load", () => {
  if (!document.documentElement.classList.contains("js-ready")) document.documentElement.classList.remove("js");
});
