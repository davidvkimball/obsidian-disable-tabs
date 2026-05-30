import { Plugin } from "obsidian";
import { DisableTabsSettings, DEFAULT_SETTINGS } from "./settings";
import { TabEnforcer } from "./utils/tab-enforcer";
import { DisableTabsSettingTab } from "./ui/settings-tab";

export default class DisableTabsPlugin extends Plugin {
  settings!: DisableTabsSettings;
  private tabEnforcer!: TabEnforcer;

  // The main app window's document. Obsidian 1.13.0+ opens Settings in a
  // separate window, so `activeDocument` (the focused window) can point at the
  // Settings window while a setting is being changed. This feature is mobile-
  // only (where there is no separate Settings window), but using the main
  // window's document keeps it correct under desktop "emulate mobile" too.
  private get doc(): Document {
    return this.app.workspace.containerEl.ownerDocument;
  }

  async onload() {
    // Load settings
    const loadedData = await this.loadData() as Partial<DisableTabsSettings> | null;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedData);
    
    // Initialize tab enforcer
    this.tabEnforcer = new TabEnforcer(this.app);

    // Apply mobile tab icon CSS if enabled
    this.updateMobileTabIconCSS();

    // Hook into the workspace to enforce single tab on layout changes
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      this.tabEnforcer.enforceSingleTab();
    }));

    // Also enforce on initial layout ready
    this.app.workspace.onLayoutReady(() => {
      this.tabEnforcer.enforceSingleTab();
    });

    // Register settings tab
    this.addSettingTab(new DisableTabsSettingTab(this.app, this));
  }

  updateMobileTabIconCSS(): void {
    // Toggle CSS class on body element based on setting
    if (this.settings.hideMobileNewTabIcon) {
      this.doc.body.classList.add("disable-tabs-hide-mobile-icon");
    } else {
      this.doc.body.classList.remove("disable-tabs-hide-mobile-icon");
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload(): void {
    // Clean up CSS class
    this.doc.body.classList.remove("disable-tabs-hide-mobile-icon");
  }
}
