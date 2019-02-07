class Showing extends Component {
    constructor(props) {
        super(props);
        this.addRoute((/showing\/(.*)/));
        this.id = window.location.pathname.split('/')[2];
        this.getShowing(this.id);
    }

   async getShowing(id) {
        this.showing = await Showtime.find(id);
        console.log(this.showing);
        this.getAuditorium(this.showing.auditorium);

    }

    async getAuditorium(showtimeAudiId) {

        this.auditorium = await Auditorium.find(showtimeAudiId);
        console.log(this.auditorium);
    }

}