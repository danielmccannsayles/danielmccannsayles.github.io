import { derived } from "svelte/store";
import { filteredProjects } from "./project-store.js";

// Helper function to parse MM/YYYY date format
function parseDate(dateString) {
  const [month, year] = dateString.split('/');
  return new Date(parseInt(year), parseInt(month) - 1);
}

// Get start and end dates for a project
function getProjectDates(project) {
  if (!project.date || !Array.isArray(project.date) || project.date.length === 0) {
    return { start: new Date(0), end: new Date(0) };
  }
  
  if (project.date.length === 1) {
    const date = parseDate(project.date[0]);
    return { start: date, end: date };
  }
  
  return {
    start: parseDate(project.date[0]),
    end: parseDate(project.date[project.date.length - 1])
  };
}

// Check if two projects overlap in time
function projectsOverlap(project1, project2) {
  const dates1 = getProjectDates(project1);
  const dates2 = getProjectDates(project2);
  
  // Check if there's any overlap between the date ranges
  return dates1.start <= dates2.end && dates2.start <= dates1.end;
}

// Main timeline store that calculates project positions and levels
export const timelineProjects = derived(
  [filteredProjects],
  ([$filteredProjects]) => {
    // Sort projects by end date (most recent first) to match list view
    const sortedProjects = [...$filteredProjects].sort((a, b) => {
      const dateA = getProjectDates(a).end;
      const dateB = getProjectDates(b).end;
      return dateB - dateA; // Descending order (newest first)
    });
    
    // Calculate indentation levels based on overlaps
    const projectsWithLevels = [];
    
    sortedProjects.forEach((project) => {
      const projectDates = getProjectDates(project);
      let level = 0;
      
      // Find the minimum level where this project doesn't overlap with others
      while (true) {
        const overlapsAtLevel = projectsWithLevels.some(p => 
          p.level === level && projectsOverlap(project, p.project)
        );
        
        if (!overlapsAtLevel) {
          break;
        }
        level++;
      }
      
      projectsWithLevels.push({
        project,
        level,
        startDate: projectDates.start,
        endDate: projectDates.end
      });
    });
    
    return projectsWithLevels;
  }
);

// Helper store to get the maximum level (for calculating timeline width)
export const maxTimelineLevel = derived(
  [timelineProjects],
  ([$timelineProjects]) => {
    if ($timelineProjects.length === 0) return 0;
    return Math.max(...$timelineProjects.map(p => p.level));
  }
);

// Helper store to get all unique dates for timeline markers
export const timelineDates = derived(
  [timelineProjects],
  ([$timelineProjects]) => {
    const dates = new Set();
    
    $timelineProjects.forEach(({ startDate, endDate }) => {
      dates.add(startDate.getTime());
      dates.add(endDate.getTime());
    });
    
    return Array.from(dates)
      .map(timestamp => new Date(timestamp))
      .sort((a, b) => a - b);
  }
);