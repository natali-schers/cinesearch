import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
    return (
        <section>
            <h1>Ops... Página não encontrada!</h1>

            <p>A página que você está procurando não existe ou não pode ser acessada no momento.</p>

            <CustomLink to={'/'}>←  Voltar para página inicial</CustomLink>      
        </section>
    );
}

const CustomLink = styled(Link)`
    margin-top: 24px;
    display: inline-block;
    padding: 8px 16px;
    color: #FFFFFF;
    background-color: #0f0f1a;
    border-radius: 8px;
    text-decoration: unset;
    border: 1px solid #0f0f1a;
    font-size: 14px;

    &:hover {
        color: #ffffff;
        border-color: #ffffff;
    }
`;