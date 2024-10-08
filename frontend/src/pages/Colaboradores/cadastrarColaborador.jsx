import { Title } from "../../components/Title";
import { Button } from '../../components/Button/index';
import { useEffect, useState } from "react";
import { Colaborador } from "../../models/Colaborador";
import { useAuth } from "../../hooks/useAuth";
import { FailNotifications, SucssesNotifications } from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import { FlexDiv, FundoForm, FundoTitle, StyledForm } from "../Clientes/styles";
import { FloatLabel } from '../../components/FloatLabel/index';
import { StyledOptions, StyledSelect } from "../Materiais/styles";

export const CadastrarColaboradorPage = () => {
    const [colab, setColab] = useState(new Colaborador());
    const [cargos, setCargos] = useState([]);
    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setColab({...colab, [name]: value});
    };

    const handleLoadCargos = async () => {
        const request = await fetch('http://localhost:8000/cargos/');
        const response = await request.json();

        setCargos(response);
    }

    useEffect(() => {
        handleLoadCargos();
    }, []);
    
    const handleCadastrarColab = async (e) => {
        e.preventDefault();

        const request = await fetch('http://localhost:8000/colaboradores/', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${state.token}`
            },
            body: JSON.stringify(colab),
        });

        if(request.ok){
            SucssesNotifications('Cadastrado com sucesso');
            navigate('/Colaboradores/');
        }else{
            FailNotifications('Erro ao cadastrar Colaborador');
        }
    
    };

    console.log(colab);

    return(
        <>
            <FundoTitle>
                <Title mt={0}>Cadastrar Colaborador</Title>
            </FundoTitle>
            <FundoForm>
                <StyledForm>
                    <FloatLabel type="text" text="nome" name="nome" onChange={handleChange}/> <br />
                    <FloatLabel type="date" text="nascimento" name="nascimento" onChange={handleChange} /> <br />
                    <FloatLabel type="text" text="telefone" name="telefone" onChange={handleChange}/><br />
                    <FloatLabel type="text" text="CPF" name="cpf" onChange={handleChange} /> <br />
                    <FloatLabel type="email" text="email" name="email" onChange={handleChange}/> <br />
                    <span>
                        <br />
                        <label htmlFor="">Cargo:  </label>
                        <StyledSelect>
                            {cargos.map((cargo, index) => (
                                <StyledOptions value={cargo.id} key={index}>{cargo.nome}</StyledOptions>
                            ))}
                        </StyledSelect>
                    </span>

                    <FlexDiv>
                        <Button children={'Cadastrar'} action={handleCadastrarColab}/>
                        <Button children={'Cancelar'} color={'red'} action={() => navigate('/Colaboradores/')}/>
                    </FlexDiv>
                </StyledForm>
            </FundoForm>
        </>
    );
};