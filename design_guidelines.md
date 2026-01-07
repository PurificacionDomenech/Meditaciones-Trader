# Meditation App for Traders - Design Guidelines

## Design Approach

**Hybrid Approach**: Combining Calm/Headspace's serene meditation aesthetics with Linear's precision and functional clarity. This balances the contemplative nature of meditation with the analytical mindset of traders.

**Core Principle**: Sophisticated tranquility meets professional utility—every element serves both calm and control.

---

## Typography Hierarchy

**Display/Headers**: 'Cinzel', serif
- H1: text-2xl uppercase tracking-widest font-semibold
- H2: text-xl uppercase tracking-wider font-medium
- H3: text-lg uppercase tracking-wide

**Body/UI**: System sans-serif stack
- Primary text: text-sm font-normal
- Secondary text: text-xs font-light
- Button labels: text-sm font-medium uppercase tracking-wide

**Accent text**: Apply `.gold-text` class (gold gradient) to category labels, duration indicators, and key metrics.

---

## Layout System

**Spacing Scale**: Use Tailwind units of **2, 3, 4, 6, 8, 12** exclusively
- Component padding: p-6 or p-8
- Section spacing: space-y-6 or space-y-8
- Card gaps: gap-4
- Button padding: px-6 py-3

**Desktop Grid** (>1024px):
```
┌─────────────────────────────────────────────┐
│  Header (w-full px-8 py-4)                  │
├───────────────┬─────────────────────────────┤
│ Left Sidebar  │  Main Content Area          │
│ w-[420px]     │  flex-1                     │
│ fixed width   │  min-w-0                    │
│               │                             │
│ Sticky top    │  Scrollable                 │
│ overflow-y    │                             │
└───────────────┴─────────────────────────────┘
```

**Mobile/Tablet** (<1024px): Single column stack, full-width sections with px-4 spacing.

---

## Component Library

### Glass Effect Cards
- Background: `backdrop-blur-xl bg-white/5 border border-white/10`
- Padding: p-6 or p-8
- Border radius: rounded-xl
- Hover state: `shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow duration-300`

### Primary Buttons
- Background: `bg-gradient-to-r from-purple-600 to-purple-800`
- Text: uppercase tracking-wide text-sm font-medium
- Padding: px-6 py-3
- Rounded: rounded-lg
- Hover: `shadow-[0_0_15px_rgba(168,85,247,0.5)]`

### Audio Control Sliders
- Track: h-2 rounded-full bg-white/10
- Thumb: w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600
- Active thumb: shadow-[0_0_12px_rgba(251,191,36,0.6)]

### Meditation Cards (List Items)
- Default: Glass effect as above
- Selected state: `border-2 border-amber-500/50 shadow-[0_0_25px_rgba(251,191,36,0.4)]`
- Include: Title (Cinzel), duration badge (gold-text), category tag, description (text-xs)

### Accordion Sections (Sound Categories)
- Header: Flex justify-between with category icon + title
- Collapsed: border-b border-white/5
- Expanded: bg-white/5 with pt-4 inner spacing
- Icon rotation: rotate-180 transition

### Voice Selector Dropdown
- Options grouped by gender with gender icons (♀ ♂ ⚬)
- Each option: Voice name + country flag emoji + light country text

---

## Visual Treatment

**Background**: 
- Base gradient: `bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950`
- Overlay: Fixed pseudo-element with `bg-black/20` for depth

**Color Accents**:
- Gold gradient: `bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600`
- Active states: Purple-500 to Purple-700
- Borders: white/10 for subtle separation

**Shadows**:
- Cards at rest: none
- Hover: Golden glow (see card specs above)
- Active meditation: Stronger golden aura

---

## Key Screens/Sections

### Header
- Logo/title (Cinzel) left-aligned
- Optional: "Active Session" indicator right-aligned with pulse animation

### Left Sidebar (420px fixed)
1. **Current Meditation Display** (p-8 glass card)
   - Title, description, duration, category
   - Playback controls (Iniciar/Pausar/Detener buttons stacked or inline)
   - Progress indicator (subtle gradient bar)

2. **Meditation Lists** (scrollable region)
   - "Predefinidas" accordion group
   - "Mis Meditaciones" accordion group
   - Each item: Selectable card with hover glow

3. **Create New Button** (sticky bottom of sidebar)
   - Full-width, primary button style

### Right Panel (Flexible)
1. **Narration Controls Card** (mb-6)
   - Sliders for Speed, Pitch, Volume, Pause Duration
   - Voice selector dropdown
   - Favorites save/load mini-section

2. **Ambient Sounds Card**
   - Accordion categories: Oriental, Natural, Rhythm
   - Each sound: Toggle switch + volume slider (grid-cols-2 layout)
   - Sound presets section at bottom

---

## Responsive Behavior

**Desktop**: Two-column as specified
**Tablet** (768-1024px): Sidebar becomes collapsible drawer, main content full-width
**Mobile** (<768px): 
- Single column stack
- Sticky bottom bar with playback controls
- Meditation list becomes full-screen overlay when selecting

---

## Animations

**Minimal & Purposeful**:
- Pulse animation on "Active Session" badge (subtle opacity 0.6-1.0)
- Smooth transitions on card hovers (300ms)
- Fade in/out for modal dialogs (200ms)
- Slider thumb glow on drag (instant)

**No** scroll-triggered animations or decorative motion.

---

## Images

**No hero image required** - this is a utility app. Background gradient provides visual foundation.

**Optional**: Small illustrative icons for meditation categories (chakra, lotus, zen circle) at 48x48px, subtle opacity (0.3-0.5), positioned top-right of category headers.

---

## Accessibility

- All sliders include visible labels and ARIA attributes
- Focus states: 2px ring-2 ring-amber-400/50 offset-2
- Button contrast meets WCAG AA against purple backgrounds
- Meditation text display: max-w-prose with line-height-relaxed for readability

---

## Special Considerations

**Glass Effect Implementation**: Ensure backdrop-filter is supported; provide fallback with solid bg-purple-900/80 for older browsers.

**Audio Visualizer** (Optional enhancement): Small waveform animation (h-8) above playback controls when meditation is active—simple bars using CSS height animations.

**Empty States**: 
- "Mis Meditaciones" when empty: Centered icon + "Crea tu primera meditación" message with CTA
- No active meditation: Show placeholder card with "Selecciona una meditación para comenzar"

This design creates a professional, calming environment that respects both the meditative purpose and the trader's need for precise control.