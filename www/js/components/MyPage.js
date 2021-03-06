class MyPage extends Component {
	constructor(props) {
		super(props);
		this.addRoute('/mybookings', 'My Bookings');
		this.bookings = [];
		this.tableHead = "";
		this.bookingHistory = "";
		this.currentBookings = "";
		this.bookingInfo = 0;
		this.rowNum = 0;
		this.str = "";

	}


	/**
	*
	* Calling mount method when routing to My Bookings
	*
	*/

	async mount() {
		this.currentBookings = await this.getBookings();
		this.bookingHistory = await this.getBookings(true);
		this.render();
	}

	async getBookings(history) {
		let user = await Login.find();
		this.bookings = await Booking.find(`.find({userId: "${user._id}"}).populate('showTimeDetails').exec()`);

		this.bookings = this.bookings.filter((booking) => {

			let date = new Date(booking.showTimeDetails.date + " " + booking.showTimeDetails.time);
			if (date < new Date()) {
				if (history) {
					return true;
				} else {
					return false;
				}
			} else {

				if (history) {
					return false;
				} else {
					return true;
				}
			}
		})

		let bookingHistory = `<table class ="table  table-dark table-responsive">
                <thead class = "table_header">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Bokningsnummer</th>
                        <th scope = "col">Film</th>
                        <th scope = "col">Datum</th>
                        <th scope = "col">Tid</th>
                        <th scope="col">Säten</th>
                        <th scope="col">Totalpris</th>
                    </tr>
                </thead>
                <tbody>`;

		for (let booking of this.bookings) {

			this.rowNum++;
			bookingHistory +=
				`<tr>
                        <th scope="row">${this.rowNum}</th> 
                        <td>${booking.bookingNum}</td>
                        <td>${booking.showTimeDetails.film}</td>
                        <td>${booking.showTimeDetails.date}</td>
                        <td>${booking.showTimeDetails.time}</td>
                        <td>${booking.seats.join(",")}</td>
                        <td>${booking.totalPrice} kr</td>
                    </tr>`;
		}
		bookingHistory += `
                </tbody>
            </table>`;
		return bookingHistory;
	}


}
