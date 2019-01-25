let time = new Showtime();

//time.createShowtimes();

async function testTicketprice(){
  // Create a new ticketprice
  let ticketPrice = new Ticketprice({
    normalFare: 85,
    pensioners: 75,
    children: 65
  });

  // Save
  console.log(await ticketPrice.save());
}

testTicketprice();
