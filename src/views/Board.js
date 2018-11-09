import { Component, t } from '../framework';
import { createColumn, removeColumn, createPost, removePost, updatePost } from '../api';
//import Materialize from 'materialize-css';


export default class Board extends Component {
  constructor(data) {
    super(data);
  }

  eventMap = {
    'click @@ .new-section a i': () => {
      const newColumn = {
        name: `column`,
        id: (Math.floor(Math.random()*16*16*16*16*16*16)).toString(16),
        items: []
      };
      newColumn.name = `${newColumn.name}-${newColumn.id}`;
      // show loader
      createColumn(newColumn)
        .then(() => {
          // hide loader
          this.model.columns.push(newColumn);
          console.log(this.model.columns);
        })
        .catch((e) => {
          // hide loader
          console.log(e);
        });

    },
    'click @@ .remove-column': ({ target }) => {
      const columnId = target.id;
      console.log(columnId);

      removeColumn(columnId)
        .then(() => {
          this.model.columns = this.model.columns.filter(({ id }) => id !== columnId);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // ====== REMOVE POST ====== //

    'click @@ .remove-post': ({ target }) => {
      
      const currentPostId = target.id;
      console.log("currentPostId = " + currentPostId);

      const currentColumnId = target.closest('section').dataset.columnid;
      console.log("currentColumnId = " + currentColumnId);

      //postTarget.parentNode.parentNode.remove();

      removePost(currentPostId, currentColumnId)

        .then(() => {
          const currentColumn = this.model.columns.find(({ id }) => id === currentColumnId);
          currentColumn.items = currentColumn.items.filter(({ id }) => id !== currentPostId);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // ====== UPDATE POST ====== //

    'click @@ #buttonUpdatePost': ({ target }) => {
      this.modal = M.Modal.init(document.querySelector('.modal'));
      this.modal.open();

      const currentPostId = target.id;
      const currentColumnId = target.closest('section').dataset.columnid;

      document.querySelector('#title').focus();
      document.querySelector('#title').value = "title";
      document.querySelector('#text').value = "description";

      console.log(currentColumnId);

      updatePost(currentPostId, currentColumnId)
        .then(() => {
          // const currentColumn = this.model.columns.find(({ id }) => id === currentColumnId);
          // currentColumn.items = currentColumn.items.filter(({ id }) => id !== currentPostId);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    'click @@ .modalOpener': (event) => {
      this.currentColumnId = event.target.dataset.columnid;
      this.modal = M.Modal.init(document.querySelector('.modal'));
      this.modal.open();
    },

    'click @@ #buttonCreatePost': () => {
      let id = (Math.floor(Math.random()*16*16*16*16*16*16)).toString(16);
      let title = document.querySelector('#title').value;
      let text = document.querySelector('#text').value;
      let date = new Date().toDateString();
      let time = `${new Date().getHours()} hours ${new Date().getMinutes()} minutes`;

      // ============= validate text, title, etc.
      const escapeHtml = (text) => {
        let map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#039;'
        };
      
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
      }
      title = escapeHtml(title);
      text = escapeHtml(text);
      
      let newItem;

      //=========== checking for filling title
      if(title) {
        newItem = {
          id,
          title,
          text,
          date,
          time
        }

        createPost(newItem, this.currentColumnId)
          .then(() => {
            // hide loader
            this.model.columns.forEach((columnData) => {
              
              if(columnData.id === this.currentColumnId) {
                columnData.items.push(newItem);
              }
            });
          })
          .catch((e) => {
            // hide loader
            console.log(e);
          });
      }
    }
  }
  
  createPost = ({ id, title, text, date, time }) => t`<li data-postId=${id}>
      <p>id = ${id}</p>
      <p>${title}</p>
      <p>${text}</p>
      <p>${date}</p>
      <p>${time}</p>
      <span><i class="material-icons remove-post red-text text-darken-3" id=${id}>delete</i></span>
      <a class="waves-effect waves-light btn-small" id="buttonUpdatePost">Edit post</a>
    </li>`;

  createColumn = ({ name, items, id }) => t`<section class="col s12 m6 l4" data-columnId=${id}>
        <header>
          <h5>${name}<i class="material-icons remove-column red-text text-darken-3" id="${id}">delete</i></h5>
          
          <span>Add a new To Do</span>

          <button data-target="modal1" data-columnId=${id} class="btn modalOpener blue-grey add-${id}">Modal</button>
        </header>
        <ul class="content">
          ${items.map(this.createPost).join('')}
        </ul>
    </section>`;


  render = () => t`
    <div class="board row">
      ${this.model.columns.map(this.createColumn).join('')}
      <section class="new-section col s12 m4 l4 valign-wrapper" >
        <a class="btn-floating pulse center-align"><i class="material-icons">add</i></a>
      </section>

      <div class="modal">
        <div class="modal-content">
          <h4>Create a new TODO-item</h4>

          <div class="input-field">
              <input id="title" type="text" class="validate valid" required="" data-length="80">
              <label for="title" class="">Header</label>
          </div>

          <div class="input-field">
              <textarea id="text" class="materialize-textarea" data-length="1000" style="height: 45px;"></textarea>
              <label for="text" class="">Description</label>
          </div>
          </div>
        <div class="modal-footer">
            <a class="waves-effect waves-light btn" id="buttonCreatePost">Create</a>
        </div>
      </div>
    </div>
  `;
}