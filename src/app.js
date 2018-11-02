import { Router, EventBus, t } from './framework';
import { getColumns } from './api';
import styles from './app.scss';

import Calendar from './views/Calendar';
import Board from './views/Board';

export default class App {
  constructor(mainElement = document.querySelector('body')) {
    const calendar = new Calendar({ name: 'HELLO! WORLD!' });
    const board = new Board({
      columns: []
    });
    const outlet = document.querySelector('#outlet');

    this.eventBus = new EventBus();

    this.eventBus.subscribe('routeChanged', (page) => {
      switch (page) {
        case 'main':
          calendar.isMounted && calendar.unmount();
          board.mountTo(document.querySelector('#outlet'));
          break;
        case 'calendar':
          board.isMounted && board.unmount();
          calendar.mountTo(document.querySelector('#outlet'));
          break;
        default:
          break;
      }
    });
    this.router = new Router({
      '#main': () => {
        this.eventBus.publish('routeChanged', 'main');
      },
      '#calendar': () => {
        this.eventBus.publish('routeChanged', 'calendar');
      }
    });
    this.mainElement = mainElement;

    // fetch('server/columns')
    //  .then((data) => {
    //    board.model.columns = data;
    //  })

    getColumns()
      .then((columns) => {
        console.log('got data from server', columns);
        board.model.columns = columns;
      })
      .catch((e) => {
        console.log('Error!', e);
      });
  }

  template = t`
    <header class='header'>
      <div class='person'>
        <div class='avatar'></div>
        <p class="name">Ivan Abramov's space - boards</p>
      </div>
      <div class='links'>
        <a href='#main'>main</a>
        <a href='#calendar'>calendar</a>
      </div>
    </header>
    <div id="outlet"></div>
    `;

  render() {
    this.mainElement.innerHTML = this.template;
  }
}
