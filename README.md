# Alex Nguyen — Pixel Portfolio

Static portfolio built for GitHub Pages. No build tools are required.

## Files

- `index.html` — page structure and text
- `styles.css` — pixel/folder visual style and responsive layout
- `script.js` — folder navigation, video lists, YouTube embeds
- `assets/alex-portrait.png` — portrait
- `assets/*.svg` — current placeholder thumbnails

## What to edit

### 1. Change avatar
Open `index.html` and search:

`CHANGE AVATAR HERE`

Either replace `assets/alex-portrait.png` with your new image using the same filename, or change the `<img src="...">`.

### 2. Change the 4 folder thumbnails
Open `index.html` and search:

`CHANGE THE 4 HOME FOLDER THUMBNAILS HERE`

Change the four `src="assets/..."` paths.

Recommended image ratio: 16:9.

### 3. Add / change YouTube videos
Open `script.js` and search:

`CHANGE YOUTUBE LINK HERE`

Paste a normal YouTube URL into `youtube: "..."`.

Supported:
- `https://www.youtube.com/watch?v=...`
- `https://youtu.be/...`
- `https://www.youtube.com/shorts/...`

To add more videos, duplicate one video object inside the correct folder.

## Publish on GitHub Pages

1. Create a new GitHub repository, e.g. `alex-portfolio`.
2. Upload all files and folders from this package to the repository root.
3. GitHub → repository → **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`.
6. Save.
7. GitHub will show the public URL after deployment.

If your GitHub username is `yourname` and repo is `alex-portfolio`, the URL will usually be:
`https://yourname.github.io/alex-portfolio/`

## Recommended next edits

- Replace placeholder SVG thumbnails with real project frames.
- Add real YouTube links.
- Update contact email if needed.
- Adjust experience text in `index.html`.
