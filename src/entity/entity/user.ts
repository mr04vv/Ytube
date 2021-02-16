export interface User {
  id: number;
  name: string;
  imageUrl: string;
  token?: string;
}

export const implementsUser = (arg: any): arg is User => arg !== null &&
typeof arg.id === 'number';
