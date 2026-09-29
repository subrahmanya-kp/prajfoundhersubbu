# Vivaha

**Vivaha** is a design system for a South Indian (Kannada) wedding invite site covering two days: the **Engagement** and the **Wedding**. It is a single page a family can share instead of, or alongside, the printed card. The look draws on a Kannada wedding: silk-saree maroon and temple gold, jasmine strings and mango-leaf torans over the door, a kalash, the brass kuthu vilakku, and kolam patterns at the threshold. The site is in English for now; Kannada can be added later (see the end).

## Content fundamentals

- **Tone:** warm and a little formal, the voice of the families inviting guests. No emoji, no exclamation marks.
- **Order in the hero:** invocation → "Together with their families" → "Ananya *weds* Rohan" → one line of invitation → both dates. The bride's name comes first.
- **Invocation:** the default "|| Sri Ganeshaya Namaha ||" is a placeholder. Replace it with the line the family uses on their printed card (often their family deity). Confirm it with the family; don't guess.
- **Events:** exactly two, Engagement (day one) then Wedding (day two). Give each a date, a time, a venue, and one plain sentence.
- **Wedding time:** give the muhurtha exactly as the family gives it, and add a "please be seated by" time.
- **Formats:** dates as "Sunday, 13 December 2026"; times as "10:15 am".
- **Placeholders:** all names, dates and the venue in the examples are placeholders. Replace every one.

## Visual foundations

**Grounds.** Pages sit on `ivory`; the events band is `sandal`. The hero and footer are `maroon` bands. Keep to those two maroon areas.

**Colour roles.**
- `kumkum` is the single action colour and marks the Wedding.
- `leaf` marks the Engagement and colours the toran leaves.
- On light grounds, gold text and hairlines use `gold`.
- On maroon, everything gold uses `temple-gold`, and buttons are `gold` or `outline-light`.
- `jasmine` is decorative only.

**The temple arch.** The signature shape. The hero frame is a double-lined arch crowned with a kalash finial; event cards and countdown tiles have arched tops (`radius-arch`). The venue card stays rectangular.

**Ornament.** Every section title is followed by one **Ornament**: gold hairlines with a jasmine, lamp or kalash motif. The **Toran** (mango leaves alternating with jasmine strings) hangs across the top of the hero and the footer only. The venue panel carries a dotted **kolam**.

**Type.**
- **Cormorant Garamond** (`display`): the couple's names in italic, titles upright.
- **Mulish** (`body`): all information.
- Eyebrows are Mulish capitals, widely tracked.

**Themes.** *Jasmine (day)* is the default. *Lamp-lit (night)* is a dark theme; every text pairing passes 4.5:1 in both themes.

**Motion.** Only the countdown ticks. No falling petals, no autoplay music.

## Iconography

Eight icons live in the bundle as `Icon`: lamp, kalash, jasmine, lotus, rings, calendar, clock, pin. They draw in `currentColor`. Static copies of the motifs and toran are under **Assets → Motifs**. The system contains no deity illustrations; families who want one should supply their own artwork.

## Page template (keep this order)

1. **Hero** (maroon)
2. **Countdown** to the muhurtha
3. **Events** (sandal band), with the two EventCards side by side
4. **Venue**, with a map link
5. **Footer** (maroon)

Sections use `.vv-section` (96px padding, 64px on phones) and `.vv-section-sandal`.

## Using this system

1. Load the tokens and `components/bundle.css`, which imports the Google Fonts.
2. Load React 18, then `components/bundle.js`. Components are on `window.Vivaha`.
3. For the night theme, set `data-theme="dark"` on `<html>`.

## Adding Kannada later

Add a Kannada face (for example Noto Serif Kannada for display and Noto Sans Kannada for text) as a third family. Set Kannada lines beneath the English ones: event names, the invocation, and the families' line. Have a Kannada speaker check every line.
