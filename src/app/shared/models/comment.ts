export interface IComment {
  id: number;
  doctorId?: number;
  userId?: number;
  text: string;
  rating: number;
  created: string;
  createdAt?: string;
}
