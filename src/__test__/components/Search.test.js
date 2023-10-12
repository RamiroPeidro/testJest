import React from 'react';
import { render } from '@testing-library/react';
import Search from '../../components/Search';
import Container from '../../components/Container';

// Se mockeo Container
jest.mock('../../components/Container', () => {
  return function MockedContainer({ searchTerm }) {
    return <div data-testid="mockedContainer">{searchTerm}</div>;
  };
});

describe('Search', () => {

  it('Se renderiza correctamente y el text "testSearch" aparece', () => {
    const term = 'testSearch';
    const { getByText, getByTestId } = render(<Search searchTerm={term} />);
    
    expect(getByText(`${term} Images`)).toBeTruthy();

    const container = getByTestId('mockedContainer');
    expect(container.textContent).toBe(term);
  });

});
