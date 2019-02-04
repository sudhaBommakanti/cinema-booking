class Booking extends Component {
  constructor(props) {
    super(props)
    this.addRoute('/showtime', 'Showtimes');
    this.addEvents({ 
        'click': 'chooseMe',
        'click .selectable' : 'clicked'    
    });
    this.movies = [];

    this.getShowtimes();
  }

  chooseMe() {
    App.currentShowtime = this; // Now change route to the correct auditorium
    history.pushState(null, null, '/auditoriums/' + this.auditorium)
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

  clicked(e){
    
      let test;
      test = $(e.currentTarget).attr('data-id');
      console.log(test)
  }
  
}
