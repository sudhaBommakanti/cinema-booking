class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.addRoute(/film\/(.*)/);
        this.addEvents({
            'click .buttons-div': 'openTrailerModal'
        });
    }

    async mount() {
        // Get the id from the route
        let id = this.routeParts[0];
        // Get the movie with that id
        this.movie = await Movie.find(id);
        this.render();
    }

    openTrailerModal() {
        console.log('hehahaehah');
        $(this.baseEl)
            .find('#modal-trailer')
            .modal({ show: true });
        console.log('hej');
    }
}