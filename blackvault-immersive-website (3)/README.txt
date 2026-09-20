HISTORICAL DESIGN PACKAGE — 2026-09-18

The instructions below describe the original standalone visual prototype. Current SafeVault and Vault AI architecture is documented in the repository root README and the BlackVault Public Network documentation repository. This package is not the active wallet or agent implementation.

BLACKVAULT IMMERSIVE WEBSITE PACKAGE

ENTRY FILE
- index.html

IMAGE ASSETS
- assets/blackvault-round-logo.png
- assets/blackvault-horizontal-logo.png
- assets/ai-collective-orb.png
- assets/vault-ai-portrait.jpg
- assets/vault-command-center.jpg
- assets/echo-command-center.jpg
- assets/universe-portal.jpg
- assets/universe-vista.jpg

IMPLEMENTATION NOTES
1. Keep index.html and the assets folder together.
2. The HTML references every image through a relative path such as:
   assets/ai-collective-orb.png
3. Upload the complete folder to GitHub or import the ZIP into your build workflow.
4. AI Studio or Bolt may convert the page into React components, but these relative image paths should be preserved or imported.
5. The illuminated Orb inside the hero artwork is an invisible interactive hotspot.
6. Clicking it launches the cinematic connection sequence.
7. Completing the sequence reveals the BlackVault Universe navigation layer.
