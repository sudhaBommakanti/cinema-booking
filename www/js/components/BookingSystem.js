class BookingSystem extends Component {
    constructor(props) {
        super(props);
        this.auditoriumsShown = false;
        this.addRoute('/showtime', 'Platser');
        this.addEvents({
            'click .show-auditoriums-btn': 'showAuditoriums'
        })
        this.auditoriums = [];
        this.getAuditoriums();
    }

    showAuditoriums(){
        this.auditoriumsShown = !this.auditoriumsShown;
        this.render();
    }

    async getAuditoriums() {
        this.auditoriums = await Auditorium.find();
        this.render();
    }
}