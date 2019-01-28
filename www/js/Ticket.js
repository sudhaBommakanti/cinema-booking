class Ticket extends REST {
  async generateTicket() {
    let ticket = new Ticket({
      userNames: [String],
      showtime: [{
        type: Schema.Types.ObjectId,
        ref: 'Showtime'
      }],
      seats: [Number],
      ticketprice: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticketprice'
      }],
    });
    console.log(await ticket.save());

  }
}