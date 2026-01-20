export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
}

export interface CategoryListResponse {
    categories: Category[];
}
