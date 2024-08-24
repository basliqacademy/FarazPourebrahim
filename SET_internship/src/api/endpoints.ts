export const BASE_URL: string = "http://45.159.149.130:99";
export const version: string = 'v1';
export const endpoints = {
    validate_number : `api/${version}/auth/user/validate`,
    request_otp : `api/${version}/auth/user/request-otp`,
    register : `api/${version}/auth/user/register`,
    login_with_password : `api/${version}/auth/user/login-with-password`,
}