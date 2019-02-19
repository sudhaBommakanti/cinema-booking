class Auditorium extends Component {
  constructor(props) {
    super(props);
    this.addEvents({
      'click .seat': 'seatClick'
    });
    this.seats = [];
    this.seatsBySeatNumber = {};
    let rowIndex = 0;
    let row = 1;
    let seatNum = 1;
    this.selectedSeats = [];

    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = new Seat({ row, seatNum });
        seatsInRow.push(seat);
        this.seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      this.seats.push(seatsInRow);
      //Sort the seat numbers in a row from high to low
      this.seats[rowIndex].sort((a, b) => b.seatNum - a.seatNum);
      rowIndex++;
      row++;
    }
  }

  seatClick(e) {
    if (e.currentTarget.classList.contains('alreadyBooked')) {
      return;
    }
    while (this.currentShowing.chosenSeats.length) {
      let seat = this.currentShowing.chosenSeats.pop();
      seat.toBeBooked = false;
      seat.render();
    }
    let seats = $('.seat');
    let myIndex = seats.index(e.currentTarget);
    for (let i = myIndex; i < myIndex + this.currentShowing.countAll; i++) {
      let seat = this.seatsBySeatNumber[seats.eq(i).attr('data-seat')];
      seat.toBeBooked = seat.toBeBooked ? false : true;
      this.currentShowing.chosenSeats.push(seat);
      seat.render();
    }
  }
}
