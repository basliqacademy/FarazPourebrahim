import React, { useState } from "react";
import {  Form, Spinner } from "react-bootstrap";
import styles from "./SignUpForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import Connect from "../../api/connect";
import { BASE_URL } from "../../api/endpoints";
import { useNavigate } from 'react-router-dom';
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import toastDetails from "../../utils/toast/toastDetails";
import PERSIAN from "../../utils/languages/persian/persian";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Anchor from "../components/Anchor/Anchor";
import API from "../../api/api";
import {otpRegex, phoneRegex} from "../../utils/regex/regex";

const SignUpForm = () => {
    enum Phases {
        PHONE_NUMBER,
        OTP,
    }
    const [phase, setPhase] = React.useState(Phases.PHONE_NUMBER);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = React.useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "p-number") {
            const numericValue = value.replace(/[^0-9]/g, '');
            setPhoneNumber(numericValue);
        } else if (id === "otp-code") {
            const numericValue = value.replace(/[^0-9]/g, '');
            setOtpCode(numericValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (phase === Phases.PHONE_NUMBER) {
            if (!phoneRegex.test(phoneNumber)) {
                toast(PERSIAN.invalid_phone_number, toastDetails.WARNING_CONFIG);
                setLoading(false);
                return;
            }
        } else if (phase === Phases.OTP) {

            if (!otpRegex.test(otpCode)) {
                toast(PERSIAN.invalid_otp, toastDetails.WARNING_CONFIG);
                setLoading(false);
                return;
            }
        }

        Connect.configure(BASE_URL);

        async function handleConnection() {
            try {
                if (phase === Phases.PHONE_NUMBER) {
                    const validationData = await API.validateNumber(phoneNumber);
                    console.log(validationData);

                    const data = await API.requestOTP(phoneNumber);
                    console.log(data);

                    if (data.success) {
                        setPhase(Phases.OTP);
                        toast(data.data.message, toastDetails.SUCCESS_CONFIG);
                    } else {
                        toast(data.error || PERSIAN.action_failed, toastDetails.ERROR_CONFIG);
                    }

                } else if (phase === Phases.OTP) {
                    const data = await API.register(phoneNumber,otpCode);
                    if (data.success) {
                        localStorage.setItem('authentication-token', data.data.data.token);
                        navigate('/dashboard');
                        toast(data.data.message, toastDetails.SUCCESS_CONFIG);
                    } else {
                        toast(data.error || PERSIAN.action_failed, toastDetails.ERROR_CONFIG);
                    }
                }
            } finally {
                setLoading(false);
            }
        }

        handleConnection();
    };

    return (
        <>
            {phase === Phases.PHONE_NUMBER && (
                <div>
                    <p className={styles['instruction-text']}>{PERSIAN.please_enter_number}</p>
                    <p className={styles['description-text']}>{PERSIAN.will_send_otp}</p>
                    <Form className={styles["custom-form"]} onSubmit={handleSubmit}>
                        <Form.Group className={styles["form-group"]}>
                            <Input
                                borderType={"line"}
                                openingAnimation={"regular-animation"}
                                borderColor={"black-border"}
                                transparent={"transparent"}
                                type="text"
                                id="p-number"
                                value={phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button type="submit" size={'lg'} color={'grey'} textColor={"white-text"} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : PERSIAN.sign_in_or_up}
                        </Button>

                        <p className={styles["redirect-text"]}>
                            {PERSIAN.have_account_already}
                            <Anchor color={"black"} underline={"disabled-underline"} hover={"blue-underline"} to={'/sign_in'}>
                                {PERSIAN.enter_with_password}
                            </Anchor>
                        </p>

                    </Form>
                </div>
            )}
            {phase === Phases.OTP && (
                <div>
                    <p className={styles['instruction-text']}>{PERSIAN.confirmmation_code}</p>
                    <p className={styles['description-text']}>{PERSIAN.enter_otp.replace("خود",`${phoneNumber}`)}</p>
                    <Form className={styles["custom-form"]} onSubmit={handleSubmit}>
                        <Form.Group className={styles["form-group"]}>
                            <Input
                                borderType={"line"}
                                openingAnimation={"regular-animation"}
                                borderColor={"black-border"}
                                transparent={"transparent"}
                                type="text"
                                id="otp-code"
                                value={otpCode}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button type="submit" size={'lg'} color={'grey'} textColor={"white-text"} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : PERSIAN.sign_in_or_up}
                        </Button>
                        <p className={styles["redirect-text"]}>
                            <Anchor color={'black'} hover={"blue-underline"} underline={"disabled-underline"} onClick={() => setPhase(Phases.PHONE_NUMBER)} to={'/sign_up'}>
                                {PERSIAN.change_number}
                            </Anchor>
                        </p>
                    </Form>
                </div>
            )}
        </>
    );
};

export default SignUpForm;
