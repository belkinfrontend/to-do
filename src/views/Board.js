import { Component, t } from '../framework';
import Materialize from 'materialize-css';


export default class Board extends Component {
  constructor(data) {
    super(data);
  }

  eventMap = {
    'click @@ .new-section a i': () => {
      // createNewColumn(/**/)
      //   .then(() => {
          this.model.columns.push({
            name: 'new column!',
            id: (Math.floor(Math.random()*16*16*16*16*16*16)).toString(16),
            items: []
          });
        // })
    },
    'click @@ .remove': ({ target }) => {
      const columnId = target.id;
      this.model.columns = this.model.columns.filter(({ id }) => id !== columnId);
    },
    'click @@ .testBtn': this.method,

    'click @@ .modalOpener': (event) => {
      //console.log(event.target.dataset.columnid);
      this.currentColumnId = event.target.dataset.columnid;
      this.modal.open()
    },

    'click @@ #createPost': () => {
      const titleInput = document.querySelector('#title').value;
      const descInput = document.querySelector('#text').value;
      console.log(this.currentColumnId);
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
            <h5>${name}<i class="material-icons remove" id="${id}">
            delete</i></h5>
            
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
    this.modal = M.Modal.init(document.querySelector('.modal'));
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