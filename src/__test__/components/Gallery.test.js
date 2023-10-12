import React from 'react';
import { render } from '@testing-library/react';
import Gallery from '../../components/Gallery';

describe('Gallery', () => {

  it('Cuando existen datos, renderiza correctamente', () => {
    const mockData = [
      {
        farm: 1,
        server: 'server',
        id: 'id1',
        secret: 'secret',
        title: 'title1'
      },
      {
        farm: 2,
        server: 'server2',
        id: 'id2',
        secret: 'secret2',
        title: 'title2'
      }
    ];

    const { queryByTestId, queryAllByRole } = render(<Gallery data={mockData} />);

    //que el componente no-images no exista.
    expect(queryByTestId('no-images')).toBeNull();

    const images = queryAllByRole('img');
    expect(images).toHaveLength(2);
    //verifica quee en el DOM existan estas dos imagenes.
    expect(images[0]).toHaveAttribute('src', 'https://farm1.staticflickr.com/server/id1_secret_m.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://farm2.staticflickr.com/server2/id2_secret2_m.jpg');
  });

  it('Cuando no se proporcionan datos, no se renderizan imagenes', () => {
    const mockData = [];

    const { getByTestId, queryAllByRole } = render(<Gallery data={mockData} />);

    //se fija que exista un componente con el ID no-images.
    expect(getByTestId('no-images')).not.toBeNull();

    //se fija que no haya elementos con la etiqueta img.
    const images = queryAllByRole('img');
    expect(images).toHaveLength(0);
  });

});
