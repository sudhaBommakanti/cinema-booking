class Modal extends Component {
  constructor(props) {
    super(props);
  }

  get seatsText() {
    return this.seats.join(',');
  }

}