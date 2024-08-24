enum ApiErrorType {
    NETWORK = 'network',
    CORS = 'cors',
    TIMEOUT = 408,
    SERVER = 500,
    UNKNOWN = 'unknown',
}

type SuccessResponse<T> = {
    success: true;
    data: T;
}

type ErrorResponse = {
    success: false;
    error: string;
    errorType: ApiErrorType;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

class Connect {
    private static baseURL: string;

    public static configure(baseURL: string) {
        this.baseURL = baseURL;
    }

    private static async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`, options);
            const data = await response.json();

            if (response.ok) {
                return { success: true, data };
            } else {
                return {
                    success: false,
                    error: data?.message || 'Unknown error',
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
            method: 'GET',
            ...options,
        });
    }

    public static post<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            ...options,
        });
    }

    public static put<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            ...options,
        });
    }

    public static delete<T>(endpoint: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            ...options,
        });
    }
}

export default Connect;
