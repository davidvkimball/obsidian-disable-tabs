import { Plugin } from "obsidian";
import { DisableTabsSettings, DEFAULT_SETTINGS } from "./settings";
import { TabEnforcer } from "./utils/tab-enforcer";

export default class DisableTabsPlugin extends Plugin {
  settings!: DisableTabsSettings;
  private tabEnforcer!: TabEnforcer;

  async onload() {
    // Load settings
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    
    // Initialize tab enforcer
    this.tabEnforcer = new TabEnforcer(this.app);

    // Hook into the workspace to enforce single tab on layout changes
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      if (this.settings.enabled) {
        this.tabEnforcer.enforceSingleTab();
      }
    }));

    // Also enforce on initial layout ready
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.enabled) {
        this.tabEnforcer.enforceSingleTab();
      }
    });
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
