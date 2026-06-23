---
name: Architectural Precision
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#f0eeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#44474e'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ec'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#485f84'
  primary: '#021f41'
  on-primary: '#ffffff'
  primary-container: '#1c3557'
  on-primary-container: '#869ec6'
  inverse-primary: '#b0c8f1'
  secondary: '#9c440f'
  on-secondary: '#ffffff'
  secondary-container: '#fd8e55'
  on-secondary-container: '#6e2a00'
  tertiary: '#0f2033'
  on-tertiary: '#ffffff'
  tertiary-container: '#25354a'
  on-tertiary-container: '#8e9eb6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b0c8f1'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#30476b'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
  safety-green: '#10B981'
  onyx: '#1A1A1A'
  slate-gray: '#334155'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered to project unwavering reliability, professional expertise, and technological sophistication for the residential construction sector. It targets homeowners and contractors who value precision and structural integrity.

The visual direction follows a **Corporate / Modern** aesthetic with a strong emphasis on clean lines and structured layouts. By leveraging high-contrast brand colors against expansive, airy backgrounds, the system establishes an environment of clarity and "safety." The interface avoids decorative clutter, opting instead for functional elegance and subtle depth to guide the user through complex renovation workflows.

## Colors

The palette is anchored by **Deep Navy (#1C3557)**, representing institutional trust and authority. This is balanced by **Constructive Terra-cotta (#C4622D)**, used strategically for primary actions and "building" metaphors.

- **Primary:** Reserved for headers, primary navigation, and high-level branding.
- **Secondary:** Used for key Call-to-Action (CTA) elements and progress indicators.
- **Neutral:** A warm off-white (`#F6F4F0`) serves as the canvas, reducing eye strain compared to pure white while maintaining a premium feel.
- **Safety Green:** Specifically reserved for verification badges, "verified builder" statuses, and successful bank integrations.
- **Onyx & Slate:** Utilized for high-contrast text and secondary interface elements like borders and icons.

## Typography

The typographic hierarchy uses **Hanken Grotesk** for headlines to provide a sharp, modern, and engineered feel. Its geometric precision reflects the technical nature of construction. **DM Sans** is used for body copy and labels due to its exceptional legibility and neutral, approachable tone.

Scale headings aggressively on desktop to create a sense of importance. For mobile, reduce display sizes to maintain readability without excessive scrolling. Use uppercase styling for `label-sm` to denote secondary metadata or "Verified" status text within badges.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop (centered 12-column layout) and a **Fluid Grid** for mobile devices. 

The rhythm is built on an 8px baseline. Content should be grouped logically using generous whitespace to separate "Planning," "Execution," and "Financial" sections. 
- **Desktop:** 12 columns, 24px gutters, 40px minimum side margins.
- **Tablet:** 8 columns, 16px gutters, 24px margins.
- **Mobile:** 4 columns, 16px gutters, 16px margins.

Cards and content modules should use consistent internal padding (24px or 32px) to maintain a professional, uncrowded appearance.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Surfaces do not use heavy borders; instead, they rely on a soft, multi-layered shadow stack to lift elements off the neutral background.

- **Level 0 (Background):** Neutral Off-white (`#F6F4F0`).
- **Level 1 (Cards/Sections):** White background with a 4px blur, 2% opacity black shadow.
- **Level 2 (Interactive/Hover):** White background with a 12px blur, 6% opacity navy-tinted shadow.
- **Overlays:** Modals and dropdowns use a 24px blur with a subtle primary-tinted backdrop to maintain context while focusing attention.

## Shapes

The shape language is **Rounded**, utilizing a 0.5rem (8px) base radius. This softens the "industrial" nature of construction while maintaining a modern, user-friendly interface. 

- **Standard Elements:** 8px radius (Buttons, Input fields).
- **Containers/Cards:** 16px radius (`rounded-lg`) to create a distinct framing for large content blocks.
- **Badges:** Fully rounded (pill-shaped) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid Terra-cotta (`#C4622D`) with white text. High contrast for "Request Quote" or "Sign In."
- **Secondary:** Solid Navy (`#1C3557`) or Ghost (Navy outline) for "Learn More" or "Cancel."
- **Size:** 48px height for mobile touch targets, 44px for desktop.

### Cards
- White background, 16px corner radius, and subtle Level 1 elevation. Used for project summaries, builder profiles, and AI quote previews.

### Verified Badges
- Small pill-shaped containers with a `Safety Green` background (10% opacity) and solid `Safety Green` text/icon. Includes a small checkmark icon.

### Input Fields
- White background with a 1px border (`#D1D5DB`). On focus, the border transitions to `Primary Navy` with a soft outer glow.

### Icons
- Use a thick (2px) stroke weight. Icons for 'AI-assisted' should use a subtle gradient or a unique secondary color accent to denote technological advancement.