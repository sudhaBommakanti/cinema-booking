class Seat extends Component {
  constructor(props) {
    super();
    this.row = props.row;
    this.seatNum = props.seatNum
    this.booked = false;
  }
}