import { Router, EventBus, t } from './framework';
import { getColumns } from './api';
import styles from './app.scss';

import Calendar from './views/Calendar';
import Board from './views/Board';



// document.querySelector('.sidenav-trigger').addEventListener('click', function() {
//   var elems = document.querySelector('.sidenav');
//   var instances = M.Sidenav.init(elems, options);
// });

export default class App {
  constructor(mainElement = document.querySelector('body')) {
    const calendar = new Calendar({ name: 'Calendar' });
    const board = new Board({
      columns: []
    });
    const outlet = document.querySelector('#outlet');

    this.eventBus = new EventBus();

    //this.sidenav = M.Sidenav.init(document.querySelector('.sidenav-trigger'));

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
      <nav>
        <div class="nav-wrapper">
        <a class="brand-logo">Prello</a>
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

    // this.sidenav = M.Sidenav.init(document.querySelector('.sidenav'));
    // this.sidenav.open();

    document.querySelector('.sidenav-trigger').addEventListener('click', function() {
      
      this.sidenav = M.Sidenav.init(document.querySelector('.sidenav'));
      this.sidenav.open();

    });
  }
}
