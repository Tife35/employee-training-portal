export interface Course {
    id: number;
    title: string;
    description: string;
    progress: number;
    duration: string;
    lessons: {
        id: number;
        title: string;
        completed: boolean;
    }[];
    category?: string;
}