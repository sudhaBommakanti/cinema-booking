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

  /**
  *
  * Function that counts adult, kid and retired together.
  *
  */

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
    return user._id;
  }

  /**
  *
  * Function that runs when u click on adding a ticket for adult, kid or retired.
  *
  */

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

  /**
  *
  * Function that removes a ticket on kid adult or retired when clicked.
  *
  */

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

  /**
  *
  * Function that counts the total prize of your booking
  *
  */


  countTotalPrice() {
    let fullPriceAdult = this.countAdult * this.ticketPriceAdult;
    let fullPriceChild = this.countKid * this.ticketPriceKid;
    let fullPriceOld = this.countRetired * this.ticketPriceSenior;
    let totalPrice = fullPriceAdult + fullPriceChild + fullPriceOld;
    return totalPrice;
  }


  /**
  *
  * Function that removes the booked seat.
  *
  */

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


  /**
  *
  * Function that gets the Showtime id.
  *
  */

  async getShowtime(id) {
    this.showing = await Showtime.find(id);
    this.getAuditorium(this.showing.auditorium);
  }

  async getAuditorium(showtimeAudiId) {
    if (!showtimeAudiId) {
      return
    }
    this.auditorium = await Auditorium.find(showtimeAudiId);

    /**
    *
    * Takes all the bookings 
    *
    */
    let allBookings = await Booking.find(`.find({showTimeDetails: "${this.id}"})`);

    /**
    *
    * Looping busy seats and store these so we can mark which ones that are taken.
    *
    */

    for (const booking of allBookings) {
      let seats = booking.seats;

      for (const seatNum of seats) {
        this.takenSeats.push(Number(seatNum));
      }
    }

    this.auditorium.bestSeats = this.auditorium.bestSeats.filter((seatNumber) => {
      return !this.takenSeats.includes(seatNumber);

    })

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
    this.auditorium.currentShowing = this;
    this.render();
  }

  /**
  *
  * Do a find on all bookings for that showtime. 
  *
  */

  async sendBooking() {
    let bookedSeats = [];
    let allBookings = await Booking.find(`.find({showTimeDetails: "${this.id}"})`);

    if (allBookings.length === 0) {
      this.createBooking();
    } else {
      allBookings.map(seats => bookedSeats.push(seats.seats));
      bookedSeats = bookedSeats.flat();
      for (let bookedSeat of bookedSeats) {

        for (let chosenSeat of this.chosenSeats) {
          /**
          *
          * If seat is booked send a notification to the user that the seat is already booked.
          *
          */
          if (bookedSeat == chosenSeat) {
            alert(`Alert Alert! The seat ${chosenSeat} is already booked. Please choose another seat`);
            return;
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
    let auditorium = await Auditorium.find(".findById('" + bookingInfo.showTimeDetails.auditorium + "').exec()");
    let modalData = {
      bookingNum: bookingInfo.bookingNum,
      seats: bookingInfo.seats,
      auditorium: auditorium.name,
      totalPrice: bookingInfo.totalPrice,
      film: bookingInfo.showTimeDetails.film
    }

    this.modal = new Modal(modalData);
    this.render();
    $(this.baseEl).find('#bookingModal').modal({ show: true });

  }

  selectBestSeats() {
    let amount = this.countAll;
    let selected = this.auditorium.bestSeats.slice(0, amount);
    for (let number of selected) {
      this.auditorium.seatsBySeatNumber[number].toBeBooked = true;
      if (!this.chosenSeats.includes(this.auditorium.seatsBySeatNumber[number])) {
        this.chosenSeats.push(this.auditorium.seatsBySeatNumber[number]);
      }
    }

  }

}