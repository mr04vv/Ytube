export interface Category {
  id: number;
  name: string;
}

export const implementsCategory = (arg: any): arg is Category[] => arg !== null &&
  Array.isArray(arg);
