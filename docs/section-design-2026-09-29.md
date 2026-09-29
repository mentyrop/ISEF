# Mission, team and Mexico accent — 29 September 2026

## Changes

- The Mexico flag in the hero strip is 35% wider, retaining its original aspect ratio. Flexible gaps keep all nine flags within the strip at narrow widths.
- The existing mission photograph now fills the section behind the heading, introduction and three pillars. A responsive light overlay preserves text readability; the separate picture column is removed.
- The team uses the existing navy palette, a dashed centre circle and centre line. Leadership and experts have translated group headings, shared horizontal dividers and vertical separators. Desktop shows two leaders above four experts; tablets show two expert columns; phones stack leadership and retain two expert columns.
- The governance row uses a connecting line and small circular markers. Person buttons and biography dialogs keep their existing behaviour.

## Reference

Figma MCP design context and screenshot requests were blocked by the Starter-plan tool limit. The implementation follows the existing local Figma exports in `ISEF Page/pictures/`: `эксперты текст и иконки.pdf`, `разметка для блока 4.pdf`, `текст миссия.pdf`, and `фон блок 3 (фото).pdf`, together with the user’s latest comments and current site assets. Existing `public/optimized/d156b.webp` remains the mission photo; the supplied updated portraits remain unchanged. No new external image dependencies.

## Verification

- Visual browser review: desktop mission and team at 1440 px, mobile mission and team at 393 px.
- Layout measurements: RU at 320, 360, 393, 768, 1064, 1440 and 1920 px; EN and ES at 320 and 1440 px. No horizontal page overflow, overflowing headings/paragraphs or overlapping flags in these cases. Mexico width ratio: 1.35.
- Desktop leadership and mobile expert biographies open and close, returning keyboard focus to their person button. All five supplied portraits loaded.
- Telegram bridge fixture: mobile team, biography open/close and header at y=0. This checks the site’s Telegram layout branch in Chrome, not the actual iOS Telegram renderer.
- Production build and whitespace checks passed.
