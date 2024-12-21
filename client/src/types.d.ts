export interface INews {
  id: string;
  title: string;
  content: string;
  image: string | null;
  create_at: string;
}

export interface INewsMutation {
  title: string;
  content: string;
  image: File | null;
}

export interface IComment {
  id: string;
  news_id: string;
  author?: string;
  text: string;
}


export type CommentWithoutId = Omit<Comment, "id">;
