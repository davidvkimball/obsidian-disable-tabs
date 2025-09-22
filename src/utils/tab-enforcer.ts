import { App, WorkspaceLeaf } from "obsidian";

export class TabEnforcer {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  enforceSingleTab(): void {
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
