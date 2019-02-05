class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.movie = new Movie();
        this.getThemDamnMovies();
    }

    async getThemDamnMovies() {
        this.movies = await Movie.find();
    }
}