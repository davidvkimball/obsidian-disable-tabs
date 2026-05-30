import { App, PluginSettingTab , Setting, SettingGroup} from "obsidian";
import DisableTabsPlugin from "../main";
import { DisableTabsSettings } from "../settings";


export class DisableTabsSettingTab extends PluginSettingTab {
  // Shown beside the plugin name in settings search results (1.13) and in the
  // settings sidebar on older Obsidian (SettingTab.icon).
  public icon = 'lucide-panel-top-dashed';
  plugin: DisableTabsPlugin;
  settings: DisableTabsSettings;

  constructor(app: App, plugin: DisableTabsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.settings = plugin.settings;
  }

  // 1.13.0+: framework calls this and skips display().
  // Pre-1.13.0: this method is not invoked; display() below runs as before.
  // See https://docs.obsidian.md/plugins/guides/migrate-declarative-settings
  getSettingDefinitions() {
    return [
      {
        name: 'Hide mobile tabs icon',
        desc: 'Hide the tabs icon on mobile devices',
        // Render: changing this value has a side effect (mobile tab icon CSS update).
        render: (setting: Setting) => {
          setting.addToggle(toggle => toggle
            .setValue(this.settings.hideMobileNewTabIcon)
            .onChange(async value => {
              this.settings.hideMobileNewTabIcon = value;
              await this.plugin.saveSettings();
              this.plugin.updateMobileTabIconCSS();
            }));
        },
      },
    ];
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    // First group (no heading)
    const generalGroup = new SettingGroup(containerEl);
    generalGroup.addSetting(setting => {
      setting
        .setName("Hide mobile tabs icon")
        .setDesc("Hide the tabs icon on mobile devices")
        .addToggle(toggle =>
          toggle
            .setValue(this.settings.hideMobileNewTabIcon)
            .onChange(async value => {
              this.settings.hideMobileNewTabIcon = value;
              await this.plugin.saveSettings();
              this.plugin.updateMobileTabIconCSS();
            })
        );
    });
  }
}

