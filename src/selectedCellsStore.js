// selectionStore.js
import { writable } from "svelte/store";

export const selectedCells = writable(new Set());
