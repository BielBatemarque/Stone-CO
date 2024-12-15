import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FlexCointainer } from "../../components/FlexContainer";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/Datagrid/styled";
import { ListFilter } from "../../components/ListFilter";
import { globalContext } from "../../context/context";
import {
  FailNotifications,
  SucssesNotifications,
} from "../../components/Notifications";
import { ConfirmarExclusaoModal } from "../../components/Modal/ConfirmarExclusaoModal";

export const ColaboradorPages = () => {
  const [colabs, setColabs] = useState([]);
  const navigate = useNavigate();
  const { state } = useContext(globalContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);

  const handleLoadingColabs = async () => {
    const request = await fetch("http://localhost:8000/colaboradores/");
    const response = await request.json();

    setColabs(response);
  };

  useEffect(() => {
    handleLoadingColabs();
  }, []);

  const handleFiltrarColaborador = async (nomeColaborador) => {
    const request = await fetch(
      `http://localhost:8000/colaboradores/filtrar_colaborador/?nome=${nomeColaborador}`
    );
    const responseFiltrado = await request.json();

    setColabs(responseFiltrado);
  };

  const handleDeleteColaborador = async () => {
    const request = await fetch(
      `http://localhost:8000/colaboradores/${colaboradorSelecionado}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${state.token}`,
        },
      }
    );

    if (request.ok) {
      SucssesNotifications("Sucesso ao deletar Colaborador");
      handleLoadingColabs();
      handleCloseDeleteModal();
    } else {
      FailNotifications("Erro ao deletar colaborador.");
    }
  };

  const handleOpenDeleteModal = (id) => {
    setColaboradorSelecionado(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setColaboradorSelecionado(null);
  };

  return (
    <>
      <FlexCointainer size={"98%"} pontas="true">
        <Title>Colaboradores</Title>
        <Button action={() => navigate("/Colaboradores/CadastrarColaborador/")}>
          Novo Colaborador
        </Button>
      </FlexCointainer>

      <ListFilter action={handleFiltrarColaborador} />
      <DataGrid>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {colabs.map((colab, index) => (
            <tr key={index}>
              <td>{colab.nome}</td>
              <td>{colab.cpf}</td>
              <td>{colab.email}</td>
              <td>{colab.cargo_nome}</td>
              <td className="actions">
                <button
                  className="edit"
                  onClick={() =>
                    navigate(
                      `/Colaborador/maisInformacoesColaborador/${colab.id}/`
                    )
                  }
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleOpenDeleteModal(colab.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </DataGrid>
      {isDeleteModalOpen && (
        <ConfirmarExclusaoModal
          mensagem="Tem certeza que deseja excluir este colaborador?"
          onConfirm={handleDeleteColaborador}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
