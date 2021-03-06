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
      return res.json();
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
  return fetch(`${rootUrl}/columns/${currentColumnId}/posts/${currentPostId}`, { method: 'DELETE' })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error('Something wrong with server');
    }
  }); 
}

export const updatePost = (postData, currentColumnId) => {
  return fetch(`${rootUrl}/columns/${currentColumnId}/posts/${postData.id}`, {
     method: 'PUT',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error('Something wrong with server');
    }
  }); 
}

export const toggleItem = ({ srcColId, itemId, destColId }) => {
  return fetch(`${rootUrl}/columns/toggle`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ srcColId, itemId, destColId })
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error('something wrong with server');
    }
  })
}

export const getItems = () => {
  return fetch(`${rootUrl}/columns/items`)
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error('Something wrong with server');
      }
    });
}