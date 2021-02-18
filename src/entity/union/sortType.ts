export const SortTypes = {
  NEWEST: 0,
  OLDEST: 1,
  LIKE_COUNT: 2,
  PLAY_COUNT: 3,
} as const;

export type SortType = typeof SortTypes[keyof typeof SortTypes];

export const SortTypeRelation = {
  0: SortTypes.NEWEST,
  1: SortTypes.OLDEST,
  2: SortTypes.LIKE_COUNT,
  3: SortTypes.PLAY_COUNT,
} as const;
