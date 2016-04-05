const DEFAULT_OPTIONS = {
  responseType: 'text',
  withCredentials: false
};

const DEFAULT_INTERCEPTORS = {
  request: () => {},
  response: httpResponse => httpResponse.data,
  error: httpErrorResponse => Promise.reject(httpErrorResponse)
};

export default function axiosAdapter(axios, config = {}) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...(config.options || {})
  };

  const interceptors = {
    ...DEFAULT_INTERCEPTORS,
    ...(config.interceptors || {})
  };

  return function(url, requestOptions) {
    const request = {
      ...options,
      url: url,
      method: requestOptions.verb,
      params: requestOptions.query,
      data: requestOptions.body
    };

    interceptors.request(request);

    return axios(request).then(interceptors.response, interceptors.error);
  }
};
