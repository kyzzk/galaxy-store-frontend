import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Footer from "../Footer";
import axios from "axios";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const API_URL = process.env.REACT_APP_API_URL;
    
    const isEmailValid = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateEmail = () => {
        if (!email) {
            setError("");
        } else if (!isEmailValid(email)) {
            setError("Por favor, digite um e-mail válido.");
        } else {
            setError("");
        }
    };

    const validatePasswords = () => {
        if (!password || !confirmPassword) {
            setError("");
        } else if (password !== confirmPassword) {
            setError("As senhas não correspondem.");
        } else {
            setError("");
        }
    };

    useEffect(() => {
        validateEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);
    useEffect(() => {
        validatePasswords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, confirmPassword]);

    const getAuthenticationToken = () => {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith("AUTHENTICATION=")) {
                return cookie.substring("AUTHENTICATION=".length, cookie.length);
            }
        }

        return null;
    };

    const deleteAuthenticationToken = () => {
        document.cookie =
            "AUTHENTICATION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = getAuthenticationToken();
                if (!token) {
                    setLoading(false);
                    return;
                }
                const response = await axios.post(
                    `${API_URL}/api/validartoken`,
                    { token }
                );

                if (response.status === 200) {
                    navigate('/')
                }
            } catch (error) {
                deleteAuthenticationToken();
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        if (password !== confirmPassword) {
            setError("As senhas não correspondem.");
            return;
        }
        if (!termsAccepted) {
            setError("Você deve aceitar os termos e condições.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/register`, {   email, password });
            console.log(response.status)

            if (response.status === 201) {
                const loginResponse = await axios.post(`${API_URL}/api/login`, {
                    email,
                    password,
                  });

                if (loginResponse.status === 200) {
                    const { token } = loginResponse.data;
                    document.cookie = `AUTHENTICATION=${token}`;
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error)
            setError("Ocorreu um erro durante o registro.");
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAccept = () => {
        setTermsAccepted(true);
        closeModal();
    };

    const handleReject = () => {
        setTermsAccepted(false);
        closeModal();
    };

    if (isLoading) {
        return <div className={`${styles.homeContainer} ${styles.container}`}>
        </div>;
    }

    return (
        <div className={`${styles.homeContainer} ${styles.container}`}>
            <Navbar />
            <div className={styles.content}>
                <h1>Bem-vindo à Galaxy Store!</h1>
                <p>
                    Você já possui uma conta?{" "}
                    <span className={styles.gradientText}>
                        <Link to="/login">Logar</Link>
                    </span>
                </p>
                <div className={styles.registerBox}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite o seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                    />
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePasswords}
                    />
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={validatePasswords}
                    />
                    <label htmlFor="termsAccepted">
                        <input
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <span style={{ paddingTop: 5 }} onClick={openModal}>
                            Aceito os termos e condições
                        </span>
                    </label>
                    {error && <p className={styles.error}>{error}</p>}
                    <button style={{ marginTop: 20 }} onClick={handleRegister}>
                        Registrar
                    </button>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        className={styles.modal}
                        overlayClassName={styles.overlay}
                    >
                        <div className={styles.modalContent}>
                            <h2>Termos e Condições</h2>
                            <div className={styles.termSection}>
                                <h3>Armazenamento de dados</h3>
                                <p>
                                    O email e a senha fornecidos serão armazenados de forma segura e
                                    criptografada em nosso sistema.
                                </p>
                            </div>
                            <div className={styles.termSection}>
                                <h3>Envio de emails promocionais</h3>
                                <p>
                                    Ao aceitar nossos termos, você concorda em receber emails promocionais
                                    sobre nossos produtos e ofertas especiais.
                                </p>
                            </div>
                            <div className={styles.modalButtons}>
                                <button onClick={handleAccept} className={styles.acceptButton}>
                                    Aceitar
                                </button>
                                <button onClick={handleReject} className={styles.rejectButton}>
                                    Não Aceitar
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}

export default Register;
