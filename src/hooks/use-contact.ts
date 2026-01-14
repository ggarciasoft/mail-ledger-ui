import { useMutation } from '@tanstack/react-query';
import { submitContactMessage } from '../lib/contact-api';
import type { ContactFormData } from '../types/contact';

export function useSubmitContactMessage() {
    return useMutation({
        mutationFn: (data: ContactFormData) => submitContactMessage(data),
    });
}
