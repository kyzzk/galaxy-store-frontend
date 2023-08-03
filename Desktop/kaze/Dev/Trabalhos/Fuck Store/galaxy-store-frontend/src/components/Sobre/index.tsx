import React from 'react';
import { useState, useEffect} from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CountUp from 'react-countup';
import styles from './Sobre.module.css';
import StarRatings from 'react-rating-stars-component';

interface Depoimento {
  nome: string;
  depoimento: string;
  rating: number;
}

const SobreNos: React.FC = () => {
  const depoimentos: Depoimento[] = [
    {
      nome: "Lucas",
      depoimento: "Atendimento rápido e eficaz. Amei a experiência!",
      rating: 4.5
    },
    {
      nome: "Ana",
      depoimento: "Encontrei exatamente o que procurava. Compra tranquila e rápida.",
      rating: 5
    },
    {
      nome: "Ricardo",
      depoimento: "Fácil navegação e ótimos produtos. Voltarei a comprar com certeza!",
      rating: 4
    },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SOBRE NÓS</h1>
      <p className={styles.subtitle}>Alguns de nossos dados!</p>
      <div className={styles.data}>
        <div>
          <h2>
            <CountUp end={12} duration={5} />+
          </h2>
          <p className={styles.pGray}>Meses de mercado</p>
        </div>
        <div>
          <h2>
            <CountUp end={600} duration={8} />+
          </h2>
          <p className={styles.pGray}>Usuários registrados</p>
        </div>
        <div>
          <h2>
            <CountUp end={2000} duration={10} />+
          </h2>
          <p className={styles.pGray}>Contas vendidas</p>
        </div>
        <div>
          <h2>
            <CountUp end={160000} duration={10} />+
          </h2>
          <p className={styles.pGray}>Horas economizadas</p>
        </div>
      </div>
      <p className={styles.subtitle}>O que nossos clientes falam?</p>
      {isMobile ? (
        <div className={styles.card}>
          <p>"{depoimentos[0].depoimento}"</p>
          <div className={styles.ratingContainer}>
            <StarRatings
              count={5}
              value={depoimentos[0].rating}
              edit={false}
              activeColor="#0ACCE8"
              size={24}
              isHalf={true}
            />
          </div>
          <p>- {depoimentos[0].nome}</p>
        </div>
      ) : (
        <div className={styles.carouselContainer}>
          <Carousel autoPlay interval={5000} infiniteLoop useKeyboardArrows dynamicHeight centerMode={true}>
            {depoimentos.map((dep, index) => (
                <div className={styles.card} key={index}>
                  <p>"{dep.depoimento}"</p>
                  <div className={styles.ratingContainer}>
                    <StarRatings
                      count={5}
                      value={dep.rating}
                      edit={false}
                      activeColor="#0ACCE8"
                      size={24}
                      isHalf={true}
                    />
                  </div>
                  <p>- {dep.nome}</p>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    );
  };
  
  export default SobreNos;
  
