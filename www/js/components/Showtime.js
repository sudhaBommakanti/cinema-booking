class Showtime extends Component {
    constructor(props) {
        super(props)
        this.addEvents({
            'click .selectable': 'showAuditorium'
        });
        this.showAudi = false;
        
    }

    async BarbieGirl(){
        this.currentAudi = Showtime.find(`.find().populate('auditorium').exec()`);
        console.log(this.currentAudi);
        return this.currentAudi;

    }

    showAuditorium() {
        this.showAudi = true;

        this.render();
    }

}