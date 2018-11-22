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
    const today = new Date();
    const matrix = {
      2018: {
        10: {
          22: [
            {
              displayname : "A very important meeting", 
              at : new Date(today.getFullYear(), today.getMonth(), 12, 15, 30).getTime()
            },
            {
              displayname : "A somewhat important 2 hours meeting", 
              color : "rgb(113, 180, 193)",
              at : new Date(today.getFullYear(), today.getMonth(), 12, 17, 30).getTime(),
              duration : 1000 * 60 * 60 * 2
            },
            {
              displayname : "This meeting is so important it's red", 
              color : "#9c3d27",
              at : new Date(today.getFullYear(), today.getMonth(), 12, 21, 55).toString()
            }
          ]
        }
      }
    }
    let calendar = new JSCalendar(
      elem,
      { daysVocab: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",] }
    ).init().setMatrix(matrix).render();
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

