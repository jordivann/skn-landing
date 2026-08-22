import homeData from "./HomeContent.json";
import type { HomeContent } from "./home.types";
import { validateHomeContent } from "./home.validator";

const data: HomeContent = validateHomeContent(homeData);

export function getHomeContent(): HomeContent {
  return data;
}