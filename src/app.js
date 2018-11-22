import { Router, EventBus, t } from './framework';
import { getColumns, getItems } from './api';
import styles from './app.scss';

import Calendar from './views/Calendar';
import Board from './views/Board';
import M from 'materialize-css';

export default class App {
  constructor(mainElement = document.querySelector('body')) {
    const board = new Board({
      columns: []
    });
    const calendar = new Calendar({
      name: 'Calendar',
      items: []
    });

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

    getColumns()
      .then((columns) => {
        board.model.columns = columns;

        if (window.location.hash === '#main') {
          this.eventBus.publish('routeChanged', 'main');
        }
        else if (window.location.hash === '#calendar') {
          this.eventBus.publish('routeChanged', 'calendar');
        }
        else {
          this.eventBus.publish('routeChanged', 'main');
        }
      })
      .catch((e) => {
        console.log('Error!', e);
      });

    getItems()
      .then((items) => {
        calendar.model.items = items;
      })
      .catch((e) => {
        console.log('Error!', e);
      });
  }

  template = t`
    <header class='header'>
      <nav>
        <div class="nav-wrapper container">
          <a class="brand-logo">To Do</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href='#main'>main</a></li>
            <li><a href='#calendar'>calendar</a></li>
          </ul>
        </div>
      </nav>
      <ul class="sidenav" id="mobile-demo">
        <li><a href='#main'>main</a></li>
        <li><a href='#calendar'>calendar</a></li>
      </ul>
    </header>
    <div id="outlet"></div>
    `;

  render() {
    this.mainElement.innerHTML = this.template;

    document.querySelector('.sidenav-trigger').addEventListener('click', function() {
      
      this.sidenav = M.Sidenav.init(document.querySelector('.sidenav'), {outDuration: 500});
      this.sidenav.open();
    });
  }
}
