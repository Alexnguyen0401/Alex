// ============================================================
// VIDEO DATA
// Paste either a YOUTUBE or FACEBOOK link into "video".
// ============================================================

const folders = {
  social: {
    title: "SOCIAL",
    videos: [
      {
        title: "Social Project 01",
        note: "Reels / TikTok / Short-form",

        // =====================================================
        // CHANGE VIDEO LINK HERE
        // YouTube examples:
        // https://www.youtube.com/watch?v=VIDEO_ID
        // https://youtu.be/VIDEO_ID
        // https://www.youtube.com/shorts/VIDEO_ID
        //
        // Facebook examples:
        // https://www.facebook.com/.../videos/...
        // https://www.facebook.com/reel/...
        //
        // Facebook video/reel must be PUBLIC and allow embedding.
        // Leave blank ("") to show a placeholder.
        // =====================================================
        video: ""
      },
      { title: "Social Project 02", note: "Product / lifestyle", video: "" },
      { title: "Social Project 03", note: "Campaign cutdown", video: "" }
    ]
  },

  "head-talk": {
    title: "HEAD TALK",
    videos: [
      { title: "Head Talk 01", note: "Interview / Talking head", video: "" },
      { title: "Head Talk 02", note: "Founder / Personal brand", video: "" },
      { title: "Head Talk 03", note: "Educational content", video: "" }
    ]
  },

  "event-recap": {
    title: "EVENT RECAP",
    videos: [
      { title: "Event Recap 01", note: "Highlight edit", video: "" },
      { title: "Event Recap 02", note: "Brand event", video: "" },
      { title: "Event Recap 03", note: "Community event", video: "" }
    ]
  },

  documentary: {
    title: "DOCUMENTARY",
    videos: [
      { title: "Documentary 01", note: "People / story", video: "" },
      { title: "Documentary 02", note: "Culture / place", video: "" },
      { title: "Documentary 03", note: "Short documentary", video: "" }
    ]
  }
};

const homeView = document.getElementById("homeView");
const folderView = document.getElementById("folderView");
const folderTitle = document.getElementById("folderTitle");
const videoGrid = document.getElementById("videoGrid");
const folderSwitcher = document.getElementById("folderSwitcher");

function getVideoEmbed(url) {
  if (!url || !url.trim()) {
    return { type: "empty", embed: "", original: "" };
  }

  const original = url.trim();

  try {
    const parsed = new URL(original);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

    // YOUTUBE
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
      let id = "";

      if (host === "youtu.be") {
        id = parsed.pathname.split("/").filter(Boolean)[0] || "";
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1]?.split("/")[0] || "";
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1]?.split("/")[0] || "";
      } else {
        id = parsed.searchParams.get("v") || "";
      }

      if (id) {
        return {
          type: "youtube",
          embed: `https://www.youtube.com/embed/${id}`,
          original
        };
      }
    }

    // FACEBOOK
    if (host === "facebook.com" || host === "m.facebook.com" || host === "fb.watch") {
      return {
        type: "facebook",
        embed:
          "https://www.facebook.com/plugins/video.php" +
          `?href=${encodeURIComponent(original)}` +
          "&show_text=false&width=1280",
        original
      };
    }

    return { type: "unsupported", embed: "", original };
  } catch {
    return { type: "unsupported", embed: "", original };
  }
}

function renderVideo(video) {
  // Supports new "video:" field and old "youtube:" field.
  const sourceUrl = video.video || video.youtube || "";
  const media = getVideoEmbed(sourceUrl);

  if (media.type === "youtube") {
    return `
      <iframe
        src="${media.embed}"
        title="${video.title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    `;
  }

  if (media.type === "facebook") {
    return `
      <iframe
        src="${media.embed}"
        title="${video.title}"
        loading="lazy"
        scrolling="no"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
  }

  if (media.type === "unsupported") {
    return `
      <div class="video-placeholder">
        <div>
          <strong>VIDEO LINK NOT EMBEDDABLE</strong>
          <p style="margin:14px 0 0;font-size:12px;line-height:1.6">
            This link cannot be embedded automatically.
          </p>
          <a
            href="${media.original}"
            target="_blank"
            rel="noopener noreferrer"
            style="display:inline-block;margin-top:15px;border:2px solid currentColor;padding:9px 12px;text-decoration:none;font-weight:700"
          >
            OPEN VIDEO ↗
          </a>
        </div>
      </div>
    `;
  }

  return `
    <div class="video-placeholder">
      <strong>VIDEO<br>COMING SOON</strong>
    </div>
  `;
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

  videoGrid.innerHTML = data.videos.map(video => `
    <article class="video-card">
      <div class="video-frame">
        ${renderVideo(video)}
      </div>
      <div class="video-meta">
        <h3>${video.title}</h3>
        <p>${video.note}</p>
      </div>
    </article>
  `).join("");

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

document.querySelectorAll("[data-open-experience]").forEach(el =>
  el.addEventListener("click", openExperience)
);

document.querySelectorAll("[data-close-experience]").forEach(el =>
  el.addEventListener("click", closeExperience)
);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeExperience();
});

document.getElementById("year").textContent = new Date().getFullYear();
