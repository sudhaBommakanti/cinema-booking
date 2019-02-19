class MyPage extends Component {
    constructor(props) {
        super(props);
        this.addRoute('/mybookings', 'My Bookings');
        this.bookings = [];
        this.tableHead = "";
        this.bookingHistory = "";
        this.getBookingHistory();
        this.getCurrentBooking();
        this.bookingInfo = 0;
        this.rowNum = 0;
        this.str = "";

    }

    async getBookingHistory() {
        let user = await Login.find();
        this.bookings = await Booking.find(`.find({userId: "${user._id}"})`);
        // console.log(this.bookings.showTimeDetails);
        

        console.log(this.bookings);
        this.bookingHistory = `<table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">BookingNum</th>
                        <th scope = "col">Auditorium</th>
                        <th scope = "col">Movie Name</th>
                        <th scope = "col">Date</th>
                        <th scope = "col">Time</th>
                        <th scope="col">ShowTimeDetails</th>
                        <th scope="col">Seats</th>
                        <th scope="col">Userid</th>
                        <th scope="col">totalPrice</th>
                    </tr>
                </thead>
                <tbody>`;

        for (let booking of this.bookings) {
            
            this.rowNum++;

            let bookingNum = booking.bookingNum;
            console.log(bookingNum);

            let showTimeDetails = booking.showTimeDetails;
            console.log(showTimeDetails);
            
            let seats = booking.seats;
            console.log(seats);
            
            let userID = booking.userId;
            console.log(userID);

            let totalPrice = booking.totalPrice;
            console.log(totalPrice);

            this.bookingHistory +=
                    `<tr>
                        <th scope="row">${this.rowNum}</th> 
                        <td>${bookingNum}</td>
                        <td>${bookingNum}</td>
                        <td>${bookingNum}</td>
                        <td>${bookingNum}</td>
                        <td>${bookingNum}</td>
                        <td>${showTimeDetails}</td>
                        <td>${seats.join(",")}</td>
                        <td>${userID}</td>
                        <td>${totalPrice}</td>
                    </tr>`;
        }
        this.bookingHistory += `
                </tbody>
            </table>`;

        this.render();
    }

    async getCurrentBooking() {
        let user = await Login.find();
        this.bookings = await Booking.find(`.find({userId: "${user._id}"})`);
        //let currentDate = 0;
        
        //let bookingDate = new Date(booking.date); 
        for(let booking of this.bookings) {
            var today = new Date();
            var bookingDate = booking.date;
            if(today > bookingDate) {
               
            }
            else {
                
            }
            console.log("HEJJJJ");
        }
        this.render();
    }
    
}
