import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const deleteAuthenticationToken = () => {
    document.cookie =
      "AUTHENTICATION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  useEffect(() => {
    deleteAuthenticationToken();
    navigate('/');
  }, [navigate]);

  return (
    <>
    </>
  );
};

export default Logout;