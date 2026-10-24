---
name: PaiPai-ChewChew
description: Bio-acoustic pre-drive vehicle safety console and Neko Ban Ban feline inspection system
colors:
  deter-primary: "#C23B13"
  deter-hover: "#9E2C0B"
  deter-surface: "#FDECE7"
  coax-primary: "#1554C0"
  coax-hover: "#0E419A"
  coax-surface: "#E6F0FD"
  safe-primary: "#0D6B49"
  safe-surface: "#E1F5EC"
  bg-ground: "#EDF1F5"
  bg-surface: "#F8FAFC"
  bg-recessed: "#DEE5ED"
  ink-primary: "#0F172A"
  ink-secondary: "#334155"
  border-hairline: "#CBD5E1"
  border-control: "#5B6B82"
  canvas-bg: "#14181F"
typography:
  display:
    fontFamily: "'Bai Jamjuree', 'Noto Sans Thai', sans-serif"
    fontSize: "clamp(1.35rem, 2.3vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bai Jamjuree', 'Noto Sans Thai', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "'Bai Jamjuree', 'Noto Sans Thai', sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'Noto Sans Thai', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary-sweep:
    backgroundColor: "{colors.deter-primary}"
    textColor: "{colors.bg-surface}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "16px 24px"
  button-primary-sweep-hover:
    backgroundColor: "{colors.deter-hover}"
  button-sound-play:
    backgroundColor: "{colors.bg-recessed}"
    textColor: "{colors.ink-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "8px 15px"
  card-panel:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "22px 24px"
---

# Design System: PaiPai-ChewChew

## Overview

**Creative North Star: "Veterinary Audiology & Neko Ban Ban Field Console"**

PaiPai-ChewChew is an operational bio-acoustic instrument built for drivers standing beside a parked vehicle in a carport, street, or dim underground garage. Its visual system draws from Japanese *Neko Ban Ban* (猫バンバン) automotive inspection protocols and veterinary audiology field instruments. Rather than treating sound deterrence as a novelty soundboard or a pastel pet toy, the interface presents a disciplined two-column engineering workbench: an automated 20-second multi-stage acoustic sweep paired with a real-time Feline vs. Human Audiogram canvas on the left, and a top-down 4-zone automotive hazard blueprint with sequential clearance stamps on the right.

Density is calibrated for one-handed curbside urgency. Primary controls sit immediately in the first viewport, framed by crisp 1px structural hairlines (`#CBD5E1` in daylight, `#28303B` in garage night mode) and high-contrast 3:1 control borders (`#5B6B82`). Color is strictly semantic—distinguishing between **Deter/Flush** (Highway Safety Vermilion), **Coax/Lure** (Signal Cobalt for rescuing frozen kittens inside engine bays), and **Cleared/Safe** (Clearance Emerald).

**Key Characteristics:**
- **Dual-Environment Day/Night Garage Polarity:** Cool Automotive Technical Slate-Mist in daylight (`#EDF1F5`) and deep low-glare Garage Asphalt (`#11151A`) in underground parking lots.
- **Tri-Role Semantic Action Coding:** Every acoustic profile and vehicle zone is visually coded by behavioral mechanism—Vermilion to repel from open undercarriages, Cobalt to coax out of enclosed engine compartments, and Emerald to stamp verified vehicle zones.
- **Live Bio-Acoustic Telemetry:** Real-time Web Audio FFT spectrum bars are plotted directly over the logarithmic 45 Hz – 64 kHz feline auditory curve and 13.5–19.5 kHz smartphone deliverable band.
- **Drawn Technical Iconography & Schematic Geometry:** All vehicle zones and controls use uniform 1.85px-stroke inline SVG geometry without decorative emoji or unmeasured ornament.

## Colors

The palette pairs a cool, glare-controlled automotive inspection slate ground with three high-visibility safety signal inks.

### Primary
- **Highway Safety Vermilion** (`#C23B13` light / `#F26430` dark): Drives the primary 20-second Smart Sweep trigger, active Deter & Flush sound profiles, and un-cleared high-risk vehicle zones.
- **Deep Vermilion Press** (`#9E2C0B`): Hover and active state for primary deterrent triggers.
- **Vermilion Alert Wash** (`#FDECE7` light / `#2B1A15` dark): Active background tint for playing deterrent cards and live transmission telemetry pills.

### Secondary
- **Lure Signal Cobalt** (`#1554C0` light / `#5496FF` dark): Dedicated exclusively to the Coax & Lure reversal mode (kitten contact calls, food-can transients) to visually separate gentle extraction from aggressive deterrence.
- **Cobalt Reversal Wash** (`#E6F0FD` light / `#142238` dark): Background surface for Engine Bay Paradox warnings and active coaxing sound cards.

### Tertiary
- **Clearance Emerald** (`#0D6B49` light / `#29C48A` dark): Used for stamped Neko Ban Ban vehicle inspection zones (`ปลอดภัย / CLEARED`), active acoustic spectrum bars, and safe microphone baseline states.
- **Emerald Stamp Wash** (`#E1F5EC` light / `#102920` dark): Background fill for verified vehicle zone stubs.

### Neutral
- **Technical Slate-Mist Ground** (`#EDF1F5` light / `#11151A` dark): Page canvas background engineered to avoid warm-cream AI defaults while maintaining crisp legibility outdoors.
- **Instrument Tag Surface** (`#F8FAFC` light / `#181E26` dark): Elevated workbench panels and sound trigger cards.
- **Recessed Bay Slate** (`#DEE5ED` light / `#0C0F13` dark): Mode tab rails, progress tracks, and schematic stages.
- **Asphalt Carbon Ink** (`#0F172A` light / `#F1F5F9` dark): Primary headings, body copy, and control labels (>14:1 contrast).
- **Tempered Slate Ink** (`#334155` light / `#B4C0CE` dark): Supporting ethological descriptions and usage tips (>7.5:1 contrast).
- **Control Boundary Slate** (`#5B6B82` light / `#6C7787` dark): Interactive control borders meeting ≥3:1 non-text WCAG contrast.
- **Oscilloscope Enclosure** (`#14181F`): Dedicated dark housing for the real-time audiogram and waveform canvas across both themes.

### Named Rules
**The Functional Signal Rule.** Vermilion (`#C23B13`), Cobalt (`#1554C0`), and Emerald (`#0D6B49`) never appear as decorative splashes; they strictly encode Deter/Flush, Coax/Lure, and Cleared Zone states respectively.
**The 3:1 Boundary Rule.** Every interactive button, sound card, switch, and zone stub carries an explicit 1px border (`#5B6B82` light / `#6C7787` dark) with at least 3:1 contrast against its surface.

## Typography

**Display Font:** `Bai Jamjuree` (with `Noto Sans Thai` fallback)
**Body Font:** `Noto Sans Thai` (with system UI fallback)
**Label/Mono Font:** `JetBrains Mono`

**Character:** Cadson Demak's square-rigged Thai/Latin geometric `Bai Jamjuree` brings authentic Thai automotive and industrial signage authority to headings and action buttons, while `Noto Sans Thai` ensures effortless readability for dense ethological guidance and `JetBrains Mono` locks numerical frequency telemetry in place.

### Hierarchy
- **Display** (700, `clamp(1.35rem, 2.3vw, 1.75rem)`, line-height `1.2`, letter-spacing `-0.02em`): Primary workbench and research monograph headings.
- **Headline** (700, `1.25rem`, line-height `1.25`): Panel titles (`แผนผังจุดเสี่ยงแมวซ่อนในรถ 4 โซน`).
- **Title** (700, `1rem`, line-height `1.3`): Sound profile titles and zone drawer headers.
- **Body** (400, `1rem`, line-height `1.65`, max measure `66ch–70ch`): Scientific explanations, acoustic mechanisms, and usage instructions.
- **Label** (600–700, `0.78rem`, line-height `1.2`, `font-variant-numeric: tabular-nums`): Frequency badges (`13.5 – 19.5 kHz`), Pinnae gain tags (`+14 dB`), and countdown timers.

### Named Rules
**The Tabular Telemetry Rule.** All live Hz readouts, countdown timers, and frequency band badges must use `JetBrains Mono` with `font-variant-numeric: tabular-nums` so rapidly sweeping frequencies never jitter layout width.
**The Self-Sufficient Heading Rule.** Headings never carry small uppercase kicker or eyebrow labels above them; the heading states its job directly.

## Layout

The interface uses a 1380px maximum container (`padding: 1.25rem`) with an asymmetric 2-column CSS Grid workbench (`minmax(0, 1.38fr) minmax(340px, 1fr)`, `gap: 1.25rem`) above the fold on desktop, collapsing cleanly to a single-column vertical flow below `1024px` and a 1-column sound card stack below `680px`. Inside panels, sections are divided by full-bleed 1px structural hairlines (`#CBD5E1`) rather than nested card margins.

## Elevation & Depth

Surfaces rely primarily on structural 1px hairlines and tonal surface steps (`#EDF1F5` ground → `#F8FAFC` panel → `#DEE5ED` recessed well), supported by a neutral soft-blurred ambient shadow on top-level workbench containers. Colored glow halos and hard zero-blur offset shadows are strictly excluded.

### Shadow Vocabulary
- **Workbench Panel Elevation** (`box-shadow: 0 8px 24px -6px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`): Applied to top-level `.panel-surface` containers.
- **Primary Trigger Lift** (`box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.16)`): Neutral physical depth on the 20-second Smart Sweep button.

### Named Rules
**The Neutral Shadow Rule.** Elevation shadows are always neutral slate/black with soft blur; never use chromatic glow shadows on dark or light surfaces.

## Shapes

- **Panel Containers:** `14px` radius (`--radius-lg`) with `1px solid` hairline borders and `overflow: hidden` so internal tab rails and canvas bars sit flush.
- **Interactive Cards & Drawers:** `10px` radius (`--radius-md`) with `1px solid` high-contrast control borders.
- **Action Buttons, Badges & Zone Stubs:** `6px` radius (`--radius-sm`) for crisp, instrument-grade affordances.

## Components

### Buttons
- **Shape:** Gently rounded corners (`10px` on primary sweep CTA, `6px` on profile triggers).
- **Primary (`button-primary-sweep`):** Highway Safety Vermilion (`#C23B13`) background with `#FFFFFF` text, `16px 24px` padding, 700 weight `Bai Jamjuree`. Shifts to `#0F172A` carbon when actively sweeping.
- **Hover / Focus:** Background deepens to `#9E2C0B` with `-1px` vertical translate; `:focus-visible` renders a `3px solid #C23B13` outline at `3px` offset.
- **Secondary / Sound Trigger (`btn-sound-play`):** Recessed slate (`#DEE5ED`) with `1px solid #5B6B82` border, `white-space: nowrap`, inverting to Vermilion (`#C23B13`) or Cobalt (`#1554C0` in Coax mode) on hover and active playback.

### Mode Tab Rail
- **Style:** 4-column stepped grid over `--bg-recessed` (`#DEE5ED`), separated by 1px vertical hairlines and a `3px` bottom active indicator bar that changes color by mode (`#C23B13` for Deter, `#1554C0` for Coax, `#0D6B49` for Mic Listener).

### Cards / Containers
- **Corner Style:** `10px` radius on `.sound-trigger-row`, `14px` on `.panel-surface`.
- **Background:** `#F8FAFC` at rest, shifting to `#FDECE7` (Deter) or `#E6F0FD` (Coax) when actively transmitting audio.
- **Shadow Strategy:** Flat at rest inside workbench panels; defined by `1px solid #5B6B82` control borders.
- **Internal Padding:** `16px 18px` (`1rem 1.1rem`) on sound cards; `22px 24px` (`1.35rem 1.5rem`) on workbench sections.

### Interactive 4-Zone Vehicle Schematic & Stamp Stubs
- **Description:** Top-down SVG automotive blueprint with 4 keyboard- and pointer-interactive hazard hotspots (`ZONE A` Engine Bay, `ZONE B` Front Wheel Wells, `ZONE C` Undercarriage, `ZONE D` Rear Exhaust) paired with a sequential stamp checklist that records clearance timestamps (`ปลอดภัย HH:MM`) in `localStorage`.

## Do's and Don'ts

### Do:
- **Do** pair high-frequency sweeps (`13.5–19.5 kHz`) with the live Feline vs. Human Audiogram canvas so drivers see the active frequency relative to feline pinnae sensitivity.
- **Do** keep Coax/Lure profiles (`#1554C0` Cobalt) visually distinct from Deter/Flush profiles (`#C23B13` Vermilion) to prevent drivers from panicking kittens trapped inside engine bays.
- **Do** keep button labels (`ปล่อยคลื่นเสียง`, `หยุดเสียง`, `รอตรวจเช็ค`) on a single line with `white-space: nowrap`.

### Don't:
- **Don't** add eyebrow or kicker labels above headings.
- **Don't** use Unicode emojis (`🐱`, `🔊`, `🚗`) in place of drawn 1.85px-stroke SVG icons.
- **Don't** use warm cream/beige page backgrounds or colored neon box-shadow glows.
