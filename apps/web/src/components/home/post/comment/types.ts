export interface Comment {
    id: number;
    text: string;
    user: string;
    timestamp: string;
    likes: number;
    dislikes: number;
    replies?: Comment[];
}
