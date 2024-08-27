import Connect, {ApiResponse} from "./connect";
import {getURL} from "./endpoints";

type ValidateNumberRequest = { mobile: string };
type ValidateNumberResponse = {};
async function validateNumber(data: ValidateNumberRequest) {
    return await Connect.post<ValidateNumberResponse>(getURL('validate_number'), data);
}

type RequestOTPRequest = { mobile: string };
type RequestOTPResponse = {};
async function requestOTP(data: RequestOTPRequest) {
    return await Connect.post<RequestOTPResponse>(getURL('request_otp'), data);
}

type RegisterRequest = { mobile: string, otp: string };
type RegisterResponse = { token: string, is_new_user: boolean };
async function register(data: RegisterRequest) {
    return await Connect.post<RegisterResponse>(getURL('register'), data);
}

type LogWithPasswordRequest = { type: 'email'|'mobile'|'username', password: string, identifier: string };
type LogWithPasswordResponse = { token: string };
async function logWithPassword(data: LogWithPasswordRequest) {
    return await Connect.post<LogWithPasswordResponse>(getURL("login_with_password"), data);
}

type GetProfileRequest = {}
type GetProfileResponse = {/*???*/}
async function getProfile() {
    return await Connect.get<GetProfileResponse>(getURL("get_profile"));
}

const API = {
    validateNumber,requestOTP,register,logWithPassword,getProfile,
}

export default API;
