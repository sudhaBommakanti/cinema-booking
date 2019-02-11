class Auditorium extends Component {
    constructor(props) {
        super(props);
        this.seats = [];
        let row = 1;
        let seatNum = 1;
        for (let numberOfSeatsInTheRow of this.seatsPerRow) {
            let seatsInRow = [];
            while (seatsInRow.length < numberOfSeatsInTheRow) {
                seatsInRow.push(new Seat({row, seatNum}));
                seatNum++;
            }
            this.seats.push(seatsInRow);
            row++;
        } 
    }
}
