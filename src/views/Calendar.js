import { Component, t } from '../framework';
import { getItems } from '../api';
//import Datepickk from '../../node_modules/datepickk/dist/datepickk';



export default class Calendar extends Component {
  constructor(data) {
    super(data);
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
  }

  render() {
    return t`
      <div>
        <div id="calendar">
          <div class="controls">
            <div id="date">2018 May</div>
            <div class="buttons">
              <a class="button" id="prev">←</a>
              <a class="button" id="next">→</a>
            </div>
          </div>
          <div class="daysName">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sut</div>
          <div>Sun</div>
        </div>

        <div id="days">
          <div class="day other"></div>
          <div class="day">1</div>
          <div class="day">2</div>
          <div class="day">3</div>
          <div class="day">4</div>
          <div class="day">5</div>
          <div class="day">6</div>
          <div class="day">7</div>
          <div class="day">8</div>
          <div class="day">9</div>
          <div class="day">10</div>
          <div class="day">11</div>
          <div class="day">12</div>
          <div class="day">13</div>
          <div class="day">14</div>
          <div class="day">15</div>
          <div class="day">16</div>
          <div class="day">17</div>
          <div class="day">18</div>
          <div class="day">19</div>
          <div class="day">20</div>
          <div class="day">21</div>
          <div class="day">22</div>
          <div class="day today">23</div>
          <div class="day">24</div>
          <div class="day">25</div>
          <div class="day">26</div>
          <div class="day">27</div>
          <div class="day">28</div>
          <div class="day">29</div>
          <div class="day">30</div>
          <div class="day">31</div>
        </div>
      </div>
      ${this.model.items.map((item) => item.text)}
    </div>`
  }
}

