import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./SignUpForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import Connect from "../../api/connect";
import BASE_URL from "../../api/endpoints";
import {useNavigate} from 'react-router-dom';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import toastDetails from "../../utils/toast/toastDetails";
import PERSIAN from "../../utils/persian/persian";

const SignUpForm = () => {
    enum Phases {
        PHONE_NUMBER,
        OTP,
    }
    const [phase, setPhase] = React.useState(Phases.PHONE_NUMBER);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = React.useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
         if (id === "p-number") {
             const numericValue = value.replace(/[^0-9]/g, '');
             setPhoneNumber(numericValue);
         } else if (id === "otp-code")
         {
             const numericValue = value.replace(/[^0-9]/g, '');
             setOtpCode(numericValue);
         }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const connect : Connect = new Connect(BASE_URL);

        async function handleConnection() {
            if (phase === Phases.PHONE_NUMBER) {

                const validationData = await connect.post("api/v1/auth/user/validate",{'mobile': phoneNumber});
                console.log(validationData);

                if (validationData.success){

                    const data = await connect.post("api/v1/auth/user/request-otp", {'mobile': phoneNumber});
                    console.log(data);

                    if (data.success) {
                        setPhase(Phases.OTP);
                        toast(data.data.message, toastDetails.SUCCESS_CONFIG);
                    }
                    else {
                        toast(data?.data?.message || PERSIAN.action_failed, toastDetails.ERROR_CONFIG );
                    }
                }
                else {
                    toast(validationData?.data?.message || PERSIAN.action_failed, toastDetails.ERROR_CONFIG);
                }
            }
            else if (phase === Phases.OTP) {
                const data = await connect.post("api/v1/auth/user/register",{'mobile': phoneNumber, 'otp': otpCode});
                if (data.success) {
                    localStorage.setItem('authentication-token', data.data.data.token);
                    navigate('/dashboard');
                    toast(data.data.message, toastDetails.SUCCESS_CONFIG);
                }
                else {
                    toast(data?.data?.message || PERSIAN.action_failed, toastDetails.ERROR_CONFIG);
                }
            }
        }

        handleConnection();
    };

    return (
        <>
            {phase === Phases.PHONE_NUMBER &&
            (<div>
                <p className={styles['instruction-text']}>{PERSIAN.please_enter_number}</p>
                <p className={styles['description-text']}>{PERSIAN.will_send_otp}</p>
                <Form className={styles["custom-form"]} onSubmit={handleSubmit}>


                    <Form.Group className={styles["form-group"]}>
                        <input
                            type="text"
                            className={styles["custom-input"]}
                            id="p-number"
                            value={phoneNumber}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button type="submit" className={styles["btn-submit"]}>
                        {PERSIAN.sign_in_or_up}
                    </Button>

                        <p className={styles["redirect-text"]}>
                            {PERSIAN.have_account_already}
                            <a onClick={() => {navigate('/sign_in')}} className={styles["link-spacing"]}>{PERSIAN.enter}</a>
                        </p>

                </Form>
            </div>
            )}
            {
                phase === Phases.OTP && (
                    <div>
                        <p className={styles['instruction-text']}>{PERSIAN.confirmmation_code}</p>
                        <p className={styles['description-text']}>کد تایید ارسال شده به شماره {phoneNumber} را وارد نمایید</p>
                        <Form className={styles["custom-form"]} onSubmit={handleSubmit}>
                        <Form.Group className={styles["form-group"]}>
                            <input
                                type="text"
                                className={styles["custom-input"]}
                                id="otp-code"
                                value={otpCode}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button type="submit" className={styles["btn-submit"]}>
                            {PERSIAN.sign_in_or_up}
                        </Button>
                        <p className={styles["redirect-text"]}>
                            <a className={styles["link-spacing"]} onClick={() => setPhase(Phases.PHONE_NUMBER)}>
                                {PERSIAN.change_number}
                            </a>
                        </p>
                        </Form>
                    </div>
                )
            }
        </>
    );
};

export default SignUpForm;
