import React from 'react';
import { render} from '@testing-library/react';
import { PhotoContext } from '../../context/PhotoContext';
import Item from '../../components/Item';

//mockeo Container
jest.mock('../../components/Container', () => () => <div>MockedContainer</div>);

describe('Item', () => {

  it('Renderiza correctamente', () => {
    const mockSearchTerm = 'test';
    const mockImages = [];
    const mockRunSearch = jest.fn();

    const mockContextValue = {
      images: mockImages,
      loading: false,
      runSearch: mockRunSearch
    };

    const { getByText } = render(
      <PhotoContext.Provider value={mockContextValue}>
        <Item searchTerm={mockSearchTerm} />
      </PhotoContext.Provider>
    );

    expect(getByText(`${mockSearchTerm} Pictures`)).toBeTruthy();
    expect(getByText('MockedContainer')).toBeTruthy();
  });

});
