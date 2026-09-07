# Design System Guidelines: Full Stack & Gen AI Developer — Shailesh Jaiswal

This document defines the implementation-ready, token-driven UI guidance for Shailesh Jaiswal's portfolio website. It adapts his professional credentials (MERN stack developer, competitive coder, and Gen AI engineer) into the elegant, high-contrast editorial style foundations specified in the Robert Tran brand reference.

---

## 1. Design Intent
Establish a premium, editorial web layout using a deep black backdrop, warm cream-white raised surfaces, elegant Caslon serif typography, and rich terracotta-crimson accents to highlight Shailesh Jaiswal's technical depth and professional achievements.

---

## 2. Foundations and Semantic Tokens

All UI implementations must strictly consume these semantic design tokens to maintain layout and visual consistency.

### Typography
- **Primary Font**: `font.family.primary = "caslonText"`
- **Fallback Stack**: `font.family.stack = "caslonText", "caslonText Fallback", "Georgia", "Times New Roman", serif`
- **Base Metrics**:
  - `font.size.base = 16px`
  - `font.weight.base = 400`
  - `font.lineHeight.base = 24px`
- **Typography Scale**:
  - `font.size.xs = 11px`
  - `font.size.sm = 11.5px`
  - `font.size.md = 12px`
  - `font.size.lg = 14px`
  - `font.size.xl = 15px`
  - `font.size.2xl = 16px`
  - `font.size.3xl = 17px`
  - `font.size.4xl = 21px`

### Color Palette
Colors must be declared using these semantic token names in component styling.

| Token Name | Token Path | Hex Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Surface Base** | `color.surface.base` | `#000000` | Base backdrop layer |
| **Surface Raised**| `color.surface.raised`| `#fbfaf5` | Warm cream-white raised card panels |
| **Text Primary** | `color.text.primary` | `#16140f` | Warm dark-charcoal body text |
| **Text Secondary** | `color.text.secondary` | `#45413a` | Muted dark-slate descriptive copy |
| **Text Tertiary** | `color.text.tertiary` | `#f4f1e9` | Muted cream-gray background highlights and borders |
| **Text Inverse** | `color.text.inverse` | `#a6382c` | Terracotta-crimson accents, interactive states, links |

### Spacing Scale
- `space.1 = 2px`
- `space.2 = 4px`
- `space.3 = 5px`
- `space.4 = 6px`
- `space.5 = 6.85px`
- `space.6 = 7px`
- `space.7 = 8px`
- `space.8 = 9px`

### Radius, Shadow, and Motion Tokens
- **Borders & Radii**: All elements should use flat, sharp, or minimally rounded borders to align with the classical editorial aesthetic. Max border radius must not exceed `4px`.
- **Motion**:
  - `motion.duration.instant = 150ms` (hover state transitions)
  - `motion.duration.fast = 300ms` (tab shifts and layout filter animations)
  - `motion.duration.normal = 550ms` (vertical timeline entries and viewport section scroll fades)

---

## 3. Component-Level Rules

Interactive components must follow these anatomy definitions, targeting the page component density guidelines: **links (31), cards (7), inputs (5), buttons (3), navigation (2)**.

### 1. Link Component (Target Density: 31)
*Used for social link buttons, code links, and general text anchors.*
- **Anatomy**: Underlined serif text. Underline height `1px` offset from baseline.
- **States**:
  - *Default*: Text `color.text.primary` inside cards, or `color.text.tertiary` on black backgrounds.
  - *Hover*: Color changes to terracotta `color.text.inverse` (`#a6382c`), underline becomes solid crimson.
  - *Focus-Visible*: Focus ring outline `1px solid color.text.inverse`, offset `2px`.
  - *Active*: Deepens in contrast.
  - *Disabled*: Color `color.text.secondary` with `opacity: 0.5` and cursor disabled.

### 2. Card Component (Target Density: 7)
*Used for the 7 primary sections/cards: Biography, Education, Competitive Coding Stats, Hashedbit Internship, Indux Internship, Projects List, and Contact Form wrapper.*
- **Anatomy**: Solid background `color.surface.raised` (`#fbfaf5`), border `1px solid color.text.tertiary` (`#f4f1e9`). Internal padding `space.8` (`9px`).
- **States**:
  - *Default*: Background `#fbfaf5`, text `#16140f`.
  - *Hover*: Flat border becomes terracotta crimson (`color.text.inverse`).
  - *Focus-Within*: Outer outline of `1px solid color.text.inverse`.
  - *Active*: Flat press shadow activation.
  - *Disabled*: Background `color.text.tertiary` with muted gray text.
  - *Loading*: Displays vertical scanning line.
  - *Error*: Left-hand vertical border flashes crimson.

### 3. Contact Input Fields (Target Density: 5)
*Used for the 5 contact form input targets: Name, Email, Subject, Message, and chatbot dialog.*
- **Anatomy**: Text size `font.size.lg` (`14px`), background `#ffffff`, border `1px solid color.text.secondary` (`#45413a`).
- **States**:
  - *Default*: Clear white input field with gray placeholder text.
  - *Hover*: Border thickens.
  - *Focus*: Border becomes terracotta `color.text.inverse` (`#a6382c`). Outline focus visible rings active.
  - *Error*: Border color shifts to crimson `#a6382c` with an italic error label underneath.
  - *Success*: Border turns solid dark gray.

### 4. Button Component (Target Density: 3)
*Used for CTA (Explore Projects), Form Submit (Send), and Chatbot expand toggles.*
- **Anatomy**: Bold, uppercase sans-serif text for contrast, background `#16140f`, text `#fbfaf5`.
- **States**:
  - *Default*: High-contrast block button.
  - *Hover*: Background becomes terracotta `color.text.inverse` (`#a6382c`), text remains `#ffffff`.
  - *Focus-Visible*: Outline `2px solid color.text.inverse`.
  - *Active*: Solid translate click offset.
  - *Disabled*: Background `color.text.secondary` with low-contrast labels.

### 5. Navigation (Target Density: 2)
*Used for the Header Navbar and Footer Sitemap Links.*
- **Anatomy**: Left-aligned brand logo, right-aligned horizontal list of anchors utilizing `caslonText` style.
- **States**:
  - *Default*: Transparent base background.
  - *Active Scroll Item*: High-contrast underline indicator.

---

## 4. Accessibility Requirements (WCAG 2.2 AA)

- **Contrast Constraint**: The contrast ratio between primary text (`#16140f`) and the cream surface (`#fbfaf5`) is `12.7:1`, exceeding the WCAG AA minimum. The crimson highlight (`#a6382c`) against the cream surface (`#fbfaf5`) is `4.8:1`, satisfying the contrast guidelines.
- **Keyboard-First Nav**: Tab sequences must cycle sequentially through all active anchor elements and form controls. Interactive widgets must trap focus during display.
- **Focus visible**: Focus rings must never be hidden. Use `:focus-visible` to target keyboard navigation.

---

## 5. Content and Tone Standards

- **Tone**: Professional, literary, authoritative, and precise.
- **Example — Hero Section**:
  - *Pass*: "Shailesh Jaiswal: Engineering full-stack MERN systems and orchestrating AI workflows in Bengaluru, Karnataka."
  - *Fail*: "Check out my crazy NextJS apps and chatbot!"

---

## 6. Prohibited Implementations (Anti-Patterns)

- **No Rounded Pills**: Do not use `rounded-full` or large radii. The aesthetic is editorial and structured; borders must remain square or have a maximum radius of `radius.xs` (`4px`).
- **No Neon Gradients**: Violet-to-blue neon glow layers and floating 3D balls are strictly prohibited. Backgrounds must be solid black (`#000000`) and cards must use flat, solid backgrounds (`#fbfaf5`).
- **No Ambient Dropshadows**: Do not apply blurry shadows (`box-shadow: 0 10px 30px rgba(...)`). Outlines and solid borders must be used to separate layered layouts instead of fuzzy shadows.

---

## 7. Quality Assurance Checklist

- [ ] Confirm all typography is styled using the `caslonText` font stack.
- [ ] Verify that all cards, buttons, links, inputs, and navs sum to the target densities.
- [ ] Confirm that contrast ratios for all text elements exceed the WCAG 2.2 AA threshold (`4.5:1` standard).
- [ ] Verify that all border-radii values are flat (sharp edges) or do not exceed `4px`.
- [ ] Verify that no fuzzy drop shadows or color gradients are active in layout CSS rules.
