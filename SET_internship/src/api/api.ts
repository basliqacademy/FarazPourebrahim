import Connect, {ApiResponse} from "./connect";
import {endpoints} from "./endpoints";

const API = {
    async validateNumber<T> (phoneNumber: string): Promise<ApiResponse<T>> {
        return await Connect.post(endpoints.validate_number, { 'mobile': phoneNumber });
    },

    async requestOTP<T> (phoneNumber: string): Promise<ApiResponse<T>>{
        return await Connect.post(endpoints.request_otp, { 'mobile': phoneNumber });
    },

    async register<T> (phoneNumber: string, otpCode: string): Promise<ApiResponse<T>>{
        return await Connect.post(endpoints.register, { 'mobile': phoneNumber, 'otp': otpCode });
    },

    async LogInWithPassword<T> (requestBody: any): Promise<ApiResponse<T>>{
        return await Connect.post(endpoints.login_with_password, requestBody);
    },

    async getProfile<T> (): Promise<ApiResponse<T>> {
        return await Connect.get('api/v1/authenticated/me', {
            headers: {
                'Authorization': `Bearer ${Connect.token}`,
            },
        });
    }
}

export default API;
