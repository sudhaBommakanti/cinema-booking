class Booking extends Component {
    constructor(props) {
            super(props)
            this.addRoute('/showtime', 'Showtimes');
            this.movies = [];
            this.getShowtimes();
        }
        /**
         *
         * Gets all the movies from the DB and popluate showtimes for them
         * Converts all showtime objects to real instances of Showtime
         * Rerender the view to show the data we got from the DB
         *
         */
    async getShowtimes() {
        this.movies = await Movie.find(`.find().populate('showtimes').exec()`);
        for (let movie of this.movies) {
            movie.showtimes = movie.showtimes.map(x => new Showtime(x));
        }

        this.render();
    }
}