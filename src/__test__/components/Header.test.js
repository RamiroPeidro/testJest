import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header', () => {

  it('Se renderiza correctamente sin romper', () => {
    const mockHandleSubmit = jest.fn();
    const mockHistory = {};
    render(
        <Router>
            <Header handleSubmit={mockHandleSubmit} history={mockHistory} />
        </Router>
    );
  });

  it('Contiene el titulo Snapshot al renderizar', () => {
    const mockHandleSubmit = jest.fn();
    const mockHistory = {};
    const { getByText } = render(
        <Router>
            <Header handleSubmit={mockHandleSubmit} history={mockHistory} />
        </Router>
    );
    const title = getByText('SnapShot');
    expect(title).toBeInTheDocument();
  });


  it('Renderiza el form y los componentes de navegacion', () => {
    const mockHandleSubmit = jest.fn();
    const mockHistory = {};
    const { getByPlaceholderText, getByRole } = render(
        <Router>
            <Header handleSubmit={mockHandleSubmit} history={mockHistory} />
        </Router>
    );

    const formInput = getByPlaceholderText('Search...');
    const mountainLink = getByRole('link', { name: /mountain/i });
    const beachLink = getByRole('link', { name: /beaches/i });
    const birdLink = getByRole('link', { name: /birds/i });
    const foodLink = getByRole('link', { name: /food/i });

    expect(formInput).toBeInTheDocument();
    expect(mountainLink).toBeInTheDocument();
    expect(beachLink).toBeInTheDocument();
    expect(birdLink).toBeInTheDocument();
    expect(foodLink).toBeInTheDocument();
  });

});
