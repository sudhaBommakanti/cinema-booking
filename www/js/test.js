function createShowtimes() {
  for (let i = 0; i < 84; i++) {
    let movies = ["The Greatest Showman", "Bird Box", "A Star Is Born", "Me Before You", "Armageddon"];
    let auditorium = ["VIP Salongen", "Stora Salongen", "Lilla Salongen"];
    let time = {
      "auditorium": auditorium.splice(Math.floor(Math.random() * auditorium.length), 1),
      "film": movies.splice(Math.floor(Math.random() * movies.length), 1),
      "date": new Date(Date.now() + 24 * 60 * 60 * 1000),
      "time": 17 + Math.floor(Math.random() * 3) + ':' + (Math.round(Math.random() < 0.5 ? 00 : 30))
    }
    console.log(await time);
  }
}