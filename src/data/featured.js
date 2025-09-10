import { arenaAiSafety } from "./arena.js";
import { matsApplication } from "./mats.js";
import hackathonImg from "../assets/hackathon.png";
import diffImg from "../assets/diff.png";

export const featuredItems = [
  {
    id: arenaAiSafety.id,
    title: arenaAiSafety.title,
    summary: arenaAiSafety.summary,
    dateRange: arenaAiSafety.date,
    picture: hackathonImg,
  },
  {
    id: matsApplication.id,
    title: matsApplication.title,
    summary: matsApplication.summary,
    dateRange: matsApplication.date,
    picture: diffImg,
  },
];
