import apiClient from './api-client';
import type { CategoryListResponse } from '../types/category';

export const categoryApi = {
    // Get all categories for the current user
    getCategories: async (): Promise<CategoryListResponse> => {
        const response = await apiClient.get<CategoryListResponse>('/categories');
        return response.data;
    },
};
