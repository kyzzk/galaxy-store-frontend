import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const logo = '/assets/logo.png';
const loginButton =  '/assets/button_login.png';
const perfilButton = '/assets/button_perfil.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleComprarClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/');
    setTimeout(() => {
      const selecionarRegiaoSection = document.getElementById('selecionar-regiao');
      if (selecionarRegiaoSection) {
        const targetPosition = selecionarRegiaoSection.offsetTop + 50;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  const handleSobreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/');
    setTimeout(() => {
      const selecionarRegiaoSection = document.getElementById('sobre-nos');
      if (selecionarRegiaoSection) {
        const targetPosition = selecionarRegiaoSection.offsetTop + 30;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }, 300);
  };
  const getAuthenticationToken = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('AUTHENTICATION=')) {
        return cookie.substring('AUTHENTICATION='.length, cookie.length);
      }
    }

    return null;
  };

  useEffect(() => {
    const token = getAuthenticationToken();
    setIsAuthenticated(!!token);
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img
          className={styles.logo}
          src={logo}
          alt="Logo"
        />
      </Link>
      <FaBars
        onClick={() => setIsOpen(!isOpen)}
        className={styles.menu}
      />
      <div className={`${styles['nav-links']} ${isOpen ? styles.open : ''}`}>
        <Link to="#" onClick={handleComprarClick}>
          Comprar
        </Link>
        <Link to="#" onClick={handleSobreClick}>
          Sobre Nós
        </Link>
        {isAuthenticated ? (
          <Link to='/logout'>
            Sair
          </Link>
        ) : (
          <Link to='/register'>
            Registrar
          </Link>
        )}
        {isAuthenticated ? (
          <>
            <Link to="/profile">
              <img
                className={styles['perfil-button']}
                src={perfilButton}
                alt="Perfil"
              />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <img
              className={styles['login-button']}
              src={loginButton}
              alt="Logar"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;