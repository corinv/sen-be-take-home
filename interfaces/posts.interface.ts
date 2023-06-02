export interface Post {
  title: string;
  content: string;
  user_id: number;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface SearchParams {
  // TODO: Implement search parameter types
}
