class BookingSystem extends Component {
    constructor(props) {
        super(props);
        this.addRoute('/auditoriums', 'Platser');
        this.auditoriums = [];
        this.getAuditoriums();
    }

    async getAuditoriums() {
        this.auditoriums = await Auditorium.find();
        this.render();
    }
}