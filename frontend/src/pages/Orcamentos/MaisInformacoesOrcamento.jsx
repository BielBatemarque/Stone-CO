import { useParams } from "react-router-dom";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { Title } from "../../components/Title";
import { FloatLabel } from "../../components/FloatLabel/index";
import { useEffect, useState } from "react";
import { StyledOptions, StyledSelect } from "../Materiais/styles";
import { DataGrid } from "../../components/Datagrid/styled";

export const MaisInformacoesOrcamento = () => {
  const { id } = useParams(":id");
  const [orcamento, setOrcamento] = useState({ pecas: [] });
  const [clientes, setClientes] = useState([]);

  const orcamentoRequest = async () => {
    const request = await fetch(
      `http://localhost:8000/orcamentos/retorna_orcamento_com_pecas/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );
    const response = await request.json();

    setOrcamento(response);
  };

  const clientesRequest = async () => {
    const request = await fetch(`http://localhost:8000/clientes`);
    const response = await request.json();

    setClientes(response);
  };

  const handleClienteChange = (e) => {
    const { value } = e.target;
    setOrcamento({ ...orcamento, cliente: value });
  };

  useEffect(() => {
    orcamentoRequest();
    clientesRequest();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrcamento({ ...orcamento, [name]: value });
  };

  console.log(orcamento);

  return (
    <>
      <FundoTitle>
        <Title mt={0}>Orçamento: {orcamento.id}</Title>
      </FundoTitle>
      <FundoForm>
        <StyledForm>
          <h3>Peças </h3>
          <FlexDiv>
            {orcamento.pecas.length > 0 ? (
              <DataGrid>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Material</th>
                    <th>M²</th>
                  </tr>
                </thead>
                <tbody>
                  {orcamento.pecas.map((peca, index) => (
                    <tr key={index}>
                      <td>{peca.nome}</td>
                      <td>{peca.descrição}</td>
                      <td>{peca.quantidade_metros}</td>
                      <td>{peca.material}</td>
                    </tr>
                  ))}
                </tbody>
              </DataGrid>
            ) : null}
          </FlexDiv>
          <FlexDiv justfy="space-around">
            <span>
              <label htmlFor="">Cliente: </label>
              <StyledSelect
                readonly
                name="cliente"
                value={orcamento.cliente || ""}
                onChange={handleClienteChange}
              >
                <StyledOptions value="" disabled>
                  Selecione um cliente
                </StyledOptions>
                {clientes.map((cliente, index) => (
                  <StyledOptions value={cliente.id} key={index}>
                    {cliente.nome}
                  </StyledOptions>
                ))}
              </StyledSelect>
            </span>

            <FloatLabel
              name={"valor_total"}
              text="Total do Orçamento"
              onChange={handleChange}
              value={orcamento.valor_total}
            />
          </FlexDiv>
        </StyledForm>
      </FundoForm>
    </>
  );
};
