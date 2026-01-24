---
name: project
description: Project-specific architecture, maintenance tasks, and unique conventions for Disable Tabs.
---

# Disable Tabs Project Skill

Disables having more than one tab open at a time. This plugin maintains a "Single Tab" workflow by automatically closing or consolidating new tabs into the active one.

## Core Architecture

- **Workspace Monitoring**: Heavily relies on tracking `layout-change` and `active-leaf-change` events.
- **Leaf Consolidation**: Rapidly closes newly created leaves to prevent tab accumulation.
- **Minimalist Design**: Optimized for performance with a tiny memory footprint.

## Project-Specific Conventions

- **No Multi-Tab UI**: Assumes the user wants to completely eliminate the tab-based interface experience.
- **Event-Driven**: Purely reactive logic with very little persistent state.
- **Atomic Operations**: Operations are fast and handled during the leaf lifecycle events.

## Key Files

- `src/main.ts`: Core logic for leaf interception and single-tab enforcement.
- `manifest.json`: Base configuration and id (`disable-tabs`).
- `styles.css`: Minimal styles (533 bytes), likely used for minor UI cleanup of tab-related elements.

## Maintenance Tasks

- **Workspace API**: Monitor changes to how Obsidian handles workplace leaves (TWorkspaceLeaf updates).
- **Concurrency**: Ensure the "close tab" logic doesn't interfere with quick-switching or search workflows.
- **Edge cases**: Verify behavior when opening modals or specialized views (like Settings).
