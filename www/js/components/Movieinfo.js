class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.addRoute(/film\/(.*)/);
    }

    async mount() {
        console.log('HEJ');
        // Get the id from the route
        let id = this.routeParts[0];
        // Get the movie with that id
        this.movie = await Movie.find(id);
        console.log(this.movie);
        this.render();
    }
}