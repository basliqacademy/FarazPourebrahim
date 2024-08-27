import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import styles from "./SignInForm.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import Connect from "../../api/connect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import toast from "react-simple-toasts";
import toastDetails from "../../utils/toast/toastDetails";
import PERSIAN from "../../utils/languages/persian/persian";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Anchor from "../components/Anchor/Anchor";
import API from "../../api/api";
import {emailRegex, persianLetterRegex, phoneRegex} from "../../utils/regex/regex";

const SignInForm = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "identifier") {
            setIdentifier(value);
        } else if (id === "password") {
            if (persianLetterRegex.test(value)) {
                toast(PERSIAN.no_persian_in_password, toastDetails.WARNING_CONFIG);
                return;
            }
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        async function handleConnection() {
            let type;
            if (emailRegex.test(identifier)) {
                type = 'email';
            } else if (phoneRegex.test(identifier)) {
                type = 'mobile';
            } else {
                type = 'username';
            }

            const json = await API.logWithPassword({identifier, password, type});
            console.log(json);
            if (json.success) {
                Connect.refreshToken(json.data.token);
                navigate('/dashboard');
                toast(json.message, toastDetails.SUCCESS_CONFIG);
            }
            else {
                toast(json.error || PERSIAN.action_failed, toastDetails.ERROR_CONFIG);
            }
            setLoading(false);
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
                        <Input
                            borderColor={"black-border"}
                            borderType={"line"}
                            transparent={"transparent"}
                            openingAnimation={"no-animation"}
                            type="text"
                            id="identifier"
                            value={identifier}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className={styles["form-group"]}>
                        <label className={styles["input-label"]} htmlFor={"password"}>{PERSIAN.password}</label>
                        <Input
                            borderColor={"black-border"}
                            borderType={"line"}
                            transparent={"transparent"}
                            openingAnimation={"no-animation"}
                            type={passwordVisible ? "text" : "password"}
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

                    <Button type="submit" size={"lg"} color={"grey"} textColor={"white-text"} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : PERSIAN.enter}
                    </Button>

                    <p className={styles["redirect-text"]}>
                        <Anchor color={"black"} underline={"on-hover"} to={'/sign_up'}>
                            {PERSIAN.enter_with_otp}
                        </Anchor>
                    </p>
                </Form>
            </div>
        </>
    );
};

export default SignInForm;
