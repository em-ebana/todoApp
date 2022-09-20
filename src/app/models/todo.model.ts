export interface Todo {
    heading: string; 
    content: string;
    tags: string[];
    done: boolean;
    imageUrl: string;
    date: Date;
    user_id: number;
}