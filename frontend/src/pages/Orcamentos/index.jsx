import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { ContainerBtns } from "../Estoques/styles";
import { CadastrarClienteModal } from "../../components/Modal/CadastrarClienteModal";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter/index";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const OrcamentosPage = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const orcamentosRequest = async () => {
    try {
      const request = await fetch(
        `http://localhost:8000/orcamentos/reotorna_listagem_orcamentos_com_cliente/`
      );
      const response = await request.json();
      setOrcamentos(response);
    } catch (error) {
      console.error("Erro ao carregar orçamentos:", error);
    }
  };

  useEffect(() => {
    orcamentosRequest();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenDeleteModal = (id) => {
    setOrcamentoSelecionado(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setOrcamentoSelecionado(null);
  };

  const handleDeleteOrcamento = async () => {
    if (!orcamentoSelecionado) return;

    try {
      const response = await fetch(
        `http://localhost:8000/orcamentos/${orcamentoSelecionado}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        SucssesNotifications("Orçamento excluído com sucesso!");
        await orcamentosRequest(); // Atualiza a lista de orçamentos
        handleCloseDeleteModal();
      } else {
        const errorData = await response.json();
        console.error("Erro ao excluir orçamento:", errorData);
        FailNotifications("Não foi possível excluir o orçamento");
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão:", error);
      FailNotifications("Erro na comunicação com o servidor");
    }
  };

  const handleFormataValorMonetário = (valor) => {
    const valorFormatado = `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
    return valorFormatado;
  };

  const handleFilter = async (nomeCliente) => {
    try {
      const request = await fetch(
        `http://localhost:8000/orcamentos/retorna_orcamentos_cliente/?cliente=${nomeCliente}`
      );
      const response = await request.json();
      setOrcamentos(response);
    } catch (error) {
      console.error("Erro ao filtrar orçamentos:", error);
    }
  };

  return (
    <>
      <FlexCointainer pontas="true" size="98%">
        <Title>Orçamentos</Title>
        <ContainerBtns>
          <Button color={"blue"} action={handleOpenModal}>
            Novo Cliente
          </Button>
          <Button action={() => navigate("/Orcamentos/NovoOrcamento/")}>
            Novo Orçamento
          </Button>
        </ContainerBtns>
      </FlexCointainer>
      <ListFilter action={handleFilter} />
      <DataGrid>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Valor total</th>
            <th>Qtnd. Peças</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map((orcamento, index) => (
            <tr key={index}>
              <td>{orcamento.cliente.nome}</td>
              <td>{handleFormataValorMonetário(orcamento.valor_total)}</td>
              <td>{orcamento.pecas.length}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/Orcamentos/MaisInformacoesOrcamento/${orcamento.id}`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(orcamento.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataGrid>
      <CadastrarClienteModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {isDeleteModalOpen && (
        <ConfirmarExclusaoModal
          mensagem="Tem certeza que deseja excluir este orçamento?"
          onConfirm={handleDeleteOrcamento}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
