import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faClock, faChevronDown, faCopy } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../Navbar";
import Footer from "../Footer";
import styles from './PaymentRedirect.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaHourglass } from "react-icons/fa";

function PaymentRedirect() {
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const { id } = useParams();
  const [expandItems, setExpandItems] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const [status, setStatus] = useState('PENDENTE');
  const [quantidade, setQuantidade] = useState(0);
  const [pixCopiaCola, setPixCopiaCola] = useState('');
  const [qr64, setQr64] = useState('');

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState(0);
  const [total, setTotal] = useState(0);

  const [timerON, setTimerON] = useState(false)
  const [timer, setTimer] = useState(10);

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
  useEffect(() => {
    if (status === "APROVADO") {
      setTimerON(true);
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [status]);

  useEffect(() => {
    if (timer === 0 && timerON) {
      navigate("/profile");
    }
  }, [timer, timerON]);
  
  useEffect(() => {
    const checkAuthentication = async () => {
      if (timerON) {
        return;
      }
      const token = getAuthenticationToken();
      if (!token) {
        navigate("/");
      } else {

        const response = await axios.get(`${API_URL}/api/pedido`, {
          params: {
            id: id,
            token: token
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          console.log(response.data)

          setStatus(response.data.status)
          setQuantidade(response.data.quantidade)
          setPixCopiaCola(response.data.pix_copia)
          setTotal(response.data.total)

          setNome(response.data.produto.nome)
          setDescricao(response.data.produto.descricao)
          setPreco(response.data.produto.preco)

          setQr64(`data:image/png;base64,${response.data.qr_64}`)

          let status = response.data.status;
          if (status === "P") {
            setStatus("PENDENTE")
          }else if (status === "A") {
            setStatus("APROVADO")
          }else if (status === "C") {
            setStatus("CANCELADO") 
          } else if (status === "E") {
            setStatus("EXPIRADO")
          }
        }
      }
    }
    checkAuthentication();

    const timer = setInterval(() => {
      if (timerON) {
        clearInterval(timer);
        return;
      }
      checkAuthentication();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopiaCola);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const toggleItems = () => {
    setExpandItems(!expandItems);
  };

  return (
    <div className={`${styles.homeContainer} ${styles.container}`}>
      <Navbar />
      <div className={styles.paymentRedirectContainer}>
        <h1>Pagamento do Pedido</h1>
        <div className={styles.flexContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.orderInfo}>
              <h2>Resumo do Pedido:</h2>
              <div className={styles.itemsSection}>
                <div className={styles.itemsHeader} onClick={toggleItems}>
                  <h3>Itens Comprados</h3>
                  <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
                </div>
                {expandItems && (
                  <div className={styles.itemsDetails}>
                    <div className={styles.item}>
                      <span>{nome}</span>
                      <span>R$ {preco}</span>
                    </div>
                    <span>Categoria: {descricao}</span>
                  </div>
                )}
              </div>
              <p>ID: {id}</p>
              <p>Valor: R$ {total.toFixed(2)}</p>
              <p>Total de Itens: {quantidade}</p>
              <div className={styles.statusContainer}>
                <h3>Status do Pedido:</h3>
                {status === 'PENDENTE' && (
                  <div className={`${styles.statusPending} ${styles.status}`}>
                    <FontAwesomeIcon icon={faClock} className={styles.icon} />
                    <span>PENDENTE</span>
                  </div>
                )}
                {status === 'APROVADO' && (
                  <div className={`${styles.statusApproved} ${styles.status}`}>
                    <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
                    <span>APROVADO</span>
                  </div>
                )}
                {status === 'CANCELADO' && (
                  <div className={`${styles.statusCanceled} ${styles.status}`}>
                    <FontAwesomeIcon icon={faTimesCircle} className={styles.icon} />
                    <span>CANCELADO</span>
                  </div>
                )}
                {status === 'EXPIRADO' && (
                  <div className={`${styles.statusExpired} ${styles.status}`}>
                    <FontAwesomeIcon icon={faTimesCircle} className={styles.icon} />
                    <span>EXPIRADO</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.qrCodeContainer}>
              <div className={styles.qrCodeWrapper}>
                <img src={qr64} alt="Imagem" />
              </div>
              <div className={styles.pixButton} onClick={handleCopyPix}>
                <FontAwesomeIcon icon={faCopy} className={styles.icon} />
                <span>Pix Copia e Cola</span>
              </div>
              {copySuccess && <div className={styles.notification}>Copiado com sucesso!</div>}
            </div>
          </div>
        </div>
        <h4 style={{color: 'yellow', paddingTop: '10'}}>IMPORTANTE: Você receberá a sua conta no seu Perfil, em "Minhas Contas"</h4>
        {timerON && (
        <div style={{paddingTop: 10}}>
          <h4 style={{ marginBottom: "10px" }}>
            <FaHourglass style={{ marginRight: "5px" }} />
            Você será redirecionado para o seu perfil em {timer} segundos...
          </h4>
        </div>
      )}

      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default PaymentRedirect;
