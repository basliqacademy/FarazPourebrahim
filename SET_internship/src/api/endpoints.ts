export const BASE_URL: string = "http://45.159.149.130:99";
export const version: string = 'v1';
const prefix = `${BASE_URL}/api/${version}/`;

const endpoints = {
    validate_number : `auth/user/validate`,
    request_otp : `auth/user/request-otp`,
    register : `auth/user/register`,
    login_with_password : `auth/user/login-with-password`,
    get_profile : 'authenticated/me',
}

export type Endpoints = keyof typeof endpoints;

export function getURL(endpoint: Endpoints) {
    return prefix + endpoints[endpoint];
}