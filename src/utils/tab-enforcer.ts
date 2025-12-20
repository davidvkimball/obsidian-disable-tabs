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
      // Find the active leaf (the one that just opened or is currently active)
      // Prefer the last leaf as it's most likely the newly opened one
      let active: WorkspaceLeaf | null = leaves[leaves.length - 1];
      
      // Verify it's actually active by checking for the is-active class
      for (const leaf of leaves) {
        const view = leaf.view;
        if (view && 'containerEl' in view) {
          const containerEl = (view as { containerEl: HTMLElement }).containerEl;
          if (containerEl && containerEl.hasClass('is-active')) {
            active = leaf;
            break;
          }
        }
      }

      // Close all other tabs to replace the current tab smoothly
      leaves.forEach(leaf => {
        if (leaf !== active) {
          leaf.detach();
        }
      });
    }
  }
}
