import { writable, derived } from "svelte/store";
import { projects } from "../data/projects.js";

export const expandedId = writable(null);
export const showExperienceOnly = writable(false);

export const filteredProjects = derived(
  showExperienceOnly,
  ($showExperienceOnly) => {
    if ($showExperienceOnly) {
      return projects.filter(project => project.experience === true);
    }
    return projects;
  }
);

export function toggleExpand(projectId) {
  expandedId.update(current => current === projectId ? null : projectId);
}

export function toggleExperienceFilter() {
  showExperienceOnly.update(current => !current);
}