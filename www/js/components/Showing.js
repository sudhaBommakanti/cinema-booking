class Showing extends Component {

  constructor(props) {
    super(props);
    this.modal = '';
    this.addRoute(/showing\/(.*)/);
    this.addEvents({
      'click .add-one': 'addOne',
      'click .remove-one': 'removeOne',
      'click .bookButton': 'sendBooking',
      'mouseenter .seat': 'mouseEnterSeat',
      'mouseleave .seat': 'mouseLeaveSeat',
      'click .individualSeats': 'individualTrueOrFalse'
    });
    this.countAdult = 0;
    this.countKid = 0;
    this.countRetired = 0;
    this.ticketPriceAdult = 85;
    this.ticketPriceKid = 65;
    this.ticketPriceSenior = 75;
    this.bookButton = false;
    this.availableSeats;
    this.chosenSeats = [];
    this.takenSeats = [];
  }

  mount() {
    this.id = this.routeParts[0];
    this.getShowtime(this.id);
  }

  get countAll() {
    return this.countAdult + this.countKid + this.countRetired;
  }

  individualTrueOrFalse() {
    this.auditorium.individual = !this.auditorium.individual ? true : false;
  }

  mouseEnterSeat(e, leave = false) {
    let me = $(e.currentTarget);
    let seats = $('.seat');
    let myIndex = seats.index(me);
    if (!this.auditorium.individual) {
      if (this.countAll === 0) { return; }
      for (let i = myIndex; i < myIndex + this.countAll; i++) {
        seats.eq(i)[leave ? 'removeClass' : 'addClass']('hover');
      }
    }
    else if (this.auditorium.individual) {
      if (this.countAll === 0) { return; }
      seats.eq(myIndex)[leave ? 'removeClass' : 'addClass']('hover');
    }
  }

  mouseLeaveSeat(e) {
    this.mouseEnterSeat(e, true);
  }

  async getUserId() {
    let user = await Login.find();
    console.log(user);
    return user._id;
  }

  addOne(e) {
    if (this.countAdult + this.countKid + this.countRetired >= 8) {
      alert('You can not choose more than 8 tickets');
      return;
    }
    if (e.target.className.includes('add-adult')) {
      this.countAdult++;
    } else if (e.target.className.includes('add-kid')) {
      this.countKid++;
    } else if (e.target.className.includes('add-retired')) {
      this.countRetired++;
    }
    if (this.countAll > 0) {
      this.bookButton = true;
    }
    this.selectBestSeats()
    this.render();
  }

  removeOne(e) {
    if (this.countAll <= 0) {
      alert('You shoud choose one ticket');
      return;
    }
    if (e.target.className.includes('remove-adult') && this.countAdult > 0) {
      this.countAdult--;
      this.removeBookedSeat();
    } else if (e.target.className.includes('remove-kid') && this.countKid > 0) {
      this.countKid--;
      this.removeBookedSeat();
    } else if (
      e.target.className.includes('remove-retired') &&
      this.countRetired > 0
    ) {
      this.countRetired--;
      this.removeBookedSeat();
    }
    if (this.countAll === 0) {
      this.bookButton = false;
    }
    this.render();
  }

  countTotalPrice() {
    let fullPriceAdult = this.countAdult * this.ticketPriceAdult;
    let fullPriceChild = this.countKid * this.ticketPriceKid;
    let fullPriceOld = this.countRetired * this.ticketPriceSenior;
    let totalPrice = fullPriceAdult + fullPriceChild + fullPriceOld;
    return totalPrice;
  }

  removeBookedSeat() {
    for (let row = 0; row < this.availableSeats.length; row++) {
      for (let seat = 0; seat < this.availableSeats[row].length; seat++) {
        if (this.availableSeats[row][seat].toBeBooked) {
          this.availableSeats[row][seat].toBeBooked = false;
          this.availableSeats[row][seat].render();
          this.chosenSeats.pop();
          return;
        }
      }
    }
  }

  async getShowtime(id) {
    this.showing = await Showtime.find(id);
    this.render();
    this.getAuditorium(this.showing.auditorium);
  }

  async getAuditorium(showtimeAudiId) {
    this.auditorium = await Auditorium.find(showtimeAudiId);

    // Ta tag i alla bokningar
    let allBookings = await Booking.find(`.find({showTimeDetails: "${this.id}"})`);
    console.log(this)
    console.log(this._id)
    console.log(this.id);
    console.log(allBookings);
    // Loopa upptagna säten och lagra dessa för att sedan kunna markera vilka som är upptagna
    for (const booking of allBookings) {
      let seats = booking.seats;

      for (const seatNum of seats) {
        this.takenSeats.push(Number(seatNum));
      }
    }

    console.log("taken seats", this.takenSeats)
    //this.bestSeats = this.auditorium.bestSeats.slice();
    this.auditorium.bestSeats = this.auditorium.bestSeats.filter((seatNumber) => {
      return !this.takenSeats.includes(seatNumber);

    })
    console.log("bestseat", this.auditorium.bestSeats)
    
    for (const seatRow of this.auditorium.seats) {
      for (const seat of seatRow) {
        if (this.takenSeats.indexOf(seat.seatNum) == -1) {
          continue;
        } else {
          seat.booked = true;
        }
      }
    }

    this.availableSeats = this.auditorium.seats;
    // add a method to the auditorium so that i knows "countAll"
    this.auditorium.currentShowing = this;
    this.render();
  }

  async sendBooking() {
    //Gör en find på alla bokningar för denna visning.
    let bookedSeats = [];
    let allBookings = await Booking.find(`.find({showTimeDetails: "${this.id}"})`);

    if (allBookings.length === 0) {
      // Gör bokning
      this.createBooking();
    } else {
      //Hämta alla bokningars säten och spara i en array
      allBookings.map(seats => bookedSeats.push(seats.seats));
      bookedSeats = bookedSeats.flat();
      console.log('bookedSeats', bookedSeats);
      //Loopa alla bokade säten från bokingarna och jämför med valda säten för en bokning
      for (let bookedSeat of bookedSeats) {

        for (let chosenSeat of this.chosenSeats) {
          //OM sätet redan är bokat skicka tillbaka 'tyvärr sätena är redan bokade'
          if (bookedSeat == chosenSeat) {
            console.log('HEEEEEEEEJ');
            alert(`Alert Alert! The seat ${chosenSeat} is already booked. Please choose another seat`);
            return;
            //Välj nya säten
          }
          else {
            this.createBooking();
            return;
          }
        }
      }
    }
  }

  async createBooking() {
    let userId = await this.getUserId();
    const booking = await new Booking({
      "showTimeDetails": this.id,
      "userId": userId,
      "seats": this.chosenSeats.map(seat => seat.seatNum),
      "totalPrice": this.countTotalPrice()
    });
    let bookingInfo = await booking.save();
  

    bookingInfo = await Booking.find(".findById('" + bookingInfo._id + "').populate('showTimeDetails').exec()");
    console.log(bookingInfo);
    let auditorium = await Auditorium.find(".findById('" + bookingInfo.showTimeDetails.auditorium + "').exec()");
    console.log(bookingInfo, auditorium);
    let modalData = {
      bookingNum: bookingInfo.bookingNum,
      seats: bookingInfo.seats,
      auditorium: auditorium.name,
      totalPrice: bookingInfo.totalPrice,
      film: bookingInfo.showTimeDetails.film
    }
    console.log('modalData', modalData);
    this.modal = new Modal(modalData);
    console.log(this.modal)
    this.render();
    $(this.baseEl).find('#bookingModal').modal({ show: true });

  }

  selectBestSeats() {
    //this.auditorium.seatsBySeatNumber[5].toBeBooked = true;
    let amount = this.countAll;
    let selected = this.auditorium.bestSeats.slice(0, amount);
    console.log(amount)
    //console.log(selected)
    for (let number of selected) {
      this.auditorium.seatsBySeatNumber[number].toBeBooked = true;
      if(!this.chosenSeats.includes(this.auditorium.seatsBySeatNumber[number])){
        this.chosenSeats.push(this.auditorium.seatsBySeatNumber[number]);
      }
    }

  }

}