import { Component, t } from '../framework';
import { createColumn, removeColumn, createPost } from '../api';
//import Materialize from 'materialize-css';


export default class Board extends Component {
  constructor(data) {
    super(data);
  }

  eventMap = {
    'click @@ .new-section a i': () => {
      const newColumn = {
        name: `new column!`,
        id: (Math.floor(Math.random()*16*16*16*16*16*16)).toString(16),
        items: []
      };
      // show loader
      createColumn(newColumn)
        .then(() => {
          // hide loader
          this.model.columns.push(newColumn);
        })
        .catch((e) => {
          // hide loader
          console.log(e);
        });

    },
    'click @@ .remove': ({ target }) => {
      const columnId = target.id;
      // this.model.columns = this.model.columns.filter(({ id }) => id !== columnId);

      removeColumn(columnId)
        .then(() => {
          this.model.columns = this.model.columns.filter(({ id }) => id !== columnId);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    'click @@ .testBtn': this.method,

    'click @@ .modalOpener': (event) => {
      //console.log(event.target.dataset.columnid);
      this.currentColumnId = event.target.dataset.columnid;
      this.modal = M.Modal.init(document.querySelector('.modal'));
      this.modal.open();
    },

    'click @@ #createPost': () => {
      let title = document.querySelector('#title').value;
      let text = document.querySelector('#text').value;
      let date = new Date().toDateString();
      let time = `${new Date().getHours()} hours  ${new Date().getMinutes()} minutes`;

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
  

  createItem = ({ id, title, text, date, time }) => t`<li>
      <span>${id}</span>
      <span>${title}</span>
      <span>${text}</span>
      <span>${date}</span>
      <span>${time}</span>
    </li>`;

  createColumn = ({ name, items, id }) => t`<section>
        <header>
          <h5>${name}<i class="material-icons remove" id="${id}">delete</i></h5>
          
          <span>Add a new To Do</span>

          <button data-target="modal1" data-columnId=${id} class="btn modalOpener blue-grey add-${id}">Modal</button>
        </header>
        <ul class="content">
          ${items.map(this.createItem).join('')}
        </ul>
    </section>`;

  method(...args) {
    console.log(args);
  }

  render = () => t`
    <div class="board">
      ${this.model.columns.map(this.createColumn).join('')}
      <section class="new-section">
        <a class="btn-floating pulse"><i class="material-icons">add</i></a>
        
        <button class="btn testBtn">Mouse Event</button>

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
            <a class="waves-effect waves-light btn" id="createPost">Create</a>
        </div>
      </div>
    </div>
  `;

  onComponentMount = () => {
    const modalEl = document.querySelector('.modal');
    // this.modal = M.Modal.init(document.querySelector('.modal'));
  }


  // escapeHtml = (text) => {
  //   var map = {
  //     '&': '&amp;',
  //     '<': '&lt;',
  //     '>': '&gt;',
  //     '"': '&quot;',
  //     "'": '&#039;'
  //   };
  
  //   return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  // }
  
}