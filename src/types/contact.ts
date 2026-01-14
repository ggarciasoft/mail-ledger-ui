export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export interface SubmitContactMessageRequest {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export interface SubmitContactMessageResponse {
    message: string;
}
