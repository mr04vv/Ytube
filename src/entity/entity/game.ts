export interface Game{
  id: number;
  title: string;
}

export const implementsGame = (arg: any): arg is Game[] => arg !== null &&
  Array.isArray(arg);
