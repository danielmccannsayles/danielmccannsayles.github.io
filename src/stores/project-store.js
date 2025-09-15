import { writable, derived } from "svelte/store";
import { projects } from "../data/projects.js";

export const expandedId = writable(null);
export const showExperienceOnly = writable(false);
export const showStarredOnly = writable(true);
export const selectedSeries = writable(null);

// Helper function to parse MM/YYYY date format and get the last date
function getLastDate(project) {
  if (
    !project.date ||
    !Array.isArray(project.date) ||
    project.date.length === 0
  ) {
    return new Date(0); // Default to epoch if no date
  }

  const lastDateString = project.date[project.date.length - 1];

  // Handle "current" as the most recent possible date
  if (lastDateString.toLowerCase() === "current") {
    return new Date(); // Current date/time
  }

  const [month, year] = lastDateString.split("/");
  return new Date(parseInt(year), parseInt(month) - 1); // month is 0-indexed in Date
}

export const filteredProjects = derived(
  [showExperienceOnly, showStarredOnly, selectedSeries],
  ([$showExperienceOnly, $showStarredOnly, $selectedSeries]) => {
    let filtered = projects;

    if ($showStarredOnly) {
      filtered = filtered.filter((project) => project.starred === true);
    }

    if ($showExperienceOnly) {
      filtered = filtered.filter((project) => project.experience === true);
    }

    if ($selectedSeries) {
      filtered = filtered.filter(
        (project) => project.series?.name === $selectedSeries
      );
    }

    // Sort by last date (most recent first)
    return filtered.sort((a, b) => {
      const dateA = getLastDate(a);
      const dateB = getLastDate(b);
      return dateB - dateA; // Descending order (newest first)
    });
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

// Check if there are any projects with experience in the current filtered state
export const hasExperienceProjects = derived(
  filteredProjects,
  ($filteredProjects) => {
    return $filteredProjects.some((project) => project.experience === true);
  }
);

// Check if there are any projects with series in the current filtered state
export const hasSeriesInFiltered = derived(
  filteredProjects,
  ($filteredProjects) => {
    return $filteredProjects.some((project) => project.series?.name);
  }
);

// Check if there are any projects with starred in the current filtered state
export const hasStarredProjects = derived(
  filteredProjects,
  ($filteredProjects) => {
    return $filteredProjects.some((project) => project.starred === true);
  }
);

// Check if any filters are currently active
export const hasActiveFilters = derived(
  [showExperienceOnly, showStarredOnly, selectedSeries],
  ([$showExperienceOnly, $showStarredOnly, $selectedSeries]) => {
    return $showExperienceOnly || $showStarredOnly || $selectedSeries !== null;
  }
);

export function toggleExpand(projectId) {
  expandedId.update((current) => (current === projectId ? null : projectId));
}

export function toggleExperienceFilter() {
  showExperienceOnly.update((current) => !current);
}

export function setSeriesFilter(seriesName) {
  selectedSeries.set(seriesName);
}

export function toggleStarredFilter() {
  showStarredOnly.update((current) => !current);
}

export function clearAllFilters() {
  showExperienceOnly.set(false);
  showStarredOnly.set(false);
  selectedSeries.set(null);
}
