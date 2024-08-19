import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./SigninForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import Connect from "../../api/connect";
import BASE_URL from "../../api/endpoints";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import toast from "react-simple-toasts";
import toastDetails from "../../utils/toast/toastDetails";
import PERSIAN from "../../utils/persian/persian";

const SignInForm = () => {

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "identifier") {
            setIdentifier(value);
        } else if (id === "password")
        {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        function requestBodyBuilder(identifier) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^(0\d{10})$/;

            let requestBody = {};

            requestBody['identifier'] = identifier;
            requestBody['password'] = password;

            if (emailRegex.test(identifier)) {
                requestBody['type'] = 'email';
            } else if (phoneRegex.test(identifier)) {
                requestBody['type'] = 'mobile';
            } else {
                requestBody['type'] = 'username';
            }

            return requestBody;
        }

        const connect : Connect = new Connect(BASE_URL);

        async function handleConnection() {
            let requestBody = requestBodyBuilder(identifier);
            const data = await connect.post('api/v1/auth/user/login-with-password',requestBody);
            console.log(data);
            if (data.success) {
                localStorage.setItem('authentication-token', data.data.data.token);
                navigate('/dashboard');
                toast(data.data.message, toastDetails.SUCCESS_CONFIG);
            }
            else {
                toast(data?.data?.message || PERSIAN.action_failed, toastDetails.ERROR_CONFIG);
            }
        }

        handleConnection();

    };

    return (
        <>
            <div>

                <Form className={styles["custom-form"]} onSubmit={handleSubmit}>

                    <p className={styles['description-text']}>{PERSIAN.enter_number_username_email}</p>
                    <Form.Group className={styles["form-group"]}>
                        <label className={styles["input-label"]} htmlFor={"identifier"}>{PERSIAN.identifier}</label>
                        <input
                            type="text"
                            className={styles["custom-input"]}
                            id="identifier"
                            value={identifier}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className={styles["form-group"]}>
                        <label className={styles["input-label"]} htmlFor={"password"}>{PERSIAN.password}</label>

                        <input
                            type={passwordVisible ? "text" : "password"}
                            className={styles["custom-input"]}
                            id="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEyeSlash : faEye}
                            onClick={togglePasswordVisibility}
                            className={styles["password-toggle"]}
                        />
                    </Form.Group>

                    <Button type="submit" className={styles["btn-submit"]}>
                        ورود
                    </Button>

                        <p className={styles["redirect-text"]}>
                            <a onClick={() => navigate("/sign_up")} className={styles["link-spacing"]}>{PERSIAN.enter_with_otp}</a>
                        </p>

                </Form>
            </div>
        </>
    );
};

export default SignInForm;
