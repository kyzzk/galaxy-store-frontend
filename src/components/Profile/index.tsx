/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import styles from "./Profile.module.css";

import { useNavigate } from "react-router-dom";
import { FaMoneyBill, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import axios from 'axios';

interface Smurf {
    id: number;
    nome_de_usuario: string,
    senha: string,
    skins: string,
    email: string,
    essencia_azul: number,
    data_criacao: string,
    data_aniversario: string,
    provedor_de_internet: string,
    pedido_vinculado_id: number,
    conta_disponivel: boolean,
    created: string,
    updated: string,
}


interface Pedido {
    id: number;
    usuario_id: number;
    id_pedido_mercadopago: string,
    status_do_pedido: string,
    status_entrega: string,
    produto_id: number,
    quantidade: number,
    valor: number,
    pix_copia_cola: string,
    qr_codebase64: string,
    usou_cupom: boolean;
    cupom_utilizado_id: number,
    expirate: string,
    created: string,
    updated: string,
}

function Profile() {
    const API_URL = process.env.REACT_APP_API_URL;

    const [selectedAccountOption, setSelectedAccountOption] = useState<string | null>(null); // Explicitly define the type as string | null
    const [selectedOption, setSelectedOption] = useState("payments");
    const [id, setId] = useState(0);
    const [email, setEmail] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [isPartner, setIsPartner] = useState(false);

    const [cupom, setCupom] = useState(false);
    const [usosAtuais, setUsosAtuais] = useState(false);
    const [usosTotais, setUsosTotais] = useState(false);



    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [pedidosCupom, setPedidosCupom] = useState<Pedido[]>([]);
    const [contasSmurf, setContasSmurf] = useState<Smurf[]>([]);
    const [contasAtivas, setContasAtivas] = useState<Cracked[]>([]);
    const [contas1ano, setContas1ano] = useState<Cracked[]>([]);
    const [contas2anos, setContas2anos] = useState<Cracked[]>([]);

    const [formato, setFormato] = useState('');
    const [base64, setBase64] = useState('');

    const navigate = useNavigate();

    const mapPedidos = (data: any[]): Pedido[] => {
        return data.map((pedido: any) => {
            return {
                id: pedido.id,
                usuario_id: pedido.usuario_id,
                id_pedido_mercadopago: pedido.id_pedido_mercadopago,
                status_do_pedido: mapStatusDoPedido(pedido.status_do_pedido),
                status_entrega: mapStatusEntrega(pedido.status_entrega),
                produto_id: pedido.produto_id,
                quantidade: pedido.quantidade,
                valor: pedido.valor,
                pix_copia_cola: pedido.pix_copia_cola,
                qr_codebase64: pedido.qr_codebase64,
                usou_cupom: pedido.usou_cupom,
                cupom_utilizado_id: pedido.cupom_utilizado_id,
                expirate: pedido.expirate,
                created: formatDate(pedido.created),
                updated: formatDate(pedido.updated)
            };
        });
    };

    const mapStatusDoPedido = (status: string): string => {
        switch (status) {
            case 'P':
                return 'Pendente';
            case 'A':
                return 'Aprovado';
            case 'C':
                return 'Cancelado';
            case 'E':
                return 'Expirado';
            default:
                return '';
        }
    };

    const mapStatusEntrega = (status: string): string => {
        switch (status) {
            case 'P':
                return 'Pendente';
            case 'E':
                return 'Entregue';
            case 'C':
                return 'Cancelada';
            case 'X':
                return 'Erro';
            case 'Z':
                return 'Entregando';
            default:
                return '';
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        return formattedDate;
    };
    const getTotalPedidos = () => {
        return pedidos.length;
    };
    const mapContasAtivas = (ativasData: any[]): Cracked[] => {
        return ativasData.map((ativaData) => {
            return {
                id: ativaData.id,
                nome_de_usuario: ativaData.nome_de_usuario,
                senha: ativaData.senha.replace("\\r", ""),
                pedido_vinculado_id: ativaData.pedido_vinculado_id,
                conta_disponivel: ativaData.conta_disponivel,
                created: formatDate(ativaData.created),
                updated: formatDate(ativaData.updated),
            };
        });
    };
    const mapContasSmurf = (ativasData: any[]): Smurf[] => {
        return ativasData.map((ativaData) => {
            return {
                id: ativaData.id,
                nome_de_usuario: ativaData.nome_de_usuario,
                senha: ativaData.senha.replace("\\r", ""),
                skins: ativaData.skins,
                email: ativaData.email,
                essencia_azul: ativaData.essencia_azul,
                data_criacao: ativaData.data_criacao,
                data_aniversario: ativaData.data_aniversario,
                provedor_de_internet: ativaData.provedor_de_internet,
                pedido_vinculado_id: ativaData.pedido_vinculado_id,
                conta_disponivel: ativaData.conta_disponivel,
                created: formatDate(ativaData.created),
                updated: formatDate(ativaData.updated),
            };
        });
    };
    const getPedidosAprovados = () => {
        return pedidos.filter((pedido) => pedido.status_do_pedido === 'Aprovado').length;
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = getAuthenticationToken();
            if (!token) {
                navigate("/");
            } else {
                try {
                    const response = await axios.post(`${API_URL}/api/validartoken`, { token });
                    if (response.status === 200) {

                        const response = await axios.get(`${API_URL}/api/usuario`, {
                            params: {
                                token: token
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        console.log(response.data)
                        if (response.status === 200) {
                            setEmail(response.data.usuario.email);
                            setIsPartner(response.data.parceiro)

                            if (response.data.usuario.foto_perfil !== "") {
                                setBase64(response.data.usuario.foto_perfil_base64)
                                setFormato(response.data.usuario.foto_perfil_formato)
                            }

                            if (response.data.parceiro) {
                                setCupom(response.data.detalhes_cupom.cupom)
                                setUsosAtuais(response.data.detalhes_cupom.usos_atuais)
                                setUsosTotais(response.data.detalhes_cupom.usos_totais)
                                setPedidosCupom(response.data.detalhes_cupom.pedidos_cupom)
                            }
                            if (response.data.pedidos && response.data.pedidos.length > 0) {
                                const mappedPedidos = mapPedidos(response.data.pedidos);
                                setPedidos(mappedPedidos.reverse());
                            }
                            if (response.data.ativas && response.data.ativas.length > 0) {
                                const mappedContasAtivas = mapContasAtivas(response.data.ativas);
                                setContasAtivas(mappedContasAtivas.reverse());
                            }
                            if (response.data.inativas_1ano && response.data.inativas_1ano.length > 0) {
                                const mappedContasAtivas = mapContasAtivas(response.data.inativas_1ano);
                                setContas1ano(mappedContasAtivas.reverse());
                            }
                            if (response.data.inativas_2anos && response.data.inativas_2anos.length > 0) {
                                const mappedContasAtivas = mapContasAtivas(response.data.inativas_2anos);
                                setContas2anos(mappedContasAtivas.reverse());
                            }
                            if (response.data.contas_smurf && response.data.contas_smurf.length > 0) {
                                const mappedContasAtivas = mapContasSmurf(response.data.contas_smurf);
                                setContasSmurf(mappedContasAtivas.reverse());
                            }
                        }
                    }
                } catch (error) {
                    deleteAuthenticationToken();
                    navigate("/");
                }
            }
            setLoading(false);
        };

        checkAuthentication();
    }, [navigate]);

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

    const deleteAuthenticationToken = () => {
        document.cookie =
            "AUTHENTICATION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    const handleAccountOptionChange = (option: string) => {
        setSelectedAccountOption(option);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
        setPasswordError(false);
        setPasswordSuccess('')
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setPasswordError(false);
        setPasswordSuccess('')
    };


    useEffect(() => {
        if (newPassword.length === 0 && confirmPassword.length === 0) {
            setPasswordError(false);
            setPasswordSuccess('')

        } else if (newPassword.length >= 8 && newPassword === confirmPassword) {
            setPasswordError(false);
            setPasswordSuccess('')

        } else {
            setPasswordSuccess('')

            setPasswordError(true);
        }
    }, [newPassword, confirmPassword]);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length === 0 && confirmPassword.length === 0) {
            return;
        }

        if (newPassword.length >= 8 && newPassword === confirmPassword) {
            setNewPassword("");
            setConfirmPassword("");
            setPasswordError(false);

            let token = getAuthenticationToken();

            const response = await axios.post(`${API_URL}/api/validartoken`, { token });

            if (response.status === 200) {

                const response = await axios.post(`${API_URL}/api/trocarsenha`, { token, newPassword }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    setPasswordSuccess("Senha alterada com sucesso!")
                } else {
                    setPasswordError(true)
                }
            } else {
                deleteAuthenticationToken();
                navigate('/')
            }

        } else {
            setPasswordError(true);
        }
    };

    const renderAccountTable = () => {
        return (
            <table className={styles.table}>

                {selectedAccountOption === "unranked" && (
                    <div>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuário</th>
                                <th>Senha</th>
                                <th>Skins</th>
                                <th>Email</th>
                                <th>Essência Azul</th>
                                <th>Data de Criação</th>
                                <th>Data de Aniversário</th>
                                <th>Provedor de Internet</th>
                                <th>Data de Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contasSmurf.map((conta) => (
                                <tr key={conta.id}>
                                    <td>{conta.id}</td>
                                    <td>{conta.nome_de_usuario}</td>
                                    <td>{conta.senha}</td>
                                    <td>{conta.skins}</td>
                                    <td>{conta.email}</td>
                                    <td>{conta.essencia_azul}</td>
                                    <td>{conta.data_criacao}</td>
                                    <td>{conta.data_aniversario}</td>
                                    <td>{conta.provedor_de_internet}</td>
                                    <td>{conta.updated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                )}

                {selectedAccountOption === "ativas" && (
                    <div>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuário</th>
                                <th>Senha</th>
                                <th>Data de Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contasAtivas.map((conta) => (
                                <tr key={conta.id}>
                                    <td>{conta.id}</td>
                                    <td>{conta.nome_de_usuario}</td>
                                    <td>{conta.senha}</td>
                                    <td>{conta.updated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                )}
            </table>
        );
    };


    if (isLoading) {
        return <div className={`${styles.profileContainer} ${styles.container}`}>
        </div>;
    }
    return (
        <div className={styles.profileContainer}>
            <Navbar />
            <div className={styles.centeredContainer}>
                <div className={styles.gridContainer}>
                    <div className={styles.profileSidebar}>

                        {base64.length > 0 && (
                            <img className={styles.profileImage} src={`data:image/${formato};base64,${base64}`} alt="User" />
                        )}
                        {base64.length <= 0 && (
                            <img className={styles.profileImage} src="assets/smurf_br.png" alt="User" />
                        )}

                        <ul>
                            <li onClick={() => setSelectedOption("payments")}>
                                <FaMoneyBill style={{ marginRight: '10px' }} />
                                Visualizar pagamentos
                            </li>
                            <li onClick={() => setSelectedOption("accounts")}>
                                <FaUsers style={{ marginRight: '10px' }} />
                                Minhas contas
                            </li>
                            <li onClick={() => setSelectedOption("dados")}>
                                <FaUsers style={{ marginRight: '10px' }} />
                                Meus dados
                            </li>
                            {isPartner &&
                                <li onClick={() => setSelectedOption("sistemaParceiros")}>
                                    <FaCog style={{ marginRight: '10px' }} />
                                    <u>Sistema de Parceiros</u>
                                </li>
                            }
                            <li>
                                <FaSignOutAlt style={{ marginRight: '10px' }} />
                                Sair
                            </li>
                        </ul>
                    </div>
                    <div className={styles.profileContent}>
                        {selectedOption === "sistemaParceiros" && (
                            <>
                                <div className={styles.sectionHeader}>
                                    <h1>Sistema de Parceiros</h1>
                                </div>
                                <div className={styles.partnershipSystem}>
                                    <div className={styles.couponContainer}>
                                        <div className={styles.couponText}>
                                            <p>Seu Cupom</p>
                                            <h2>{cupom}</h2>
                                            <p>10% OFF em todos os produtos</p>
                                        </div>
                                    </div>
                                    <div className={styles.soldAccountsContainer}>
                                        <div className={styles.soldAccountsText}>
                                            <p>Contas Vendidas</p>
                                            <h2>{usosTotais}</h2>
                                        </div>
                                        <div className={styles.soldAccountsGraph}>
                                            <AiOutlineLineChart className={styles.graphIcon} />
                                            <div className={styles.commissionText}>
                                                <p>R$ 500,00 comissão total</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={styles.availablePaymentContainer}>
                                        <div className={styles.availablePaymentText}>
                                            <p>Pagamento Disponível</p>
                                            <h2>R$ {usosAtuais}</h2>
                                            <p>Você pode sacar a cada 2 semanas</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.orderListContainer}>
                                    <h2>Lista de Pedidos</h2>
                                    <div className={styles.orderList}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th>Produto</th>
                                                    <th>Contas</th>
                                                    <th>Ganho</th>
                                                    <th>Status</th>
                                                    <th>Data do Pedido</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pedidosCupom.map((pedido) => (
                                                    <tr key={pedido.id}>
                                                        <td>{pedido.produto_id}</td>
                                                        <td>{pedido.quantidade}</td>
                                                        <td>R$ 1.00</td>
                                                        <td>{pedido.status_do_pedido}</td>
                                                        <td>{pedido.created}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                        {selectedOption === "dados" && (
                            <>
                                <div className={styles.sectionHeader}>
                                    <h1>Altere os seus dados</h1>
                                </div>
                                <div className={styles.myDataSection}>
                                    <div className={styles.changePassword}>
                                        <h2>Alterar senha:</h2>
                                        <div>
                                            <label>Nova senha:</label>
                                            <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                                        </div>
                                        <div>
                                            <label>Confirmar nova senha:</label>
                                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                        </div>
                                        <button type="submit" onClick={handlePasswordSubmit} className={styles.button} disabled={newPassword.length < 8 || newPassword !== confirmPassword}>
                                            Confirmar troca de senha
                                        </button>
                                        {passwordSuccess.length > 0 && <div className={styles.successMsg}>{passwordSuccess}</div>}

                                        {passwordError && <div className={styles.errorMsg}>As senhas não correspondem ou são inválidas.</div>}
                                    </div>
                                    <div className={styles.noChangePassword}>
                                        <h2>Seu email:</h2>
                                        <div>
                                            <label>Email:</label>
                                            <span>{email}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {selectedOption === "accounts" && (
                            <>
                                <div className={styles.accountSelector}>
                                    <h1>Selecione o tipo de conta</h1>
                                    <select
                                        value={selectedAccountOption || ""}
                                        onChange={(e) => handleAccountOptionChange(e.target.value)}
                                    >
                                        <option value="">Selecione uma opção</option>
                                        <option value="unranked">Contas SMURF</option>
                                    </select>
                                </div>
                                <div className={styles.accountList}>
                                    {selectedAccountOption && renderAccountTable()}
                                </div>
                            </>
                        )}
                        {selectedOption === "payments" && (
                            <>
                                <div className={styles.orderSummary}>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryTitle}>Total de pedidos</div>
                                        <div className={styles.summaryValue}>{getTotalPedidos()}</div>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <div className={styles.summaryTitle}>Pedidos Aprovados</div>
                                        <div className={styles.summaryValue}>{getPedidosAprovados()}</div>
                                    </div>
                                </div>
                                <div className={styles.modalResults}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Status</th>
                                                <th>Data do Pedido</th>
                                                <th>Data de Atualização</th>
                                                <th>Status de Entrega</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pedidos.map((pedido) => (
                                                <tr key={pedido.id}>
                                                    <td>{pedido.id}</td>
                                                    <td>{pedido.status_do_pedido}</td>
                                                    <td>{pedido.created}</td>
                                                    <td>{pedido.updated}</td>
                                                    <td>{pedido.status_entrega}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
