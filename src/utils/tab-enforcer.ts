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
      // Find the active leaf by checking which leaf is currently active
      // This avoids using the deprecated activeLeaf property
      // Check the leaf's container element for the 'is-active' class
      let active: WorkspaceLeaf | null = null;
      
      for (const leaf of leaves) {
        // Check if this leaf's view container has the active class
        // The active leaf will have the 'is-active' class on its view's container element
        const view = leaf.view;
        if (view && 'containerEl' in view) {
          const containerEl = (view as { containerEl: HTMLElement }).containerEl;
          if (containerEl && containerEl.hasClass('is-active')) {
            active = leaf;
            break;
          }
        }
      }
      
      // Fallback: if no active leaf found, use the first leaf
      if (!active && leaves.length > 0) {
        active = leaves[0];
      }

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
