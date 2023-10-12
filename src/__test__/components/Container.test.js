import React from 'react';
import { render, act } from '@testing-library/react';
import { PhotoContext } from '../../context/PhotoContext';
import Container from '../../components/Container';

describe('Container', () => {

    it('Llama a runSearch con la propiedad searchTerm', () => {
        const mockRunSearch = jest.fn();
        const searchTerm = "test";
        
        render(
            <PhotoContext.Provider value={{ images: [], loading: true, runSearch: mockRunSearch }}>
                <Container searchTerm={searchTerm} />
            </PhotoContext.Provider>
        );

        expect(mockRunSearch).toHaveBeenCalledWith(searchTerm);
    });

    it('Cuando loading es true, se muestra el componente de carga', () => {
        const { queryByTestId } = render(
            <PhotoContext.Provider value={{ images: [], loading: true, runSearch: jest.fn() }}>
                <Container searchTerm="test" />
            </PhotoContext.Provider>
        );
        expect(queryByTestId('loader')).toBeTruthy();
    });

    it('Cuando loading es false, se muestra la galería', () => {
        const mockImages = ['img1', 'img2', 'img3'];
        const { queryByTestId } = render(
            <PhotoContext.Provider value={{ images: mockImages, loading: false, runSearch: jest.fn() }}>
                <Container searchTerm="test" />
            </PhotoContext.Provider>
        );
        expect(queryByTestId('gallery')).toBeTruthy();
    });

    it('Coincide el Snapshot', () => {
        const { asFragment } = render(
            <PhotoContext.Provider value={{ images: [], loading: true, runSearch: jest.fn() }}>
                <Container searchTerm="test" />
            </PhotoContext.Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
