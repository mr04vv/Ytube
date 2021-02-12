export const SortTypes = {
  NEWEST: 0,
  OLDEST: 1,
  LIKE_COUNT: 2,
  PLAY_COUNT: 3,
} as const;

export type SortType = typeof SortTypes[keyof typeof SortTypes];
