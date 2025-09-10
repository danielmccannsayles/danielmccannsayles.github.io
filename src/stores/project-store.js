import { writable } from "svelte/store";

export const expandedId = writable(null);

export function toggleExpand(projectId) {
  expandedId.update(current => current === projectId ? null : projectId);
}