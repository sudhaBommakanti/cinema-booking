class Modal extends Component {
  constructor(props){
    super(props);
  //  this.bookingInfo = {
    //  showTimeDetails: {}, 
   //   auditorium: {}
    //}
  }

  get seatsText(){
    return this.seats.join(',');
  }

  /*set booking(bookingInfo){
    this.bookingInfo = bookingInfo;
  }

  get booking(){
    console.log('this.bookingInfo', this.bookingInfo);
    return this.bookingInfo;
  }*/

}