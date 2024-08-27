enum ApiErrorType {
    NETWORK = 1,
    CORS = 2,
    TIMEOUT = 408,
    SERVER = 500,
    FORMERROR = 422,
    UNKNOWN = 0,
}

type SuccessResponse<T> = {
    success: true;
    data: T;
    message: string;
    status : boolean;
}

type ErrorResponse = {
    success: false;
    error: string;
    errorType: ApiErrorType;
    formError?: {};
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

class Connect {
    static token: string;

    public static refreshToken(newToken?){
        if (newToken){
            Connect.token = newToken;
            localStorage.setItem('authentication-token', newToken);
            return;
        }

        const localStorageToken = localStorage.getItem('authentication-token');
        if (localStorageToken) {
            Connect.token = localStorageToken;
        }
    }

    private static getHeaders(): HeadersInit {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(Connect.token && { 'Authorization': `Bearer ${Connect.token}` }),
        };
    }

    private static async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(endpoint, options);
            const json = await response.json();

            if (response.ok) {
                return { success: true, data: json.data as T ,message: json.message, status: json.status};
            } else if (response.status === 422) {
                return {
                    success: false,
                    error: json?.message || 'Form validation error',
                    errorType: ApiErrorType.FORMERROR,
                    formError: json?.errors,
                };
            } else {
                return {
                    success: false,
                    error: json?.message || 'Unknown error',
                    errorType: ApiErrorType.SERVER,
                };
            }
        } catch (error: any) {
            let errorType: ApiErrorType = ApiErrorType.UNKNOWN;
            let errorMessage = error.message || 'Unknown error';

            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                errorMessage = 'Network connection lost';
                errorType = ApiErrorType.NETWORK;
            } else if (error.message.includes('CORS')) {
                errorMessage = 'CORS policy issue';
                errorType = ApiErrorType.CORS;
            } else if (error.message.includes('timeout')) {
                errorMessage = 'Request timed out';
                errorType = ApiErrorType.TIMEOUT;
            }

            return { success: false, error: errorMessage, errorType };
        }
    }

    public static get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            headers: this.getHeaders(),
            method: 'GET',
            ...options,
        });
    }

    public static post<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
            ...options,
        });
    }

    public static put<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
            ...options,
        });
    }

    public static patch<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
            ...options,
        });
    }

    public static delete<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
            ...options,
        });
    }
}

export default Connect;
