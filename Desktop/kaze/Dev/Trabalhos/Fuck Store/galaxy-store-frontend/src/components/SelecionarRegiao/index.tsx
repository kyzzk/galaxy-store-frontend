/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-modal';
import styles from './SelecionarRegiao.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const iconBR = process.env.PUBLIC_URL + '/assets/icon_BR.png';
const smurfBR = process.env.PUBLIC_URL + '/assets/smurf_br.png';
const escolherSkinBR = process.env.PUBLIC_URL + '/assets/escolher_skin_br.png';
const contaInativaBR = process.env.PUBLIC_URL + '/assets/conta_inativa_br.png';
const garantia = process.env.PUBLIC_URL + '/assets/garantia.png';
const buttonBuy = process.env.PUBLIC_URL + '/assets/button_buy_2.png';
const escolherSkin = process.env.PUBLIC_URL + '/assets/escolher_skin.png';

interface Champion {
  name: string;
  key: string,
}
interface Skin {
  id: number;
  name: string;
  price: number;
}
interface Produto {
  id: string,
  nome: string;
  descricao: string;
  preco: number;
  criado: string;
  atualizado: string;
}

const SelecionarRegiao = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [selectedIcon, setSelectedIcon] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantidadeContas, setQuantidadeContas] = useState<number | ''>('');
  const [tempoInatividade, setTempoInatividade] = useState('');
  const [championName, setChampionName] = useState('');
  const [version, setVersion] = useState('');
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [valorTotal, setValorTotal] = useState<number>(0);

  const [error, setError] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [skinList, setSkinList] = useState<Skin[]>([]);
  const [useCoupon, setUseCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [couponValidated, setCouponValidated] = useState('Nenhum');
  const [price, setPrice] = useState(0);
  const [priceRandom, setPriceRandom] = useState(0);

  const [precoContaSmurfSkin, setPrecoContaSmurfSkin] = useState(0);
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const [buyProcess, setBuyProcess] = useState(false);
  const [selected, setSelected] = useState<Skin>();

  const [buying, setBuying] = useState(false);

  const navigate = useNavigate();




  const handleSkinSelection = (skinId: number) => {
    setPrice(precoContaSmurfSkin)

    let account = skinList.find(skin => skin.id === skinId);

    if (account) {
          setSelected({
            id: account.id,
            name: account.name,
            price: account.price,
          })
          setBuyProcess(true);
    }
  };

  const validateCoupon = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cupom/validar`, {
        params: {
          cupom: couponCode
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        if (response.data.valido) {
          setCouponDiscount(response.data.desconto)
          setCouponValidated(couponCode.toUpperCase());

          let discountValue = price - (price * (response.data.desconto / 100))
          let discountValueRandom = priceRandom - (priceRandom * (response.data.desconto / 100))

          setPrice(discountValue)
          setPriceRandom(discountValueRandom)
          setInvalidCoupon(false);
        } else {
          setInvalidCoupon(true);
        }
      } else {
        setInvalidCoupon(true);
      }
    } catch (error) {
      setInvalidCoupon(true);
    }
  };


  const fetchChampions = async () => {
    try {
      const versionsResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
      const versionsData: string[] = await versionsResponse.json();
      const latestVersion = versionsData[0];
      setVersion(latestVersion);

      const championsResponse = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
      );
      const championsData: { data: Record<string, Champion> } = await championsResponse.json();
      const championList = Object.keys(championsData.data)
        .map((key) => ({
          key: key,
          name: championsData.data[key].name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)); // Ordenar em ordem alfabética
      setChampionList(championList);
    } catch (error) {
      console.error('Error fetching champion data:', error);
    }
  };


  useEffect(() => {
    fetchChampions();

    try {
      const response = axios.get(`${API_URL}/api/produtos/listar`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      response.then((response) => {
        if (response.status === 200) {

          const produtos = response.data;
          const contaSmurf = produtos.find((produto: any) => produto.nome === 'Conta Smurf');
          const contaSmurfSkin = produtos.find((produto: any) => produto.nome === 'Conta Smurf - Escolha de Skin');

          if (contaSmurf) {
            setPriceRandom(contaSmurf.preco);
          }
          if (contaSmurfSkin) {
            setPrecoContaSmurfSkin(contaSmurfSkin.preco);
            setPrice(contaSmurfSkin)
          }
      
        }
      })
    }
    catch (error) {
    }


  }, []);

  const handleChampionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChampionName(event.target.value);

    try {
      const response = await axios.get(`${API_URL}/api/estoque/smurf/pesquisar`, {
        params: {
          skin: event.target.value
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.resultados.length > 0) {
        const { resultados } = response.data;
        const updatedSkinList: Skin[] = resultados.map((resultado: any) => ({
          id: resultado.id,
          name: resultado.skins,
          price: precoContaSmurfSkin.toFixed(2)
        }));
        setSkinList(updatedSkinList);
      } else {
        setSkinList([]);
      }
    } catch (error) {

    }
  };

  const handleIconClick = (iconIndex: number) => {
    setSelectedIcon(iconIndex);
  };
  const [selectedModal, setSelectedModal] = useState('');

  const openModal = (modalType: string) => {
    setCouponDiscount(0);
    setUseCoupon(false);
    setCouponCode('')
    setCouponValidated('Nenhum')
    setBuyProcess(false);
    setSkinList([]);
    setError('')
    setSelectedModal(modalType);
    setChampionName('')
    setModalOpen(true)
  };

  const closeModal = () => {
    setError('')
    setSelectedModal('');
    setChampionName('')
    setCouponDiscount(0);
    setUseCoupon(false);
    setCouponCode('')
    setCouponValidated('Nenhum')
    setBuyProcess(false);
    setSkinList([]);
    setError('')

    try {
      const response = axios.get(`${API_URL}/api/produtos/listar`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      response.then((response) => {
        if (response.status === 200) {

          const produtos = response.data;
          const contaSmurf = produtos.find((produto: any) => produto.nome === 'Conta Smurf');
          const contaSmurfSkin = produtos.find((produto: any) => produto.nome === 'Conta Smurf - Escolha de Skin');

          if (contaSmurf) {
            setPriceRandom(contaSmurf.preco);
          }
          if (contaSmurfSkin) {
            setPrecoContaSmurfSkin(contaSmurfSkin.preco);
            setPrice(contaSmurfSkin)
          }
        }
      })
    }
    catch (error) {
    }
  };

  const handleQuantidadeContasChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      const numericValue = parseInt(value);
      setQuantidadeContas(numericValue > 0 && numericValue < 10000 ? numericValue : '');
    }
  };

  const handleTempoInatividadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTempoInatividade(event.target.value);
  };

  const icons = [
    { src: iconBR, alt: "Ícone BR", text: "BR" },
  ];

  const cardsData = [
    {
      image: smurfBR,
      alt: "smurf_br",
      regiao: "BR",
      email: "Não verificado",
      rank: "Unranked",
      type: "CONTA ALEATÓRIA",
      priceBRL: 7.5,
    },
    {
      image: escolherSkinBR,
      alt: "smurf_skin_br",
      regiao: "BR",
      email: "Não verificado",
      rank: "Unranked",
      type: "ESCOLHA SUA SKIN",
      priceBRL: 10,
    },
  ];

  useEffect(() => {
    if (quantidadeContas === '') {
      setValorTotal(0)
      return;
    }
    calcularValorTotal(quantidadeContas.toString(), tempoInatividade);
  }, [quantidadeContas, tempoInatividade]);

  useEffect(() => {
    axios.get(`${API_URL}/api/produtos/listar`)
      .then(data => setProdutos(data.data));
  }, []);

  const calcularValorTotal = (quantidade: string, tempo: string) => {
    let valor = 0;

    const produtoSelecionado = produtos.find(produto =>
      produto.nome.toLowerCase() === tempo.toLowerCase()
    );

    if (produtoSelecionado) {
      const parsedQuantidade = parseInt(quantidade);

      if (!isNaN(parsedQuantidade) && parsedQuantidade > 0) {
        valor = parsedQuantidade * produtoSelecionado.preco;
        setError('')
      } else {
        setError("Erro ao atribuir o preço ao produto.")
      }
    } else {
      setError("Produto selecionado não encontrado");
    }
    setValorTotal(valor);
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

  const handlePedidoSmurfSkin = async () => {
    const token = getAuthenticationToken();

    setBuying(true);
    setTimeout(() => {
      setBuying(false)
    }, 5000);
    if (token) {
      try {
        const response = await axios.post(`${API_URL}/api/validartoken`, { token });
        if (response.status === 200) {
          const response = await axios.get(`${API_URL}/api/estoque/smurf`);
          if (response.status === 200) {
            if (response.data.disponivel > 0) {
              setError('');

              const smurfProduto = produtos.find(
                (produto) => produto.nome.toLocaleLowerCase() === 'conta smurf - escolha de skin'
              );

              if (smurfProduto) {

                if (couponValidated !== "Nenhum") {
                  const response = await axios.get(`${API_URL}/api/cupom/validar`, {
                    params: {
                      cupom: couponCode
                    },
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });

                  if (response.status === 200) {
                    if (response.data.valido) {
                      let produto_id = smurfProduto.id;
                      let account_id = selected?.id;

                      const pagamentoResponse = await axios.post(`${API_URL}/api/pagamentos/criar`, { token, couponCode, produto_id, account_id })

                      if (pagamentoResponse.status === 201) {
                        const dateOfExpiration = new Date(pagamentoResponse.data.date_of_expiration);
                        const formattedExpirationDate = dateOfExpiration.toISOString();

                        const usuarioResponse = await axios.get(`${API_URL}/api/usuario`, {
                          params: {
                            token: token,
                          },
                        });

                        if (usuarioResponse.status === 200) {
                          const usuarioId = usuarioResponse.data.usuario.id;

                          const pedidoData = {
                            usuario: usuarioId,
                            id_mp: pagamentoResponse.data.id,
                            status: "P",
                            produto: smurfProduto.id,
                            quantidade: 1,
                            pix: pagamentoResponse.data.qr_code,
                            qr_code: pagamentoResponse.data.qr_code_base64,
                            data_expiracao: formattedExpirationDate,
                          };

                          const criarPedidoResponse = await axios.post(`${API_URL}/api/pedidos/criar`, pedidoData);
                          if (criarPedidoResponse.status === 201) {
                            console.log("OK")
                            closeModal()
                            navigate('/payments/' + criarPedidoResponse.data.pedido_id)
                          } else {
                            setError("Erro ao criar o pedido.");
                          }
                        } else {
                          setError("Erro ao obter o usuário.");

                        }
                      } else {
                        setError("Erro ao criar o pedido.")
                      }
                    } else {
                      setError("Esse cupom é inválido.")
                    }
                  } else {
                    setError("Esse cupom é inválido.")
                  }
                } else {
                  let produto_id = smurfProduto.id;
                  let account_id = selected?.id
                  const pagamentoResponse = await axios.post(`${API_URL}/api/pagamentos/criar`, { token, produto_id, account_id })

                  if (pagamentoResponse.status === 201) {
                    const dateOfExpiration = new Date(pagamentoResponse.data.date_of_expiration);
                    const formattedExpirationDate = dateOfExpiration.toISOString();

                    const usuarioResponse = await axios.get(`${API_URL}/api/usuario`, {
                      params: {
                        token: token,
                      },
                    });

                    if (usuarioResponse.status === 200) {
                      const usuarioId = usuarioResponse.data.usuario.id;

                      const pedidoData = {
                        usuario: usuarioId,
                        id_mp: pagamentoResponse.data.id,
                        status: "P",
                        produto: smurfProduto.id,
                        quantidade: 1,
                        pix: pagamentoResponse.data.qr_code,
                        qr_code: pagamentoResponse.data.qr_code_base64,
                        data_expiracao: formattedExpirationDate,
                      };

                      const criarPedidoResponse = await axios.post(`${API_URL}/api/pedidos/criar`, pedidoData);
                      if (criarPedidoResponse.status === 201) {
                        console.log("OK")
                        closeModal()
                        navigate('/payments/' + criarPedidoResponse.data.pedido_id)
                      } else {
                        setError("Erro ao criar o pedido.");
                      }
                    } else {
                      setError("Erro ao obter o usuário.");

                    }
                  } else {
                    setError("Erro ao criar o pedido.")
                  }
                }
              } else {
                setError("Produto selecionado não encontrado.");
              }
            } else {
              setError("Desculpe, quantidade no estoque indisponível.")
            }
          } else {
            setError("Erro ao checar o estoque.")

          }
        }
      } catch (error) {
        setError(String(error));
      }
    } else {
      closeModal();
      navigate('/login')
    }
  }
  const handlePedidoSmurfRandom = async () => {
    const token = getAuthenticationToken();

    setBuying(true);
    setTimeout(() => {
      setBuying(false)
    }, 5000);
    if (token) {
      try {
        const response = await axios.post(`${API_URL}/api/validartoken`, { token });
        if (response.status === 200) {
          const response = await axios.get(`${API_URL}/api/estoque/smurf`);
          if (response.status === 200) {
            if (response.data.disponivel > 0) {
              setError('');

              const smurfProduto = produtos.find(
                (produto) => produto.nome.toLocaleLowerCase() === 'conta smurf'
              );

              if (smurfProduto) {

                if (couponValidated !== "Nenhum") {
                  const response = await axios.get(`${API_URL}/api/cupom/validar`, {
                    params: {
                      cupom: couponCode
                    },
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });

                  if (response.status === 200) {
                    if (response.data.valido) {
                      let produto_id = smurfProduto.id;
                      const pagamentoResponse = await axios.post(`${API_URL}/api/pagamentos/criar`, { token, couponCode, produto_id })

                      if (pagamentoResponse.status === 201) {
                        const dateOfExpiration = new Date(pagamentoResponse.data.date_of_expiration);
                        const formattedExpirationDate = dateOfExpiration.toISOString();

                        const usuarioResponse = await axios.get(`${API_URL}/api/usuario`, {
                          params: {
                            token: token,
                          },
                        });

                        if (usuarioResponse.status === 200) {
                          const usuarioId = usuarioResponse.data.usuario.id;

                          const pedidoData = {
                            usuario: usuarioId,
                            id_mp: pagamentoResponse.data.id,
                            status: "P",
                            produto: smurfProduto.id,
                            quantidade: 1,
                            pix: pagamentoResponse.data.qr_code,
                            qr_code: pagamentoResponse.data.qr_code_base64,
                            data_expiracao: formattedExpirationDate,
                          };

                          const criarPedidoResponse = await axios.post(`${API_URL}/api/pedidos/criar`, pedidoData);
                          if (criarPedidoResponse.status === 201) {
                            console.log("OK")
                            closeModal()
                            navigate('/payments/' + criarPedidoResponse.data.pedido_id)
                          } else {
                            setError("Erro ao criar o pedido.");
                          }
                        } else {
                          setError("Erro ao obter o usuário.");

                        }
                      } else {
                        setError("Erro ao criar o pedido.")
                      }
                    } else {
                      setError("Esse cupom é inválido.")
                    }
                  } else {
                    setError("Esse cupom é inválido.")
                  }
                } else {
                  let produto_id = smurfProduto.id;
                  const pagamentoResponse = await axios.post(`${API_URL}/api/pagamentos/criar`, { token, produto_id })

                  if (pagamentoResponse.status === 201) {
                    const dateOfExpiration = new Date(pagamentoResponse.data.date_of_expiration);
                    const formattedExpirationDate = dateOfExpiration.toISOString();

                    const usuarioResponse = await axios.get(`${API_URL}/api/usuario`, {
                      params: {
                        token: token,
                      },
                    });

                    if (usuarioResponse.status === 200) {
                      const usuarioId = usuarioResponse.data.usuario.id;

                      const pedidoData = {
                        usuario: usuarioId,
                        id_mp: pagamentoResponse.data.id,
                        status: "P",
                        produto: smurfProduto.id,
                        quantidade: 1,
                        pix: pagamentoResponse.data.qr_code,
                        qr_code: pagamentoResponse.data.qr_code_base64,
                        data_expiracao: formattedExpirationDate,
                      };

                      const criarPedidoResponse = await axios.post(`${API_URL}/api/pedidos/criar`, pedidoData);
                      if (criarPedidoResponse.status === 201) {
                        console.log("OK")
                        closeModal()
                        navigate('/payments/' + criarPedidoResponse.data.pedido_id)
                      } else {
                        setError("Erro ao criar o pedido.");
                      }
                    } else {
                      setError("Erro ao obter o usuário.");

                    }
                  } else {
                    setError("Erro ao criar o pedido.")
                  }
                }
              } else {
                setError("Produto selecionado não encontrado.");
              }
            } else {
              setError("Desculpe, quantidade no estoque indisponível.")
            }
          } else {
            setError("Erro ao checar o estoque.")

          }
        }
      } catch (error) {
        setError(String(error));
      }
    } else {
      closeModal();
      navigate('/login')
    }
  }
  const handlePedidoCracked = async () => {
    setBuying(true);
    setTimeout(() => {
      setBuying(false)
    }, 5000);
    const token = getAuthenticationToken();
    if (token) {
      try {
        const response = await axios.post(`${API_URL}/api/validartoken`, { token });
        if (response.status === 200) {
          if (tempoInatividade === 'conta ativa') {
            const response = await axios.get(`${API_URL}/api/estoque/ativa`);
            if (response.status === 200) {
              if (response.data.disponivel >= quantidadeContas) {
                setError('');

                const produtoSelecionado = produtos.find(
                  (produto) => produto.nome.toLowerCase() === tempoInatividade.toLowerCase()
                );

                if (produtoSelecionado) {
                  const parsedQuantidade = parseInt(quantidadeContas.toString());
                  if (!isNaN(parsedQuantidade) && parsedQuantidade > 0) {

                    let produto_id = produtoSelecionado.id;
                    let quantidade = parsedQuantidade;
                    const pagamentoResponse = await axios.post(`${API_URL}/api/pagamentos/criar`, { token, produto_id, quantidade })

                    if (pagamentoResponse.status === 201) {
                      const dateOfExpiration = new Date(pagamentoResponse.data.date_of_expiration);
                      const formattedExpirationDate = dateOfExpiration.toISOString();

                      const usuarioResponse = await axios.get(`${API_URL}/api/usuario`, {
                        params: {
                          token: token,
                        },
                      });

                      if (usuarioResponse.status === 200) {
                        const usuarioId = usuarioResponse.data.usuario.id;

                        const pedidoData = {
                          usuario: usuarioId,
                          id_mp: pagamentoResponse.data.id,
                          status: "P",
                          produto: produtoSelecionado.id,
                          quantidade: parsedQuantidade,
                          pix: pagamentoResponse.data.qr_code,
                          qr_code: pagamentoResponse.data.qr_code_base64,
                          data_expiracao: formattedExpirationDate,
                        };

                        const criarPedidoResponse = await axios.post(`${API_URL}/api/pedidos/criar`, pedidoData);
                        if (criarPedidoResponse.status === 201) {
                          closeModal()
                          console.log(criarPedidoResponse.data.pedido_id)
                          navigate('/payments/' + criarPedidoResponse.data.pedido_id)
                        } else {
                          setError("Erro ao criar o pedido");
                        }
                      } else {
                        setError("Erro ao obter o usuário");
                      }
                    } else {
                      setError("Ocorreu um erro ao criar o pedido.")
                    }
                  } else {
                    setError("Quantidade inválida");
                  }
                } else {
                  setError("Produto selecionado não encontrado");
                }
              } else {
                setError("Desculpe, quantidade no estoque insuficiente.");
              }
            }
          } else if (tempoInatividade === "conta inativa 1 ano") {
            const response = await axios.get(`${API_URL}/api/estoque/inativa1`);
            if (response.status === 200) {
              if (response.data.disponivel >= quantidadeContas) {
                setError('');

                const produtoSelecionado = produtos.find(
                  (produto) => produto.nome.toLowerCase() === tempoInatividade.toLowerCase()
                );

                if (produtoSelecionado) {
                  const parsedQuantidade = parseInt(quantidadeContas.toString());
                  if (!isNaN(parsedQuantidade) && parsedQuantidade > 0) {
                    const valor = parsedQuantidade * produtoSelecionado.preco;
                    let produto_id = produtoSelecionado.id;
                    let quantidade = parsedQuantidade;
                    const pagamentoResponse = await axios.post(`${API_URL}/api/pagamentos/criar`, { token, produto_id, quantidade })

                    if (pagamentoResponse.status === 201) {
                      const dateOfExpiration = new Date(pagamentoResponse.data.date_of_expiration);
                      const formattedExpirationDate = dateOfExpiration.toISOString();

                      const usuarioResponse = await axios.get(`${API_URL}/api/usuario`, {
                        params: {
                          token: token,
                        },
                      });

                      if (usuarioResponse.status === 200) {
                        const usuarioId = usuarioResponse.data.usuario.id;

                        const pedidoData = {
                          usuario: usuarioId,
                          id_mp: pagamentoResponse.data.id, // Preencher com o ID do MercadoPago
                          status: "P",
                          produto: produtoSelecionado.id,
                          quantidade: parsedQuantidade,
                          valor: valor,
                          pix: pagamentoResponse.data.qr_code, // Preencher com a cópia e cola do PIX
                          qr_code: pagamentoResponse.data.qr_code_base64, // Preencher com o QR Code em base64
                          data_expiracao: formattedExpirationDate, // Preencher com a data de expiração em formato DateTime (Django)
                        };

                        const criarPedidoResponse = await axios.post(`${API_URL}/api/pedidos/criar`, pedidoData);
                        if (criarPedidoResponse.status === 201) {
                          closeModal()
                          navigate('/payments/' + criarPedidoResponse.data.pedido_id)
                        } else {
                          setError("Erro ao criar o pedido");
                        }
                      } else {
                        setError("Erro ao obter o usuário");
                      }
                    } else {
                      setError("Ocorreu um erro ao criar o pedido.")
                    }
                  } else {
                    setError("Quantidade inválida");
                  }
                } else {
                  setError("Produto selecionado não encontrado");
                }
              } else {
                setError("Desculpe, quantidade no estoque insuficiente.");
              }
            }
          } else if (tempoInatividade === "conta inativa 2 anos") {
            const response = await axios.get(`${API_URL}/api/estoque/inativa2`);
            if (response.status === 200) {
              if (response.data.disponivel >= quantidadeContas) {
                setError('');

                const produtoSelecionado = produtos.find(
                  (produto) => produto.nome.toLowerCase() === tempoInatividade.toLowerCase()
                );

                if (produtoSelecionado) {
                  const parsedQuantidade = parseInt(quantidadeContas.toString());
                  if (!isNaN(parsedQuantidade) && parsedQuantidade > 0) {
                    let produto_id = produtoSelecionado.id;
                    let quantidade = parsedQuantidade;
                    const pagamentoResponse = await axios.post(`${API_URL}/api/pagamentos/criar`, { token, produto_id, quantidade })

                    if (pagamentoResponse.status === 201) {
                      const dateOfExpiration = new Date(pagamentoResponse.data.date_of_expiration);
                      const formattedExpirationDate = dateOfExpiration.toISOString();

                      const usuarioResponse = await axios.get(`${API_URL}/api/usuario`, {
                        params: {
                          token: token,
                        },
                      });

                      if (usuarioResponse.status === 200) {
                        const usuarioId = usuarioResponse.data.usuario.id;

                        const pedidoData = {
                          usuario: usuarioId,
                          id_mp: pagamentoResponse.data.id,
                          status: "P",
                          produto: produtoSelecionado.id,
                          quantidade: parsedQuantidade,
                          pix: pagamentoResponse.data.qr_code,
                          qr_code: pagamentoResponse.data.qr_code_base64,
                          data_expiracao: formattedExpirationDate,
                        };

                        const criarPedidoResponse = await axios.post(`${API_URL}/api/pedidos/criar`, pedidoData);
                        if (criarPedidoResponse.status === 201) {
                          closeModal()
                          navigate('/payments/' + criarPedidoResponse.data.pedido_id)
                        } else {
                          setError("Erro ao criar o pedido");
                        }
                      } else {
                        setError("Erro ao obter o usuário");
                      }
                    } else {
                      setError("Ocorreu um erro ao criar o pedido.")
                    }
                  } else {
                    setError("Quantidade inválida");
                  }
                } else {
                  setError("Produto selecionado não encontrado");
                }
              } else {
                setError("Desculpe, quantidade no estoque insuficiente.");
              }
            }
          }
        }
      } catch (error) {
        setError(String(error));
      }
    } else {
      closeModal();
      navigate("/login");
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ESCOLHA A REGIÃO</h1>
      <div className={styles.icons}>
        {icons.map((icon, index) => (
          <div
            className={styles.iconContainer}
            key={index}
            onClick={() => handleIconClick(index)}
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className={`${styles.icon} ${selectedIcon === index ? styles.selected : ''}`}
            />
            <div className={`${styles.iconText} ${selectedIcon === index ? styles.selected : ''}`}>
              {icon.text}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cards}>
        {cardsData.map((card, index) => (
          <div className={styles.card} key={index}>
            <img src={card.image} alt={card.alt} className={styles.cardImage} />
            <div className={styles.overlay}>

              {card.type === 'CONTAS CRACKED' && (
                <div className={styles.guarantee}>
                  <img style={{ width: 20, display: 'none' }} src={garantia} alt="Garantia Vitalícia" />
                  <span style={{ display: 'none' }}>Garantia Vitalícia</span>
                </div>
              )}
              {card.type !== 'CONTAS CRACKED' && (
                <div className={styles.guarantee}>
                  <img style={{ width: 20 }} src={garantia} alt="Garantia Vitalícia" />
                  <span>Garantia Vitalícia</span>
                </div>
              )}
              <div className={styles.essencia}>
                <span className={styles.brasil} role="img" aria-label="Brazil Flag">
                  <img style={{ width: 20, paddingRight: 10 }} src="https://images.emojiterra.com/twitter/v14.0/128px/1f1e7-1f1f7.png" alt="Brazil Flag" />
                  {card.type}
                </span>
              </div>
              <div className={styles.region}>
                {card.type === 'CONTAS CRACKED' && (
                  <button
                    className={styles.buyButton}
                    onClick={() => openModal('CONTAS CRACKED')}
                  >
                    <img
                      style={{ width: 250 }}
                      src={buttonBuy}
                      alt="Botão de Comprar"
                    />
                  </button>
                )}

                {card.type === 'ESCOLHA SUA SKIN' && (
                  <button
                    className={styles.buyButton}
                    onClick={() => openModal('ESCOLHA SUA SKIN')}
                  >
                    <img
                      style={{ width: 250 }}
                      src={escolherSkin}
                      alt="Botão de Comprar"
                    />
                  </button>
                )}

                {card.type === "CONTA ALEATÓRIA" && (
                  <button
                    className={styles.buyButton}
                    onClick={() => openModal('CONTA ALEATÓRIA')}
                  >
                    <img
                      style={{ width: 250 }}
                      src={buttonBuy}
                      alt="Botão de Comprar"
                    />
                  </button>
                )}
              </div>
            </div>
            <div className={styles.cardDetails}>
              <p>Região: {card.regiao}</p>
              <p>E-mail: {card.email}</p>
              <p>
                Rank: {card.rank}
                {card.type === 'CONTA ALEATÓRIA' && (
                  <span className={styles.price}> R${priceRandom.toFixed(2)}</span>
                )}
                {card.type === 'ESCOLHA SUA SKIN' && (
                  <span className={styles.price}> R${precoContaSmurfSkin.toFixed(2)}</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen && selectedModal === 'CONTA ALEATÓRIA'}
        onRequestClose={closeModal}
        contentLabel="Modal de Conta Aleatória"
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <h2 className={styles.modalTitle}>Conta Aleatória</h2>

        <div className={`${styles.modalCloseButton} ${styles.modalButtonWrapper}`}>
          <button onClick={closeModal} className={`${styles.modalCloseButtonColor} ${styles.modalButton}`}>
            Fechar
          </button>
        </div>



        <div className={styles.couponWrapper}>
          <div className={styles.orderSummary}>
            <h3 className={styles.orderSummaryTitle}>Resumo do Pedido</h3>
            <div className={styles.orderSummaryInfo}>
              <p>ID: Aleatória</p>
              <p>Preço: R${priceRandom}</p>
              <br />
              <p>Cupom Aplicado: {couponValidated} {couponValidated !== "Nenhum" && (
                <>({couponDiscount}% OFF)</>
              )}</p>
            </div>
          </div>

          {couponValidated === "Nenhum" && (
            <div>
              <div className={styles.couponSection}>
                <label htmlFor="useCoupon" className={styles.label}>
                  Usar cupom?
                </label>
                <input
                  type="checkbox"
                  id="useCoupon"
                  checked={useCoupon}
                  onChange={(event) => setUseCoupon(event.target.checked)}
                />

              </div>
              {useCoupon && (
                <div className={styles.couponInputWrapper}>
                  <input
                    type="text"
                    placeholder="Digite o cupom"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    className={styles.couponInput}
                  />
                  <button onClick={validateCoupon} className={styles.couponButton}>
                    Validar Cupom
                  </button>
                </div>
              )}
            </div>

          )}
          {invalidCoupon && (
            <p className={styles.error}>Esse cupom não é válido!</p>
          )}
          {error && (
            <p className={styles.error}>{error}</p>
          )}
          <button disabled={buying} onClick={handlePedidoSmurfRandom} style={{ marginTop: 20 }} className={styles.purchaseButton}>
            Fazer Pedido
          </button>
        </div>

      </Modal>

      <Modal
        isOpen={modalOpen && selectedModal === 'ESCOLHA SUA SKIN'}
        onRequestClose={closeModal}
        contentLabel="Modal de Escolha de Campeão"
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        {buyProcess && (
          <div>
            <h2 className={styles.modalTitle}>Conta Smurf - Escolha de Skin</h2>
          </div>
        )}
        {!buyProcess && (
          <div>
            <h2 className={styles.modalTitle}>Escolha um Campeão</h2>
            <div className={`${styles.modalContent} ${styles.modalChampionSelect}`}>
              <div className={`${styles.championSelectWrapper} ${styles.modalChampionSelectWrapper}`}>
                <label htmlFor="championSelect" className={styles.label}>
                  Selecione um Campeão:
                </label>
                <select
                  id="championSelect"
                  value={championName}
                  onChange={handleChampionChange}
                  className={`${styles.select} ${styles.modalSelect}`}
                >
                  {championList.map((champion) => (
                    <option key={champion.key} value={champion.key}>
                      {champion.name}
                    </option>
                  ))}
                </select>
              </div>
              {championName && (
                <div className={`${styles.championImageWrapper} ${styles.modalChampionImageWrapper}`}>
                  <div className={`${styles.championImage} ${styles.modalChampionImage}`}>
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`}
                      alt="Imagem do Campeão"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className={`${styles.modalCloseButton} ${styles.modalButtonWrapper}`}>
          <button onClick={closeModal} className={`${styles.modalCloseButtonColor} ${styles.modalButton}`}>
            Fechar
          </button>
        </div>

        <div className={styles.modalResults}>
          {!buyProcess && skinList.length > 0 && (
            <div>
              <h3 className={styles.modalResultsTitle}>Resultados</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Skins</th>
                      <th>Preço</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skinList.map((skin) => (
                      <tr key={skin.id}>
                        <td>{skin.id}</td>
                        <td>{skin.name}</td>
                        <td>R$ {skin.price}</td>
                        <td>
                          <button onClick={() => handleSkinSelection(skin.id)} className={styles.modalCloseButtonColor2}>
                            Escolher
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!buyProcess && skinList.length === 0 && (
            <div style={{ textAlign: 'center', color: 'red' }}>
              <h3>Sem resultados!</h3>
            </div>
          )}
        </div>

        {buyProcess && (
          <div className={styles.couponWrapper}>
            <div className={styles.orderSummary}>
              <h3 className={styles.orderSummaryTitle}>Resumo do Pedido</h3>
              <div className={styles.orderSummaryInfo}>
                <p>ID: {selected?.id}</p>
                <p>Skins na Conta: {selected?.name}</p>
                <p>Preço: R${price}</p>
                <br />
                <p>Cupom Aplicado: {couponValidated} {couponValidated !== "Nenhum" && (
                  <>({couponDiscount}% OFF)</>
                )}</p>
              </div>
            </div>

            {couponValidated === "Nenhum" && (
              <div>
                <div className={styles.couponSection}>
                  <label htmlFor="useCoupon" className={styles.label}>
                    Usar cupom?
                  </label>
                  <input
                    type="checkbox"
                    id="useCoupon"
                    checked={useCoupon}
                    onChange={(event) => setUseCoupon(event.target.checked)}
                  />

                </div>
                {useCoupon && (
                  <div className={styles.couponInputWrapper}>
                    <input
                      type="text"
                      placeholder="Digite o cupom"
                      value={couponCode}
                      onChange={(event) => setCouponCode(event.target.value)}
                      className={styles.couponInput}
                    />
                    <button onClick={validateCoupon} className={styles.couponButton}>
                      Validar Cupom
                    </button>
                  </div>
                )}
              </div>

            )}
            {invalidCoupon && (
              <p className={styles.error}>Esse cupom não é válido!</p>
            )}
            <button disabled={buying} onClick={handlePedidoSmurfSkin} style={{ marginTop: 20 }} className={styles.purchaseButton}>
              Fazer Pedido
            </button>
          </div>
        )}

      </Modal>

      <Modal
        isOpen={modalOpen && selectedModal === 'CONTAS CRACKED'}
        onRequestClose={closeModal}
        contentLabel="Modal de Compra"
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Selecionar opções de compra</h2>
          <div className={styles.modalInputs}>
            <label>Quantidade de Contas:</label>
            <input
              type="text"
              value={quantidadeContas === '' ? '' : quantidadeContas.toString()}
              onChange={handleQuantidadeContasChange}
              placeholder="Digite a quantidade"
            />
          </div>
          <div className={styles.modalInputs}>
            <label>Tempo de Inatividade:</label>
            <select value={tempoInatividade} onChange={handleTempoInatividadeChange}>
              <option value="">Selecione uma opção</option>
              <option value="conta ativa">Ativa</option>
              <option value="">------------------------------</option>
              <option value="conta inativa 1 ano">Inativa - 1 ano</option>
              <option value="">------------------------------</option>
              <option value="conta inativa 2 anos">Inativa - 2 anos</option>
            </select>
          </div>
          <div className={styles.modalInputs}>
            <label>Valor Total:</label>
            <p>{valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
          {error && tempoInatividade && <p className={styles.error}>{error}</p>}
          <div className={styles.modalCloseButton}>
            <button className={styles.modalCloseButtonColor} onClick={closeModal}>Fechar</button>
            <button
              disabled={valorTotal === 0 || valorTotal > 500}
              className={styles.modalCloseButtonColor2}
              onClick={handlePedidoCracked}
            >
              Fazer Pedido
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelecionarRegiao;
