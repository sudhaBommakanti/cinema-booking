async function runMovieTest() {
  let showtime = new Showtime({
    auditorium: "Stora Salongen",
    film: "The Wife",
    date: "2019-01-23",
    time: "15:30"
  });

  console.log(await showtime.save());

}