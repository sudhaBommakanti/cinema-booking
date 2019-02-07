class Booking extends Component {
  constructor(props) {
    super(props)
    this.addRoute('/showtime', 'Showtimes');
    this.movies = [];

    this.getShowtimes();
  }

  async getShowtimes() {

    // Get all movies from DB and populate showtimes for them
    this.movies = await Movie.find(`.find().populate('showtimes').exec()`);

    // Convert all showtime objects to real instances of Showtime
    for(let movie of this.movies){
        movie.showtimes = movie.showtimes.map(x => new Showtime(x));
    }

    //console.log(this.movies);

    // Rerender the view to show the data we got from the DB
    this.render();
  }
  
}
