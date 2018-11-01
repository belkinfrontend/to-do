import { Component, t } from '../framework';

export default class Calendar extends Component {
  constructor(data) {
    super(data);
  }

  onComponentMount = () => {
    console.log('calendar is mounted now!');
  }

  render() {
    return t`
      <div class="calendar">
        ${this.model.name}
      </div>
    `
  }
}