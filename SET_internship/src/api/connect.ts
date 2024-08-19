enum ApiErrorType {
    NETWORK = 'network',
    CORS = 'cors',
    TIMEOUT = 'timeout',
    SERVER = 'server',
    PARSE = 'parse',
    UNKNOWN = 'unknown',
}

type ApiResponse = {
    success: boolean;
    data?: any;
    error?: string;
    errorType?: ApiErrorType;
}

class Connect {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request(endpoint: string, options?: RequestInit): Promise<ApiResponse> {
        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`, options);

            const result: ApiResponse = {
                success: response.ok,
            };
                try {
                    const contentType = response.headers.get('Content-Type');
                    if (contentType && contentType.includes('application/json')) {
                        result.data = await response.json();
                    } else {
                        result.success = false;
                        result.error = 'Expected JSON response';
                        result.errorType = ApiErrorType.PARSE;
                    }
                } catch {
                    result.success = false;
                    result.error = 'Failed to parse response';
                    result.errorType = ApiErrorType.PARSE;
                }
            


            return result;
        } catch (error: any) {
            const result: ApiResponse = { success: false };

            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                result.error = 'Network connection lost';
                result.errorType = ApiErrorType.NETWORK;
            } else if (error.message.includes('CORS')) {
                result.error = 'CORS policy issue';
                result.errorType = ApiErrorType.CORS;
            } else if (error.message.includes('timeout')) {
                result.error = 'Request timed out';
                result.errorType = ApiErrorType.TIMEOUT;
            } else {
                result.error = error.message || 'Unknown error';
                result.errorType = ApiErrorType.UNKNOWN;
            }

            return result;
        }
    }

    public get(endpoint: string, options?: RequestInit): Promise<any> {
        return this.request(
            endpoint,
            {
                method: 'GET',
                ...options
            }
        );
    }

    public post(endpoint: string, body: any, options?: RequestInit): Promise<any> {
        return this.request(
            endpoint,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                ...options
            }
        );
    }

    public put(endpoint: string, body: any, options?: RequestInit): Promise<any> {
        return this.request(
            endpoint,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                ...options
            }
        );
    }

    public delete(endpoint: string, options: RequestInit): Promise<any> {
        return this.request(
            endpoint,
            {
                method: 'DELETE',
                ...options
            }
        );
    }
}

export default Connect;