class Showing extends Component {
  constructor(props) {
    super(props);
    this.addRoute((/showing\/(.*)/));
    this.addEvents({
      'click .add-adult': 'addOne',
      'click .add-kid': 'addOne',
      'click .add-retired': 'addOne',
      'click .remove-adult': 'removeOne',
      'click .remove-kid': 'removeOne',
      'click .remove-retired': 'removeOne',
      'click .seat': 'bookSeats',
    });
    this.countAdult = 0;
    this.countKid = 0;
    this.countRetired = 0;
    this.id = window.location.pathname.split('/')[2];
    this.getShowing(this.id);
  }
  bookSeats() {
  }

  addOne(e) {
    if ((this.countAdult + this.countKid + this.countRetired) >= 8) {
      alert('You can not choose more than 8 persons')
      return;
    }
    if (e.target.className.includes('add-adult')) {
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
    if ((this.countAdult + this.countKid + this.countRetired) <= 0) {
      alert('You shoud choose one person')
      return;
    }
    if (e.target.className.includes('remove-adult') && this.countAdult > 0) {
      this.countAdult--;
      this.render();
    } else if (e.target.className.includes('remove-kid') && this.countKid > 0) {
      this.countKid--;
      this.render();
    } else if (e.target.className.includes('remove-retired') && this.countRetired > 0) {
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