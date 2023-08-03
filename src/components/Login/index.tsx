/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import axios from 'axios';
import { FaDiscord } from "react-icons/fa";

function Login() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getAuthenticationToken();
      if (token) {
        try {
          const response = await axios.post(`${API_URL}/api/validartoken`, { token });
          if (response.status === 200) {
            navigate("/");
          }
        } catch (error) {
          deleteAuthenticationToken();
        }
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha o e-mail e a senha.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        document.cookie = `AUTHENTICATION=${token}`;
        navigate("/");
      } else if (response.status === 401) {
        setError("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        setError("Ocorreu um erro durante o login. Por favor, tente novamente.");
      }
    } catch (error) {
      setError("Ocorreu um erro durante o login. Por favor, tente novamente.");
    }
  };
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
          Não tem uma conta ainda?{" "}
          <span className={styles.gradientText}>
            <Link to="/register">Registrar</Link>
          </span>
        </p>
        <div className={styles.loginBox}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite o seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.loginBoxButton} onClick={handleLogin}>Logar</button>
          <a href="https://discord.com/oauth2/authorize?client_id=1128729319590608966&redirect_uri=https%3A%2F%2Fwww.galaxyaccounts.shop%2F&response_type=code&scope=identify%20email">
            <button className={styles.discordButton}>
              <FaDiscord className={styles.discordIcon} />
              Logar com o Discord
            </button>
          </a>
          <p style={{ paddingTop: 10 }}>
            Esqueceu sua senha?{" "}
            <span className={styles.gradientText}>
              <Link to="/login">Resete aqui</Link>
            </span>
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
