class Booking extends Component {
  constructor(props) {
    super(props)
    this.headline = true;
    this.clickedShowing;
    this.addRoute('/showtime', 'Showtimes');
    this.addEvents({ 
        'click': 'chooseMe',
        'click .headline' : 'hideHeadline',    
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
    
      let idValue;
      idValue = $(e.currentTarget).attr('data-id');
      console.log(idValue)
      return idValue;
  }

  hideHeadline(e){
    this.headline = false;
    this.clickedShowing = e.currentTarget.parentNode.outerHTML;
    this.render();
  }
  
}
