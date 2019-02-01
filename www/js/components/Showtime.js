class Showtime extends Component {
    constructor(props){
        super(props)
        this.addRoute('/showtime', 'Showtimes');
        this.addEvents({'click' : 'chooseMe'});
    }

    chooseMe(){
        App.currentShowtime = this; // Now change route to the correct auditorium
        history.pushState(null, null, '/auditoriums/' + this.auditorium)
    }
}

/* Tomas gamla kod som kan användas: exempel 

async getShowtimes() {

        // Get all movies from DB
        this.movies = await Movie.find();

        // Add property on each movie with all showtimes for it
        for(let movie of this.movies){
            movie.showtimes = await Showtime.find(`.find({film:"${movie.title}"})`);
        }

        console.log(this.movies)

        // Rerender the view to show the data we got from the DB
        this.render();

*/