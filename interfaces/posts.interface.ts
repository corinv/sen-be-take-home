export interface Post {
  title: string;
  content: string;
  user_id: number;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface PostMetadata extends Omit<Partial<Post>, "content"> {}

export interface PostMetadataParams {
  title?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SearchParams extends PostMetadataParams {
  term?: string;
}
