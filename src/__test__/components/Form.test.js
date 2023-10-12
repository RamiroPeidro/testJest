import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App.js';

describe('App Component', () => {

  it('Renderiza bien sin romperse, verificando que el titulo se muestre', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('SnapShot')).toBeInTheDocument();
  });

  it('En la ruta principal, redirige a /mountain, verificando el texto', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('mountain Pictures')).toBeInTheDocument();
  });
});
