class Showing extends Component {
    constructor(props) {
        super(props);
        this.addRoute(/showing\/(.*)/);
        this.addEvents({
            'click .add-one': 'addOne',
            'click .remove-one': 'removeOne',
            'click .bookButton': 'sendBooking'
        });
        this.countAdult = 0;
        this.countKid = 0;
        this.countRetired = 0;
        this.id = window.location.pathname.split('/')[2];
        this.getShowing(this.id);
        this.ticketPriceAdult = 85;
        this.ticketPriceKid = 65;
        this.ticketPriceSenior = 75;
        this.bookButton = false;
        this.availableSeats;
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
        if (this.countAdult + this.countKid + this.countRetired) {
            this.bookButton = true;
        }
        this.checkAvailableSeats();
        this.render();
    }

    removeOne(e) {
        if (this.countAdult + this.countKid + this.countRetired <= 0) {
            alert('You shoud choose one ticket');
            return;
        }
        if (e.target.className.includes('remove-adult') && this.countAdult > 0) {
            this.countAdult--;
        } else if (e.target.className.includes('remove-kid') && this.countKid > 0) {
            this.countKid--;
        } else if (
            e.target.className.includes('remove-retired') &&
            this.countRetired > 0
        ) {
            this.countRetired--;
        }
        if (this.countAdult + this.countKid + this.countRetired === 0) {
            this.bookButton = false;
        }
        this.removeBookedSeat();
        this.render();
    }

    countTotalPrice() {
        let fullPriceAdult = this.countAdult * this.ticketPriceAdult;
        let fullPriceChild = this.countKid * this.ticketPriceKid;
        let fullPriceOld = this.countRetired * this.ticketPriceSenior;
        let totalPrice = fullPriceAdult + fullPriceChild + fullPriceOld;
        return totalPrice;
    }

    checkAvailableSeats() {
        for (let row = 0; row < this.availableSeats.length; row++) {
            for (let seat = 0; seat < this.availableSeats[row].length; seat++) {
                if (!this.availableSeats[row][seat].booked) {
                    this.availableSeats[row][seat].booked = true;
                    this.availableSeats[row][seat].render();
                    return;
                }
            }
  //Loopa igenom bokningars visningar för att kolla bokade säten!!!
        }
    }

    removeBookedSeat() {
        for (let row = 0; row < this.availableSeats.length; row++) {
            for (let seat = 0; seat < this.availableSeats[row].length; seat++) {
                if (this.availableSeats[row][seat].booked) {
                    this.availableSeats[row][seat].booked = false;
                    this.availableSeats[row][seat].render();
                    return;
                }
            }
        }
    }

    // makeBookButtonActive() {
    //     if (e.target.className.includes('add-adult')) {
    //         console.log('ehj');
    //     }
    // }

    async getShowing(id) {
        this.showing = await Showtime.find(id);
        this.render();
        this.getAuditorium(this.showing.auditorium);
    }

    async getAuditorium(showtimeAudiId) {
        this.auditorium = await Auditorium.find(showtimeAudiId);
        this.availableSeats = this.auditorium.seats;
        this.render();
    }

    async sendBooking() {
        let userId = await this.getUserId();
        const booking = new Booking({
            showTimeDetails: this.id,
            seats: ['1-1'],
            userId: userId,
            totalPrice: this.countTotalPrice()
        });
        console.log(await booking.save());
    }
}