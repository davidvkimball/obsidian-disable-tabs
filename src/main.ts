import { Plugin } from "obsidian";
import { DisableTabsSettings, DEFAULT_SETTINGS } from "./settings";
import { TabEnforcer } from "./utils/tab-enforcer";
import { DisableTabsSettingTab } from "./ui/settings-tab";

export default class DisableTabsPlugin extends Plugin {
  settings!: DisableTabsSettings;
  private tabEnforcer!: TabEnforcer;
  private mobileTabIconStyleEl?: HTMLStyleElement;

  async onload() {
    // Load settings
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    
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
    // Remove existing style element if it exists
    if (this.mobileTabIconStyleEl) {
      this.mobileTabIconStyleEl.remove();
      this.mobileTabIconStyleEl = undefined;
    }

    // Add CSS if setting is enabled
    if (this.settings.hideMobileNewTabIcon) {
      this.mobileTabIconStyleEl = document.createElement("style");
      this.mobileTabIconStyleEl.id = "disable-tabs-mobile-icon-css";
      this.mobileTabIconStyleEl.textContent = `
.mobile-navbar-action-tabs {
  display: none;
}
      `.trim();
      document.head.appendChild(this.mobileTabIconStyleEl);
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload(): void {
    // Clean up CSS style element
    if (this.mobileTabIconStyleEl) {
      this.mobileTabIconStyleEl.remove();
    }
  }
}
