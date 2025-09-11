import { writable, derived } from "svelte/store";
import { projects } from "../data/projects.js";

export const expandedId = writable(null);
export const showExperienceOnly = writable(false);
export const selectedSeries = writable(null);

// Helper function to parse MM/YYYY date format and get the last date
function getLastDate(project) {
  if (!project.date || !Array.isArray(project.date) || project.date.length === 0) {
    return new Date(0); // Default to epoch if no date
  }
  
  const lastDateString = project.date[project.date.length - 1];
  const [month, year] = lastDateString.split('/');
  return new Date(parseInt(year), parseInt(month) - 1); // month is 0-indexed in Date
}

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

// Check if there are any projects with experience in the current filter
export const hasExperienceProjects = derived(
  [selectedSeries],
  ([$selectedSeries]) => {
    let projectsToCheck = projects;

    if ($selectedSeries) {
      projectsToCheck = projectsToCheck.filter(
        (project) => project.series?.name === $selectedSeries
      );
    }

    return projectsToCheck.some((project) => project.experience === true);
  }
);

// Check if there are any projects with series in the current filter
export const hasSeriesInFiltered = derived(
  [showExperienceOnly],
  ([$showExperienceOnly]) => {
    let projectsToCheck = projects;

    if ($showExperienceOnly) {
      projectsToCheck = projectsToCheck.filter(
        (project) => project.experience === true
      );
    }

    return projectsToCheck.some((project) => project.series?.name);
  }
);

// Check if any filters are currently active
export const hasActiveFilters = derived(
  [showExperienceOnly, selectedSeries],
  ([$showExperienceOnly, $selectedSeries]) => {
    return $showExperienceOnly || $selectedSeries !== null;
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

export function clearAllFilters() {
  showExperienceOnly.set(false);
  selectedSeries.set(null);
}
