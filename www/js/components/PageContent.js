class PageContent extends Component {
    constructor() {
        super();
        this.startPage = new StartPage();
        this.auditorium = new Auditorium();
        this.login = new Login();
        this.showtime = new Showtime();
        this.bookingsystem = new BookingSystem();
    }
}