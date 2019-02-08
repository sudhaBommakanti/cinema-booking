class Showing extends Component {
    constructor(props) {
        super(props);
        this.addRoute((/showing\/(.*)/));
        this.countAdult = 0;
        this.countKid = 0;
        this.countRetired = 0;
        this.addEvents({
            'click .add-adult': 'addOne',
            'click .add-kid': 'addOne',
            'click .add-retired': 'addOne',
            'click .remove-adult': 'removeOne',
            'click .remove-kid': 'removeOne',
            'click .remove-retired': 'removeOne'
        });
        
        this.id = window.location.pathname.split('/')[2];
        this.getShowing(this.id);
    }
    addOne(e) {
      if(e.target.className.includes('add-adult')) {
                this.countAdult++;
                this.render();
        } else if (e.target.className.includes('add-kid')) {
                this.countKid++;
                this.render();
        } else if (e.target.className.includes('add-retired')) {
                this.countRetired++;
                this.render();
        }
    }
    removeOne(e) {
        if(e.target.className.includes('remove-adult')) {
            this.countAdult--;
            this.render();
    } else if (e.target.className.includes('remove-kid')) {
            this.countKid--;
            this.render();
    } else if (e.target.className.includes('remove-retired')) {
            this.countRetired--;
            this.render();
    }
    }


    async getShowing(id) {
        this.showing = await Showtime.find(id);
        this.render();
        console.log(this.showing);
        this.getAuditorium(this.showing.auditorium);

    }

    async getAuditorium(showtimeAudiId) {
        this.auditorium = await Auditorium.find(showtimeAudiId);
        this.render();
    }

}