import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import PhotoContextProvider, { PhotoContext } from '../../context/PhotoContext'; 

jest.mock('axios');

describe('PhotoContextProvider', () => {
    it('Hace el fecth y encuentra la data correctamente', async () => {
        const mockData = {
            data: {
                photos: {
                    photo: [
                        {
                            "id": "53237105139",
                            "owner": "41921339@N05",
                            "secret": "b7c5467721",
                            "server": "65535",
                            "farm": 66,
                            "title": "Landguard",
                            "ispublic": 1,
                            "isfriend": 0,
                            "isfamily": 0
                        },
                        {
                          "id": "5323710539",
                          "owner": "4192139@N05",
                          "secret": "c5467721",
                          "server": "6535",
                          "farm": 67,
                          "title": "Ramita",
                          "ispublic": 1,
                          "isfriend": 0,
                          "isfamily": 1
                      },
                    ]
                }
            }
        };
        
        axios.get.mockResolvedValueOnce(mockData);

        let result = {};
        render(
            <PhotoContextProvider>
                <PhotoContext.Consumer>
                    {value => {
                        Object.assign(result, value);
                        return null;
                    }}
                </PhotoContext.Consumer>
            </PhotoContextProvider>
        );

        expect(result.loading).toBe(true);

        await act(async () => {
            await result.runSearch('ramita');
        });

        expect(result.images).toEqual(mockData.data.photos.photo);
        expect(result.loading).toBe(false);
    });



    it('Maneja el error correctamente', async () => {
        axios.get.mockRejectedValueOnce(new Error('An error occurred'));

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        let result = {};
        render(
            <PhotoContextProvider>
                <PhotoContext.Consumer>
                    {value => {
                        Object.assign(result, value);
                        return null;
                    }}
                </PhotoContext.Consumer>
            </PhotoContextProvider>
        );

        await act(async () => {
            await result.runSearch('test-query');
        });

        expect(consoleSpy).toHaveBeenCalledWith('Encountered an error with fetching and parsing data', expect.any(Error));

        consoleSpy.mockRestore();
    });

    it('Coincide el snapshot', () => {
      const { asFragment } = render(<PhotoContextProvider />);
      expect(asFragment()).toMatchSnapshot();
  });
  
});
