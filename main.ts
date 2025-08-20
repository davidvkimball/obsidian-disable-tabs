// Import necessary Obsidian modules
import { Plugin, WorkspaceLeaf } from "obsidian";

// No settings needed, as we're hardcoding single-tab behavior

export default class SingleTabPlugin extends Plugin {

    async onload() {
        // Hook into the workspace to enforce single tab on layout changes
        this.registerEvent(this.app.workspace.on("layout-change", () => {
            this.enforceSingleTab();
        }));

        // Also enforce on initial layout ready
        this.app.workspace.onLayoutReady(() => {
            this.enforceSingleTab();
        });
    }

    enforceSingleTab() {
        const leaves: WorkspaceLeaf[] = [];
        this.app.workspace.iterateRootLeaves(leaf => {
            leaves.push(leaf);
        });

        if (leaves.length > 1) {
            const active = this.app.workspace.activeLeaf;
            if (active && leaves.includes(active)) {
                leaves.forEach(leaf => {
                    if (leaf !== active) {
                        leaf.detach();
                    }
                });
            } else {
                // Fallback: close all but the first
                leaves.slice(1).forEach(leaf => leaf.detach());
            }
        }
    }
}