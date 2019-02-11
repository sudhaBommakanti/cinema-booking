class Auditorium extends Component {
    constructor(props) {
        super(props);
        this.seats = [];
        for (let numberOfSeatsInTheRow of this.seatsPerRow) {
            let seatsInRow = [];
            while (seatsInRow.length < numberOfSeatsInTheRow) {
                seatsInRow.push(new Seat());
            }
            this.seats.push(seatsInRow);
        
        } 
        
    }
}
