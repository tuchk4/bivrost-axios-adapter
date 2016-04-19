const DEFAULT_OPTIONS = {
  responseType: 'text',
  withCredentials: false
};

const DEFAULT_INTERCEPTORS = {
  response: httpResponse => httpResponse.data,
  error: httpErrorResponse => Promise.reject(httpErrorResponse)
};

export default function axiosAdapter(axios, options = {}) {
  const requestAdapterOptions = {
    ...DEFAULT_OPTIONS,
    ...config
  };

  return function(url, requestOptions = {}, applicationInterceptors = {}) {
    const request = {
      ...requestAdapterOptions,
      url: url,
      method: requestOptions.verb,
      params: requestOptions.query,
      data: requestOptions.body,
      headers: {
        ...(requestAdapterOptions.headers || {}),
        ...(requestOptions.headers || {})
      }
    };

    const interceptors = {
      ...DEFAULT_INTERCEPTORS,
      ...applicationInterceptors
    };

    if (interceptors.request) {
      interceptors.request(request);
    }

    const proxt = (data => data);
    return axios(request).then(interceptors.response || proxy, interceptors.error || proxy);
  }
};
