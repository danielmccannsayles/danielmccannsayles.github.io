import { writable, derived } from "svelte/store";
import { projects } from "../data/projects.js";

export const expandedId = writable(null);
export const showExperienceOnly = writable(false);
export const selectedSeries = writable(null);

export const filteredProjects = derived(
  [showExperienceOnly, selectedSeries],
  ([$showExperienceOnly, $selectedSeries]) => {
    let filtered = projects;

    if ($showExperienceOnly) {
      filtered = filtered.filter((project) => project.experience === true);
    }

    if ($selectedSeries) {
      filtered = filtered.filter(
        (project) => project.series?.name === $selectedSeries
      );
    }

    return filtered;
  }
);

export const availableSeries = derived([], () => {
  const seriesSet = new Set();
  projects.forEach((project) => {
    if (project.series?.name) {
      seriesSet.add(project.series.name);
    }
  });
  return Array.from(seriesSet).sort();
});

export function toggleExpand(projectId) {
  expandedId.update((current) => (current === projectId ? null : projectId));
}

export function toggleExperienceFilter() {
  showExperienceOnly.update((current) => !current);
}

export function setSeriesFilter(seriesName) {
  selectedSeries.set(seriesName);
}
