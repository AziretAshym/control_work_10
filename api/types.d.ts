export interface News {
    id: string;
    title: string;
    content: string;
    image: string | null;
    create_at: string;
}

export type NewsWithoutId = Omit<News, "id" | "create_at">

export interface Comment {
    id: string;
    news_id: string;
    author?: string;
    comment: string;
}

export type CommentWithoutId = Omit<Comment, "id">;