import { Component, t } from '../framework';
import { getItems } from '../api';

import M from 'materialize-css';

export default class Calendar extends Component {
  constructor(data) {
    super(data);


    console.log(document.querySelector('.datepicker'));
    M.Datepicker.init(document.querySelector('.datepicker'), {});
  }

  onComponentMount = () => {
    console.log('calendar is mounted now!');

    getItems()

      .then((items) => {
        this.model.items = items;
      })
      .catch((e) => {
        console.log('Error!', e);
      });

      console.log(document.querySelector('.datepicker'));
      document.querySelector('.datepicker').addEventListener('click', function() {
        M.Datepicker.init(document.querySelector('.datepicker'));
      })
      
  }
  

  render() {
    
    return t`
      <div id="calendar-container">
  
        ${this.model.items.map((item) => item && item.day)}

        <input type="text" class="datepicker">

      </div>`
  }
}

