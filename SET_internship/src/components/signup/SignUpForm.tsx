import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./SignUpForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import connect from "../../api/connect";
import Connect from "../../api/connect";
import BASE_URL from "../../api/endpoints";

const SignUpForm = () => {
    enum Phases {
        PHONE_NUMBER,
        OTP,
    }
    const [phase, setPhase] = React.useState(Phases.PHONE_NUMBER);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = React.useState('');

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

        async function func() {
            if (phase === Phases.PHONE_NUMBER) {
                const data = await connect.post("api/v1/auth/user/request-otp", {'mobile': phoneNumber});
                console.log(data);
                if (data.success) {
                    setPhase(Phases.OTP);
                }
            }
            else if (phase === Phases.OTP) {
                const data = await connect.post("api/v1/auth/user/register",{'mobile': phoneNumber, 'otp': otpCode});
                console.log(data);
            }
        }

        func();


    };

    return (
        <>
            {phase === Phases.PHONE_NUMBER &&
            (<div>
                <p className={styles['instruction-text']}>لطفا شماره موبایل خود را وارد کنید</p>
                <p className={styles['description-text']}>پیامکی حاوی کد تایید به این شماره موبایل فرستاده خواهد شد</p>
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
                        ورود | ثبت نام
                    </Button>

                        <p className={styles["redirect-text"]}>
                            قبلاً حساب کاربری دارید؟
                            <a className={styles["link-spacing"]}>ورود</a>
                        </p>

                </Form>
            </div>
            )}
            {
                phase === Phases.OTP && (
                    <div>
                        <p className={styles['instruction-text']}>کد تایید</p>
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
                            ورود | ثبت نام
                        </Button>
                        <p className={styles["redirect-text"]}>
                            <a className={styles["link-spacing"]} onClick={() => setPhase(Phases.PHONE_NUMBER)}>
                            تغییر دادن شماره موبایل
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
