import { Component, t } from '../framework';
//import Datepickk from '../../node_modules/datepickk/dist/datepickk';



export default class Calendar extends Component {
  constructor(data) {
    super(data);

    this.datepicker = new Datepickk();
    this.datepicker.container = document.querySelector('#datepicker');
    this.datepicker.inline = true;
    this.datepicker.range = true;
    this.datepicker.weekStart = 1;
    
    
  }

  onComponentMount = () => {
    console.log('calendar is mounted now!');
  }
  
  
  render() {
    return t`
      <div>
        <div id="datepicker"></div>
            
            ${this.datepicker.show()}

      </div>
    `
  }
}