// ============================================================
// PORTFOLIO DATA
// This is the main place you will edit later.
// ============================================================

const folders = {
  social: {
    title: "SOCIAL",
    videos: [
      {
        title: "Social Project 01",
        note: "Reels / TikTok / Short-form",
        // =====================================================
        // CHANGE YOUTUBE LINK HERE
        // Paste a normal YouTube URL, for example:
        // https://www.youtube.com/watch?v=dQw4w9WgXcQ
        // Leave it blank ("") to show a placeholder.
        // =====================================================
        youtube: "https://www.youtube.com/watch?v=xikHksGsh1I"
      },
      {
        title: "Social Project 02",
        note: "Product / lifestyle",
        // CHANGE YOUTUBE LINK HERE
        youtube: ""
      },
      {
        title: "Social Project 03",
        note: "Campaign cutdown",
        // CHANGE YOUTUBE LINK HERE
        youtube: ""
      }
    ]
  },

  "head-talk": {
    title: "HEAD TALK",
    videos: [
      { title: "Head Talk 01", note: "Interview / Talking head", youtube: "" }, // CHANGE YOUTUBE LINK HERE
      { title: "Head Talk 02", note: "Founder / Personal brand", youtube: "" }, // CHANGE YOUTUBE LINK HERE
      { title: "Head Talk 03", note: "Educational content", youtube: "" } // CHANGE YOUTUBE LINK HERE
    ]
  },

  "event-recap": {
    title: "EVENT RECAP",
    videos: [
      { title: "Event Recap 01", note: "Highlight edit", youtube: "" }, // CHANGE YOUTUBE LINK HERE
      { title: "Event Recap 02", note: "Brand event", youtube: "" }, // CHANGE YOUTUBE LINK HERE
      { title: "Event Recap 03", note: "Community event", youtube: "" } // CHANGE YOUTUBE LINK HERE
    ]
  },

  documentary: {
    title: "DOCUMENTARY",
    videos: [
      { title: "Documentary 01", note: "People / story", youtube: "" }, // CHANGE YOUTUBE LINK HERE
      { title: "Documentary 02", note: "Culture / place", youtube: "" }, // CHANGE YOUTUBE LINK HERE
      { title: "Documentary 03", note: "Short documentary", youtube: "" } // CHANGE YOUTUBE LINK HERE
    ]
  }
};

const homeView = document.getElementById("homeView");
const folderView = document.getElementById("folderView");
const folderTitle = document.getElementById("folderTitle");
const videoGrid = document.getElementById("videoGrid");
const folderSwitcher = document.getElementById("folderSwitcher");

function youtubeEmbed(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    let id = "";

    if (parsed.hostname.includes("youtu.be")) {
      id = parsed.pathname.replace("/", "");
    } else if (parsed.pathname.includes("/shorts/")) {
      id = parsed.pathname.split("/shorts/")[1].split("/")[0];
    } else {
      id = parsed.searchParams.get("v") || "";
    }
    return id ? `https://www.youtube.com/embed/${id}` : "";
  } catch {
    return "";
  }
}

function renderFolder(key) {
  const data = folders[key];
  if (!data) return;

  homeView.classList.remove("active");
  folderView.classList.add("active");
  folderTitle.textContent = data.title;

  folderSwitcher.innerHTML = Object.entries(folders).map(([folderKey, folder]) => `
    <button class="${folderKey === key ? "active" : ""}" data-folder="${folderKey}">
      ${folder.title}
    </button>
  `).join("");

  videoGrid.innerHTML = data.videos.map(video => {
    const embed = youtubeEmbed(video.youtube);
    return `
      <article class="video-card">
        <div class="video-frame">
          ${embed
            ? `<iframe src="${embed}" title="${video.title}" loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowfullscreen></iframe>`
            : `<div class="video-placeholder">
                 <strong>YOUTUBE VIDEO<br>COMING SOON</strong>
               </div>`
          }
        </div>
        <div class="video-meta">
          <h3>${video.title}</h3>
          <p>${video.note}</p>
        </div>
      </article>
    `;
  }).join("");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  folderView.classList.remove("active");
  homeView.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const folderTarget = event.target.closest("[data-folder]");
  if (folderTarget) {
    renderFolder(folderTarget.dataset.folder);
    return;
  }

  const navHome = event.target.closest('[data-nav="home"]');
  if (navHome) {
    event.preventDefault();
    goHome();
    return;
  }

  const scrollTarget = event.target.closest("[data-scroll]");
  if (scrollTarget) {
    document.getElementById(scrollTarget.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  }
});

// Experience panel
const experiencePanel = document.getElementById("experiencePanel");
const panelBackdrop = document.getElementById("panelBackdrop");

function openExperience() {
  experiencePanel.classList.add("open");
  panelBackdrop.classList.add("open");
  experiencePanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeExperience() {
  experiencePanel.classList.remove("open");
  panelBackdrop.classList.remove("open");
  experiencePanel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-open-experience]").forEach(el => el.addEventListener("click", openExperience));
document.querySelectorAll("[data-close-experience]").forEach(el => el.addEventListener("click", closeExperience));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeExperience();
});

document.getElementById("year").textContent = new Date().getFullYear();
