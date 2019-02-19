class MyPage extends Component {
    constructor(props) {
        super(props);
        this.addRoute('/mybookings', 'My Bookings');
        this.bookings = [];
        this.bookingHistory = "";
       
        this.getBookingHistory();
    }

    
    async getBookingHistory() {
        let user = await Login.find();
        this.bookings = await Booking.find(`.find({userId: "${user._id}"})`);
        for(let booking of this.bookings){
            this.bookingNum = booking.bookingNum;
            console.log(this.bookingNum);
            this.bookingHistory += `<h1>${this.bookingNum}</h1>`;
            
        }
       
        
        this.render();
                
    }
        
        
}

    

