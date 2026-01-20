import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../lib/category-api';

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.getCategories,
        staleTime: 5 * 60 * 1000, // 5 minutes - categories don't change often
    });
}
