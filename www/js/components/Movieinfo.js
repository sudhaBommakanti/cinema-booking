class Movieinfo extends Component {
    constructor() {
        super();
        this.addRoute('/film', 'Film');
        this.addEvents({ 'click .movie-title': 'showMovieInfo' });
    }

    showMovieInfo() {}
}