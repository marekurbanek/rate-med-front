export interface IDoctor {
  id: number;
  userId?: number;
  name: string;
  specialities: string[];
  image: string;
  lastComment: string;
}
