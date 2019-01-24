class Ticket extends REST {
  async generateTicket() {
    let ticket = new Ticket({
      userNames: [String],
      showtime: [{
        type: Schema.Types.ObjectId,
        ref: 'Showtime'
      }],
      seats: [Number],
      prices: [Number]
    });
   console.log(await ticket.save());

  }
}