import Faq from '../FAQ';
import SobreNos from '../Sobre';
import SelecionarRegiao from '../SelecionarRegiao';
import Home from '../Home';
import ScrollToTop from '../Scroll';
import Footer from '../Footer';
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const location = useLocation();

  const { code } = queryString.parse(location.search);

  const deleteAuthenticationToken = () => {
    document.cookie =
      "AUTHENTICATION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  useEffect(() => {
    if (code) {
      const checkAuthentication = async () => {
          try {
            const response = await axios.post(`${API_URL}/api/discord`, { code });
            if (response.status === 200) {
              const { token } = response.data;
              document.cookie = `AUTHENTICATION=${token}`;
              navigate("/");
              window.location.reload();
            }else{
              deleteAuthenticationToken();
              navigate("/");
              window.location.reload();
            }
          } catch (error) {
            deleteAuthenticationToken();
            navigate("/");
            window.location.reload();
          }
      };
      checkAuthentication();
    }
  }, []);

  return (
    <div>
        <ScrollToTop />
          <Home />
          <div id="selecionar-regiao">
            <SelecionarRegiao />
          </div>
          <div id="sobre-nos">
            <SobreNos />
          </div>
          <div id="faq">
            <Faq />
          </div>
          <Footer />
    </div>
  );
};

export default LandingPage;
