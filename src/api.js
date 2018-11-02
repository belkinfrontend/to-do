const rootUrl = 'http://localhost:5000/api';

export const getColumns = () => {
  return fetch(`${rootUrl}/columns`, { method: 'GET' })
    .then((response) => {
      console.log(response);
      return response.json();
    });
  }

// () => fetch()
// () => { return fetch() }

// () => { fetch() }

export const createColumn = (columnData) => {
  return fetch(`${rootUrl}/columns`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(columnData)
  })
    .then((res) => {
      if(res.ok) {
        return res.text();
      } else {
        throw new Error('something wrong with server');
      }
    });
  }

export const removeColumn = (columnId) => {
  console.log(columnId);
  return fetch(`${rootUrl}/columns/${columnId}`, { method: 'DELETE' })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error('something wrong with server');
      }
    });   
}

export const createPost = (postData, columnId) => {
  return fetch(`${rootUrl}/columns/${columnId}`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then((res) => {
    if(res.ok) {
      return res.text();
    } else {
      throw new Error('something wrong with server');
    }
  });   
}

// export const createItems = () =>
//   fetch(`${rootUrl}/columns`, {method: 'get'})
//     .then(res => res.json());