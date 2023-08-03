import React, { useEffect, useState } from 'react';
import styles from './Scroll.module.css';  // Ajuste o caminho conforme necessário
import { FaArrowUp } from 'react-icons/fa'; // Importe o ícone que deseja usar

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botão quando a página é rolada para baixo
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll para o topo suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={styles.scrollToTop}>
      {isVisible && 
        <div onClick={scrollToTop}>
          {/* Substitua o texto "Topo" pelo ícone FaArrowUp */}
          <FaArrowUp style={{color: "#FF31C0", fontSize: "2rem"}} />
        </div>}
    </div>
  );
}

export default ScrollToTop;
