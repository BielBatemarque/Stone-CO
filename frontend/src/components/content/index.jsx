import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../../pages/login';
import { HomePage } from '../../pages/Home';
import { ContainerMain } from './styles';
import { ClientesPage } from '../../pages/Clientes/index';
import { ColaboradorPages } from '../../pages/Colaboradores';
import { EstoquesPage } from '../../pages/Estoques';
import { FornecedoresPage } from '../../pages/Fornecedores';
import { MateriaisPage } from '../../pages/Materiais/index';
import { VendasPage } from '../../pages/Vendas';
import { RelatoriosPage } from '../../pages/Relatorios';

export const Content = () => {
    return(
        <ContainerMain>
            <Routes>
                <Route path='/' element={<LoginScreen />}  exact/>
                <Route path='/Home/' element={<HomePage />} />
                <Route path='/Clientes/' element={<ClientesPage />}/>
                <Route path='/Colaboradores/' element={<ColaboradorPages/>}/>
                <Route path='/Estoque/' element={<EstoquesPage/>}/>
                <Route path='/Fornecedores/'element={<FornecedoresPage />}/>
                <Route path='/Materiais/' element={<MateriaisPage />}/>
                <Route path='/Vendas/' element={<VendasPage />} />
                <Route path='Relatorios/' element={<RelatoriosPage />} />
            </Routes>
        </ContainerMain>
    );
}