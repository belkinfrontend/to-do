import { Component, t } from '../framework';
import { createColumn, removeColumn, createPost, removePost, updatePost, toggleItem } from '../api';
//import Materialize from 'materialize-css';
import Sortable from 'sortablejs';
import { escapeHtml, escapeBackHtml, formatDate } from '../framework/utils/index';

import M from 'materialize-css';
//import 'materialize-css/dist/css/materialize.min.css';


export default class Board extends Component {
  constructor(data) {
    super(data);
  }

  eventMap = {
    'click @@ .new-section a i': () => {
      const newColumn = {
        name: `new column`,
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

    'click @@ .remove-column': ({ target }) => {
      const columnId = target.id;

      removeColumn(columnId)
        .then((response) => {
          if (response.error) {
            throw new Error(response.message);
          } else {
            this.model.columns = this.model.columns.filter(({ id }) => id !== columnId);
          }
        })
        .catch((e) => {
          M.toast({ html: e.message });
        });
    },

    'click @@ .remove-post': ({ target }) => {
      const currentPostId = target.id;
      const currentColumnId = target.closest('section').dataset.columnid;

      removePost(currentPostId, currentColumnId)
        .then(() => {
          const currentColumn = this.model.columns.find(({ id }) => id === currentColumnId);
          currentColumn.items = currentColumn.items.filter(({ id }) => id !== currentPostId);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    'click @@ .toggle-post': ({ target }) => {
      const srcColId = target.closest('section').dataset.columnid;
      const itemId = target.closest('li').dataset.postid;
      const destColId = '000001';
      
      if (destColId !== srcColId) {
        toggleItem({
          srcColId,
          itemId,
          destColId
        })
        .then((columns) => {
          this.model.columns = columns;
        });
      }
    },

    'click @@ .buttonUpdatePost': ({ target }) => {
      this.currentColumnId = target.closest('section').dataset.columnid;
      const currentPostId = target.closest('li').dataset.postid;
      const post = this.getPost(this.currentColumnId, currentPostId);

      this.openPostModal(post);
    },

    'click @@ .modalOpener': (event) => {
      this.currentColumnId = event.target.dataset.columnid;

      document.querySelector('#buttonCreatePost').textContent = 'create';
      document.querySelector('.modal-content h4').textContent = 'Creare a new post';
      this.openPostModal({});
    },

    'click @@ #buttonCreatePost': () => {
      console.log(document.querySelectorAll('#text'));
      
      this.postModalData.title = escapeHtml(document.querySelector('#title').value);
      this.postModalData.text = escapeHtml(document.querySelector('#text').value);
      this.postModalData.date = formatDate(new Date());
      this.postModalData.time = ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2);      

      if(this.postModalData) {
        if (this.postModalData.id){
          updatePost(this.postModalData, this.currentColumnId)
          .then(()=>{
            const column = this.model.columns
              .find((columnData) => columnData.id === this.currentColumnId);
            column.items = column.items.map(item => {
                if (item.id === this.postModalData.id) {
                  return this.postModalData;
                } else {
                  return item;
                }
              });
          })
          .catch((e) => {
            // hide loader
            console.log(e);
          });
        } else {
          this.postModalData.id = this.postModalData.id || (Math.floor(Math.random()*16*16*16*16*16*16)).toString(16);
  
          createPost(this.postModalData, this.currentColumnId)
            .then(() => {
              // hide loader
              this.model.columns.forEach((columnData) => {
                
                if(columnData.id === this.currentColumnId) {
                  columnData.items.push(this.postModalData);
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
  }
  
  openPostModal(data){
    this.postModalData = { ...data };
    this.modal = M.Modal.init(document.querySelector('.modal'));
    this.modal.open();

    document.querySelector('#title').focus();
    document.querySelector('#title').value = data.title || '';
    
    document.querySelector('#text').value = data.text || '';
  }

  getPost(columnId, postId){
    const column = this.model.columns.find(c => c.id === columnId);

    if (column){
      document.querySelector('#buttonCreatePost').textContent = 'update';
      document.querySelector('.modal-content h4').textContent = 'Update this post';
      
      return column.items.find(i => i.id === postId);
    } else {
      return null;
    }
  }

  toggleItem = (target) => {

  }

  createPost = ({ id, title, text, date, time }) => t`<li data-postId=${id} draggable="true">
      <p class="post-title">${title}</p>
      <p class="post-description">${text}</p>
      <div class="date">
        <p>${date}</p>
        <p>${time}</p>
      </div>
      
      <div class="post-icons">
        <span title="Edit post"><i class="material-icons buttonUpdatePost green-text text-darken-3 id=${id}">edit</i></span>
        <span title="Replace post"><i class="material-icons toggle-post green-text text-darken-3">done</i></span>
        <span title="Remove post"><i class="material-icons remove-post red-text text-darken-3" id=${id}>delete</i></span>
      </div>  
    </li>`;

  createColumn = ({ name, items, id }) => t`<section class="col s12 m6 l4" data-columnId=${id}>
      <div class="wrapper">
        <header>
          <h5>${name}<i class="material-icons remove-column red-text text-darken-3" id="${id}">delete</i></h5>
          
          <button data-target="modal1" data-columnId=${id} class="btn modalOpener blue-grey add-${id}">Add a new item</button>
        </header>
        <ul class="content js-sortable sortable">
          ${items.map(this.createPost).join('')}
        </ul>
      </div>
    </section>`;


  render = () => t`
    <div class="board row">
      ${this.model.columns.map(this.createColumn).join('')}
      <section class="new-section col s12 m6 l4" >
        <div class="wrapper valign-wrapper">
          <a class="btn-floating pulse center-align"><i class="material-icons">add</i></a>
          </div>
      </section>

      <div class="modal">
        <div class="modal-content">
          <h4></h4>

          <div class="input-field">
              <input id="title" type="text" class="validate valid" placeholder="Enter title" required="" data-length="80">
              <label for="title" class="active">Title</label>
          </div>

          <div class="input-field">
              <textarea id="text" class="materialize-textarea validate" placeholder="Enter description" style="height: 45px;"></textarea>
              <label for="text" class="active">Description</label>
          </div>
          </div>
        <div class="modal-footer">
            <a class="waves-effect waves-light btn" id="buttonCreatePost"></a>
        </div>
      </div>
    </div>
  `;
}