import styles from "./SigninForm.module.css";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import SignInForm from "./SignInForm";
import "bootstrap/dist/css/bootstrap.min.css";
import PERSIAN from "../../utils/languages/persian/persian";



const SignIn = () => {
    return (
        <section className={`d-flex align-items-center justify-content-center ${styles['wrapper']} light`}>
            <div className={styles["wrapper-overlay"]} />
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8}>
                        <div className={`p-3 ${styles['wrapper-form-card']}`}>
                            <Row>
                                <Col xs={12} lg={6}>
                                    <div className="d-flex align-items-center justify-content-center h-100">
                                        <img
                                            src="/SignUpCard.webp"
                                            alt="Sign Up Card"
                                        />
                                    </div>
                                </Col>
                                <Col xs={12} lg={6} className="mt-4 mt-lg-0">
                                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100 p-2">
                                        <h2 className={styles['wrapper-heading']}>{PERSIAN.enter_with_password}</h2>
                                        <SignInForm />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SignIn;