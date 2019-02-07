class BookingSystem extends Component {
    constructor(props) {
        super(props);
        this.auditoriumsShown = false;
        this.addRoute('/showtime', 'Platser');
        this.auditoriums = [];
        this.getAuditoriums();
    }

    async getAuditoriums() {
        App.auditoriums = await Auditorium.find();
        this.render();
    }
}
