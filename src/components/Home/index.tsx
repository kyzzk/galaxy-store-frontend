import React from 'react';
import Navbar from '../Navbar';
import styles from './Home.module.css';

const ev = process.env.PUBLIC_URL + '/assets/ev.png';
const buttonBuy = process.env.PUBLIC_URL + '/assets/button_buy.png';
const buttonDiscord = process.env.PUBLIC_URL + '/assets/button_discord.png';

const Home = () => {
  const handleComprarClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
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

  return (
    <div className={styles.homeContainer} style={{ backgroundImage: `url(${ev})` }}>
      <Navbar />
      <div className={styles.textContainer} style={{paddingTop: 100}}>
        <h1>
          AS MELHORES
          <br />
          <span className={styles.specialText}>CONTAS UNRANKED</span>
          <br /> DE LEAGUE OF LEGENDS!
        </h1>
        <p>O melhor preço e qualidade do mercado!</p>

        <a href="/">
          <img onClick={handleComprarClick} src={buttonBuy} alt="Comprar agora" />
        </a>
      </div>
    </div>
  );
};

export default Home;
