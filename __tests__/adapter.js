jest.unmock('../src');
jest.unmock('axios');

import axiosAdapter from '../src';
import axios from 'axios';

const httpbin = 'http://httpbin.org';

describe('Adapter', () => {
  const axiosApi = axiosAdapter(axios);
  const query = {
    foo: 'bar'
  };

  pit('GET request', () => {
   return axiosApi(`${httpbin}/get`, {
      verb: 'GET',
      query: {
        ...query
      }

      // if run test in browser with custom headers - all is OK
      // but with node - will be [Network Error].
      // will investigate this a bit later

      //headers: {
      //  'X-test': 1
      //}
    }).then(response => {
      expect(response.args).toEqual({
        ...query
      });
    });
  });
});
