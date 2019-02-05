class Showtime extends Component {
    constructor(props) {
        super(props)
        this.addEvents({
            'click .selectable': 'showAuditorium'
        });
        this.showAudi = false;
        
    }

    showAuditorium() {
        this.showAudi = true;
        this.render();
    }

}