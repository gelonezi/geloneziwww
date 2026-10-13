const root = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Theme toggle (dark by default, choice remembered) ----------
const themeBtn = document.querySelector(".theme-toggle");
const syncThemeLabel = () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  themeBtn.setAttribute("aria-label", `Switch to ${next} theme`);
  document.querySelector('meta[name="theme-color"]').content =
    root.dataset.theme === "dark" ? "#07121f" : "#f4f8fc";
};
syncThemeLabel();
themeBtn.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
  syncThemeLabel();
});

// ---------- Mobile menu ----------
const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("nav-list");
const setMenu = (open) => {
  navList.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
navToggle.addEventListener("click", () => setMenu(!navList.classList.contains("open")));
navList.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ---------- Active section in the nav ----------
const navLinks = new Map(
  [...navList.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a])
);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.remove("active"));
    navLinks.get(entry.target.id)?.classList.add("active");
  });
}, { rootMargin: "-45% 0px -50% 0px" });
// The hero and contact have no nav link; observing them clears the highlight there.
["top", ...navLinks.keys(), "contact"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  revealEls.forEach((el) => revealObserver.observe(el));
}

// ---------- YouTube: local poster first, player only on demand ----------
const player = document.querySelector(".player");
const playVideo = (start = 0) => {
  const id = player.dataset.videoId;
  let iframe = player.querySelector("iframe");
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&start=${start}`;
  if (iframe) {
    iframe.src = src;
    return;
  }
  iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = player.dataset.title;
  iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
  iframe.allowFullscreen = true;
  player.querySelector(".player-facade").replaceWith(iframe);
  iframe.focus();
};
player.querySelector(".player-facade").addEventListener("click", () => playVideo(0));
document.querySelectorAll(".chapters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    playVideo(Number(btn.dataset.start));
    player.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  });
});

// ---------- Architecture diagram ----------
const NODES = {
  consumers: {
    kicker: "Consumers",
    title: "Internal products",
    body: "Several internal products integrate once, against a single five-operation contract, instead of learning the quirks of every court system.",
    tags: ["API contract", "Versioning"],
  },
  ingress: {
    kicker: "Entry · synchronous",
    title: "Ingress",
    body: "Request/response operations enter through the Kubernetes ingress and go straight to the orchestration layer.",
    tags: ["REST", "Kubernetes Ingress"],
  },
  mq: {
    kicker: "Entry · asynchronous",
    title: "RabbitMQ + async processor",
    body: "Long-running operations are queued and processed asynchronously, so slow court systems never block consumers. Multi-step workflows run as sagas on MassTransit.",
    tags: ["RabbitMQ", "MassTransit", "Saga"],
  },
  controllers: {
    kicker: "Core · orchestration",
    title: "Controllers",
    body: "Implement the public contract by orchestrating one or more connectors per operation. Vertical Slice + Hexagonal Architecture keeps every operation independent and testable.",
    tags: ["Vertical Slice", "Hexagonal", ".NET"],
  },
  connectors: {
    kicker: "Core · adapters",
    title: "Connectors",
    body: "One stateless adapter per external system, each its own microservice. Kubernetes scales them independently, and an AI-driven analysis of Grafana metrics tunes that autoscaling: −40% AWS reservations, no throttling.",
    tags: ["Microservices", "Autoscaling", "Grafana"],
  },
  sdk: {
    kicker: "Core · shared",
    title: "SDK",
    body: "A versioned package holding the protocol contracts (a national SOAP interoperability standard in several versions, plus REST) and each system's corner cases, so connectors stay thin.",
    tags: ["Shared SDK", "SOAP", "REST"],
  },
  catalog: {
    kicker: "Core · configuration",
    title: "Catalog",
    body: "Where each external system is described: endpoints, protocol versions and capabilities. Adding a court system becomes configuration first, code second.",
    tags: ["Configuration", "Per-system"],
  },
  courts: {
    kicker: "External",
    title: "~20 court & prosecutor systems",
    body: "Heterogeneous, constantly changing platforms across Brazil's judiciary, synchronized in real time, with documents flowing through S3.",
    tags: ["SOAP", "REST", "Real-time sync"],
  },
  docdb: {
    kicker: "Supporting",
    title: "Amazon DocumentDB",
    body: "Metadata and caching for requests and documents.",
    tags: ["DocumentDB", "Cache"],
  },
  s3: {
    kicker: "Supporting",
    title: "Amazon S3",
    body: "Binary storage for the legal documents moving between systems.",
    tags: ["S3"],
  },
  keycloak: {
    kicker: "Supporting",
    title: "Keycloak",
    body: "Authentication for every consumer of the platform.",
    tags: ["OIDC", "JWT", "SSO"],
  },
  vault: {
    kicker: "Supporting",
    title: "HashiCorp Vault",
    body: "Credentials for each external system, kept out of code and configuration.",
    tags: ["Secrets"],
  },
  elastic: {
    kicker: "Supporting",
    title: "Elastic Stack + APM",
    body: "Logs, metrics and distributed traces across every service: the evidence behind zero-incident cutovers.",
    tags: ["Elasticsearch", "Kibana", "APM"],
  },
};

const panel = document.querySelector(".diagram-panel");
const nodes = document.querySelectorAll(".arch .node");
const selectNode = (g) => {
  const data = NODES[g.dataset.node];
  if (!data) return;
  nodes.forEach((n) => {
    n.classList.toggle("selected", n === g);
    n.setAttribute("aria-pressed", String(n === g));
  });
  panel.querySelector(".panel-kicker").textContent = data.kicker;
  panel.querySelector(".panel-title").textContent = data.title;
  panel.querySelector(".panel-body").textContent = data.body;
  const tags = panel.querySelector(".panel-tags");
  tags.replaceChildren(...data.tags.map((t) => Object.assign(document.createElement("li"), { textContent: t })));
};
nodes.forEach((g) => {
  g.setAttribute("aria-pressed", "false");
  g.addEventListener("click", () => selectNode(g));
  g.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectNode(g);
    }
  });
});
