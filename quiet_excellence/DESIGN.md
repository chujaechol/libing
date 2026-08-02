---
name: Quiet Excellence
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#434747'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5d5f5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1a1c1c'
  on-primary-container: '#838484'
  inverse-primary: '#c6c6c6'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838483'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c7c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 128px
---

## Brand & Style

The design system is rooted in the philosophy of "Quiet Luxury"—a blend of understated elegance and technical precision tailored for the architectural surface industry. It targets a high-end demographic of architects, interior designers, and luxury homeowners who value craftsmanship over clamor.

The visual style is **Minimalist with Architectural Structure**. It leverages expansive whitespace to create a sense of gallery-like scale, while thin, purposeful lines echo the precision of architectural blueprints. The emotional response should be one of calm authority, sophistication, and meticulous attention to detail. Transitions are slow and intentional, utilizing subtle parallax to mimic the depth of physical materials.

## Colors

The palette is a sophisticated study in neutrals, designed to let the photography of surfaces take center stage.

- **Surface (Bone):** `#f9f9f8` acts as the primary canvas, providing a warmer, more organic feel than pure white.
- **Text (Charcoal):** `#1a1c1c` provides high-contrast legibility and represents structural strength.
- **Accents (Gold):** `#c5a059` is used sparingly for highlights, call-to-actions, and premium indicators, evoking quality and craftsmanship.
- **Borders (Soft Grey):** `#e8e8e8` defines the architectural grid without creating visual noise.

## Typography

This design system employs a high-contrast typographic pairing to balance heritage with modernity.

**Libre Caslon Text** is used for all editorial and display moments. It should be set with generous leading and occasional slight negative letter-spacing in large formats to emphasize its elegant curves.

**DM Sans** provides the functional counterpart. It is used for body copy and technical specifications. For metadata and small labels, DM Sans should be set in uppercase with increased tracking to maintain an architectural, "drafted" look.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, centered within a 1440px container. It utilizes a 12-column structure with wide gutters to facilitate breathing room.

- **Vertical Rhythm:** Sections are separated by large gaps (`128px` or more) to enforce the "Quiet Luxury" aesthetic and prevent information density.
- **Alignment:** Use asymmetrical layouts where content is offset from the center to create a dynamic, editorial feel. 
- **Responsive Behavior:** On mobile, margins shrink to `20px`, and the 12-column grid collapses to a single column. Horizontal scrolling "carousels" should be used for product swatches to maintain vertical brevity.

## Elevation & Depth

To maintain a minimalist and structural aesthetic, this design system rejects traditional drop shadows.

- **Low-Contrast Outlines:** Depth is communicated through `1px` solid borders using the Soft Grey (`#e8e8e8`) palette.
- **Tonal Layering:** Use the Surface color (`#f9f9f8`) for the base and a pure white (`#ffffff`) for elevated "cards" or floating panels to create a subtle, sophisticated lift.
- **Intentional Overlaps:** Depth is also created by overlapping images and text blocks, mimicking the way physical material samples might be layered on an architect's desk.

## Shapes

The shape language is strictly **Sharp (0px)**. 

All buttons, image containers, input fields, and structural dividers must have 90-degree corners. This reinforces the "Architectural" and "Technical" nature of the brand, echoing the straight edges of stone slabs and floor plans. Any softening of corners would dilute the precision-engineered feel of the identity.

## Components

### Buttons
Primary buttons use the Charcoal (`#1a1c1c`) background with Bone (`#f9f9f8`) text. Secondary buttons are outlined with a `1px` Charcoal border. Hover states should involve a subtle shift to the Gold accent (`#c5a059`) for the text or border, rather than a heavy color fill change.

### Cards
Cards for material samples should be "borderless" with a subtle `1px` Soft Grey divider between them. Typography within cards should lead with a `label-caps` category followed by a `headline-sm` title.

### Input Fields
Inputs consist of a single `1px` bottom border only, creating a clean, "form-fill" look. Labels stay above the line in `label-caps` style.

### Material Swatches
Large, rectangular swatches with sharp edges. When hovered, the swatch should scale slightly inward (98%) to create a sense of tactile depression, revealing more of the "Surface" background.

### Navigation
A minimalist top-bar navigation with a centered logo. Use `label-caps` for nav links with generous horizontal spacing.