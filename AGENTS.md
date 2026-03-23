# LITHE Agent Memory

## Learned User Preferences

- Center a link under its parent button by wrapping both in `flex flex-col items-center`, not `w-full justify-center`
- Long content pages in viewport-constrained layouts: use `max-h-[calc(100vh-10rem)] overflow-y-auto`, `overflow-x-hidden`, and `break-words`
- Remove underline from links when user requests
- Add small back buttons for sub-pages linking to parent route
- Prefer fading animations (e.g. 400ms) for theme transitions on SVGs and 3D scenes
- Group related UI (button + link) in a single flex column when centering the link under the button
- Use `max-w-2xl` and `pr-4` for readable content columns in side-by-side layouts

## Learned Workspace Facts

- LITHE is a Next.js portfolio for lithe.pw, hosted on Vercel
- Workspace path: `c:\Users\brack\Desktop\Stuff\Projects\LITHE\LITHE`
- Portfolio projects: Splyc, Honeydew, Quilt
- Quilt privacy policy at `/portfolio/quilt/privacy`
- Uses `--lithe-*` CSS variables (primary, secondary, muted, bg, border)
- Uses `InteractiveHoverButton`, `CustomPixelHeader`, `AnimateIcon`, `ArrowLeft` for consistent UI
- Body has `overflow-hidden`; long pages need scroll containers to fit layout
- Dark theme base: `#0A0A0A`
- Three.js / @react-three/fiber for portfolio playground and project logos
- Site config in `src/lib/site-config.ts` (SIDEBAR_WIDTH, CONTACT, etc.)
- Windows environment; use absolute paths when needed
