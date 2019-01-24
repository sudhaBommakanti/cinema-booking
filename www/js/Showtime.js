class Showtime extends REST {
  createShowtimes() {
    let date = new Date();
    for (let i = 0; i < 84; i++) {
      let movies = ["The Greatest Showman", "Bird Box", "A Star Is Born", "Me Before You", "Armageddon"];
      let auditorium = ["VIP Salongen", "Stora Salongen", "Lilla Salongen"];

      if (i % 3 == 0) {
        date.setDate(date.getDate() + 1);
      }

      let showtime = {
        "auditorium": auditorium.splice(Math.floor(Math.random() * auditorium.length), 1),
        "film": movies.splice(Math.floor(Math.random() * movies.length), 1),
        "date": date,
        "time": 17 + Math.floor(Math.random() * 3) + ':' + (Math.round(Math.random() < 0.5 ? 00 : 30))
      }
      console.log(showtime);
    }
  }
}

