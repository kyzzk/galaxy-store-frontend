import Footer from "../Footer";
import Navbar from "../Navbar";
import styles from './404.module.css';

function NotFound() {
  return (
    <div className={styles.homeContainer}>
      <Navbar/>
      <div className={styles.content}>
        <h1>404 Página não Encontrada</h1>
      </div>
    </div>
  );
}

export default NotFound;
