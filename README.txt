Spell$lots! - Mother's Day Ed. v3.0 Branch Split

Why this split exists:
- The single-file prototype got too large.
- Brave/mobile can choke on huge base64 audio and heavy effects.
- Audio is now normal WAV files in /audio.
- CSS and JS are now separate files.
- Main build is easier to edit and debug.

Branches:
1. main-stable
   Best default branch. Use this first.

2. mobile-lite
   Reduced effects. Best for Brave/mobile testing.

3. arcade-chaos
   Bigger celebration branch. Use after stable is verified.

4. dev-next
   Safe place to add future CSS/JS/image systems.

How to test:
- Extract the ZIP.
- Open main-stable/index.html.
- If Brave struggles, test mobile-lite/index.html.
- Keep one branch as stable before adding new features.
