import { App, PluginSettingTab, Setting } from "obsidian";
import DisableTabsPlugin from "../main";
import { DisableTabsSettings } from "../settings";

export class DisableTabsSettingTab extends PluginSettingTab {
  plugin: DisableTabsPlugin;
  settings: DisableTabsSettings;

  constructor(app: App, plugin: DisableTabsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.settings = plugin.settings;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Hide mobile tabs icon")
      .setDesc("Hide the tabs icon on mobile devices")
      .addToggle((toggle) =>
        toggle
          .setValue(this.settings.hideMobileNewTabIcon)
          .onChange(async (value) => {
            this.settings.hideMobileNewTabIcon = value;
            await this.plugin.saveSettings();
            this.plugin.updateMobileTabIconCSS();
          })
      );
  }
}

