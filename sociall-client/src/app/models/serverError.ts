export interface ServerError{
    statusCode?: number;
    message?: string;
    details?: string;
    title?: string;
    errors?: any;
}