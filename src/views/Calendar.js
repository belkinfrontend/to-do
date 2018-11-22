import { Component, t } from '../framework';
import { getItems } from '../api';

import M from 'materialize-css';

import * as LibName from "vanilla-js-calendar";

 

export default class Calendar extends Component {
  constructor(data) {
    super(data);
  }

  onComponentMount = () => {
    getItems()
      .then((items) => {
        this.model.items = items;
      })
      .catch((e) => {
        console.log('Error!', e);
      }); 
  }

  onComponentUpdate = () => {
    console.log('calendar is mounted now!');

    let elem = document.querySelector("#calendar-container");
    let JSCalendar = LibName.JSCalendar;
    let JSCalendarEvent = LibName.JSCalendarEvent;
    let calendar = new JSCalendar(elem, { daysVocab: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",] }).init().render();
  }

  render() {
    
    return t`
      <div class="calendar">
        <div id="calendar-container"></div>
        <div class='items'>
          ${this.model.items.map((item) => item && item.day)}
        </div>
      </div>`
  }
}

