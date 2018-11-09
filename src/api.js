const rootUrl = 'http://localhost:5000/api';

export const getColumns = () => {
  return fetch(`${rootUrl}/columns`, { method: 'GET' })
    .then((response) => {
      console.log(response);
      return response.json();
    });
  }

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

export const removePost = (currentPostId, currentColumnId) => {
  // console.log(postId, columnId);

  return fetch(`${rootUrl}/columns/${currentColumnId}/posts/${currentPostId}`, { method: 'DELETE' })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error('something wrong with server');
    }
  }); 
}

export const updatePost = (currentPostId, currentColumnId) => {
  // console.log(postId, columnId);

  return fetch(`${rootUrl}/columns/${currentColumnId}/posts/${currentPostId}`, { method: 'PUT' })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error('something wrong with server');
    }
  }); 
}