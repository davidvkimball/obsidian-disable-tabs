import { Plugin } from "obsidian";
import { DisableTabsSettings, DEFAULT_SETTINGS } from "./settings";
import { TabEnforcer } from "./utils/tab-enforcer";
import { DisableTabsSettingTab } from "./ui/settings-tab";

export default class DisableTabsPlugin extends Plugin {
  settings!: DisableTabsSettings;
  private tabEnforcer!: TabEnforcer;

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
      document.body.classList.add("disable-tabs-hide-mobile-icon");
    } else {
      document.body.classList.remove("disable-tabs-hide-mobile-icon");
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload(): void {
    // Clean up CSS class
    document.body.classList.remove("disable-tabs-hide-mobile-icon");
  }
}
