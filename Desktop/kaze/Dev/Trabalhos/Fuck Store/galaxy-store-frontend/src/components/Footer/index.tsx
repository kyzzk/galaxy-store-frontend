import React from 'react';
import styles from './Footer.module.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { Facebook, Instagram, Twitter } from '@mui/icons-material';


const Footer = () => {
    const navigate = useNavigate();

    const handleSelecionarClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
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


      const handleFAQClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate('/');
        setTimeout(() => {
          const selecionarRegiaoSection = document.getElementById('faq');
          if (selecionarRegiaoSection) {
            const targetPosition = selecionarRegiaoSection.offsetTop;
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
    

    return (
        <div className={styles.footer}>
            <div className={styles.left}>
                <h1 className={styles.title}>GALAXY STORE</h1>
                <p className={styles.text}>Compre a sua smurf em menos de 2 minutos!</p>
                <div className={styles.icons}>
                    <Twitter className={styles.icon} />
                    <Instagram className={styles.icon} />
                    <Facebook className={styles.icon} />
                </div>
            </div>

            <div className={styles.center}>
                <p className={styles.terms}>Termos e Condições</p>
                <p className={styles.disclaimer}>
                    League of Legends é uma marca registrada da Riot Games, Inc. Nós não somos de nenhuma forma afiliados, associados ou endossados pela Riot Games, Inc. Todos os direitos autorais, marcas, imagens e marcas de serviço pertencem a seus respectivos proprietários.
                </p>
                <p className={styles.madeBy}>
                    <a href="https://twitter.com/kazedgaf" target="_blank" rel="noopener noreferrer">
                        Made with ❤️ by kaze
                    </a>
                </p>
            </div>


            <div className={styles.right}>
                <div className={styles.options}>
                    <h2>Opções</h2>
                    <ul>
                        <li><Link to="/login">Logar</Link></li>
                        <li><Link to="/register">Registrar</Link></li>
                        <li><Link to="#" onClick={handleSobreClick}>Sobre nós</Link></li>
                        <li><Link to="#" onClick={handleFAQClick}>FAQ</Link></li>
                    </ul>
                </div>
                <div className={styles.services}>
                    <h2>Serviços</h2>
                    <ul>
                        <li><Link to="#" onClick={handleSelecionarClick}>Contas Unranked (Aleatórias)</Link></li>
                        <li><Link to="#" onClick={handleSelecionarClick}>Contas Unranked (Escolha de Skin)</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
