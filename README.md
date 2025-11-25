# Disable Tabs in Obsidian
Disables the ability to open multiple tabs, enforcing a single-tab interface.

![disable-tabs-preview](https://github.com/user-attachments/assets/662730a6-109c-4c50-9d97-9f9bbcdef66f)

Particularly useful when hiding the tab bar with the [Hider](https://github.com/kepano/obsidian-hider) plugin.

Also pairs nicely with this CSS Snippet to hide the tabs icon on mobile: 

```css
.mobile-navbar-action-tabs {
    display: none;
}
```

## Made for Vault CMS

Part of the [Vault CMS](https://github.com/davidvkimball/vault-cms) project.

## Installation

Disable Tabs is not yet available in the Community plugins section. Install using [BRAT](https://github.com/TfTHacker/obsidian42-brat) or manually:

### BRAT

1. Download the [Beta Reviewers Auto-update Tester (BRAT)](https://github.com/TfTHacker/obsidian42-brat) plugin from the [Obsidian community plugins directory](https://obsidian.md/plugins?id=obsidian42-brat) and enable it.
2. In the BRAT plugin settings, select `Add beta plugin`.
3. Paste the following: `https://github.com/davidvkimball/obsidian-disable-tabs` and select `Add plugin`.

### Manual

1. Download the latest release from the [Releases page](https://github.com/davidvkimball/obsidian-disable-tabs/releases) and navigate to your Obsidian vault's `.obsidian/plugins/` directory.
2. Create a new folder called `disable-tabs` and ensure `manifest.json` and `main.js` are in there.
3. In Obsidian, go to Settings > Community plugins (enable it if you haven't already) and then enable "Disable Tabs."
