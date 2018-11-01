const rootUrl = 'http://localhost:5000/api';

export const getColumns = () =>
  fetch(`${rootUrl}/columns`)
    .then((response) => response.json());
