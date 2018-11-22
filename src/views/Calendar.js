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

  parseCalendarEvents = (items) => {
    let matrix = {};
    const DONE_ITEM_COLOR = '#e91e63';
    const ITEM_COLOR = '#2196f3';
    items.forEach((item) => {
      const rawDate = new Date(item.rawDate);
      const title = item.title;
      const isDone = item.isDone || false;

      const year = rawDate.getFullYear();
      const month = rawDate.getMonth();
      const day = rawDate.getDate();

      const at = rawDate.getTime();
      if (!matrix[year]) {
        matrix[year] = {};
      }
      if (!matrix[year][month]) {
        matrix[year][month] = {};
      }
      if (!matrix[year][month][day]) {
        matrix[year][month][day] = [];
      }

      matrix[year][month][day].push({
        displayname: title,
        at,
        color: isDone ? DONE_ITEM_COLOR : ITEM_COLOR
      });
    });
    return matrix;
  }

  onComponentUpdate = () => {
    console.log('calendar is mounted now!');

    let elem = document.querySelector("#calendar-container");
    let JSCalendar = LibName.JSCalendar;
    let calendar = new JSCalendar(
      elem,
      {
        views: [ 'week', 'month' ],
        ampm: false
      }
    ).init().setMatrix(this.parseCalendarEvents(this.model.items)).render();
  }

  render() {
    
    return t`
      <div class="calendar">
        <div id="calendar-container"></div>
      </div>`
  }
}

