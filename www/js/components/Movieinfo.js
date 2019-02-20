class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.addRoute(/film\/(.*)/);
        this.addEvents({
            'click .buttons-div': 'openTrailerModal'
        });
    }

    /**
    *
    * Get the id from the route and get the movie with that id
    *
    */

    async mount() {
        let id = this.routeParts[0];
        this.movie = await Movie.find(id);
        this.render();
    }

    openTrailerModal() {
        $(this.baseEl)
            .find('#modal-trailer')
            .modal({ show: true });
    }
}