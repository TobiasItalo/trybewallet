import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste do caminho feliz da página de Login:', () => {
  test('A página deve renderizar o título Login, o campo para e-mail, o campo para senha e o botão "Entrar"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    screen.getByRole('heading', { name: /login/i, level: 2 });
    const emailInput = screen.getByLabelText(/e-mail:/i);
    const senhaInput = screen.getByLabelText(/senha:/i);
    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    expect(entrarBtn).toBeDisabled();
    userEvent.type(emailInput, 'exemplo@email.com');
    userEvent.type(senhaInput, '123456');
    expect(entrarBtn).toBeEnabled();
    userEvent.click(entrarBtn);
    expect(history.location.pathname).toBe('/carteira');
  });
});
