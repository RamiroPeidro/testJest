import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../../components/NotFound';

describe('NotFound', () => {

  it('Se renderiza correctamente', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Page Not Found')).toBeTruthy();
  });

});
