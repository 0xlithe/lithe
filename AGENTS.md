# LITHE Agent Memory

## Learned User Preferences

- Center a link under its parent button by wrapping both in `flex flex-col items-center`, not `w-full justify-center`
- Long content pages in viewport-constrained layouts: use `max-h-[calc(100vh-10rem)] overflow-y-auto`, `overflow-x-hidden`, and `break-words`
- Remove underline from links when user requests
- Add small back buttons for sub-pages linking to parent route; vertically center them with adjacent action buttons
- Prefer fading animations (e.g. 400ms) for theme transitions on SVGs and 3D scenes
- Group related UI (button + link) in a single flex column when centering the link under the button
- Use `max-w-2xl` and `pr-4` for readable content columns in side-by-side layouts
- Keep project description copy as one continuous wrapping paragraph; do not insert extra line breaks between sentences
- On project pages with a Download Extension button, place the privacy policy link to the right of that button
- Prefer flat white 3D/SVG project logos (match Quilt’s treatment)

## Learned Workspace Facts

- LITHE is a Next.js portfolio for lithe.pw, hosted on Vercel
- Workspace path: `C:\Users\brack\Desktop\Stuff\Projects\LITHE`
- Portfolio projects: Splyc (Splyc+ Chrome extension) and Quilt (Chrome extension for X); Honeydew removed; YouTube page at `/youtube`
- Quilt privacy policy at `/portfolio/quilt/privacy`
- Uses `--lithe-*` CSS variables (primary, secondary, muted, bg, border)
- Uses `InteractiveHoverButton`, `CustomPixelHeader`, `AnimateIcon`, `ArrowLeft` for consistent UI
- Body has `overflow-hidden`; long pages need scroll containers to fit layout
- Dark theme base: `#0A0A0A`
- Three.js / @react-three/fiber for portfolio playground and project logos; floating logos are clickable with camera-path transitions; the YouTube page floats its SVG on the left
- Site config in `src/lib/site-config.ts` (SIDEBAR_WIDTH, CONTACT, etc.)
- Windows environment; use absolute paths when needed
