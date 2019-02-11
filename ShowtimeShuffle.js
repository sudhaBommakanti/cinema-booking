class ShowtimeShuffle extends REST {
  async createShowtimes() {
    let date = new Date();
    let movies = ["The Greatest Showman", "Bird Box", "A Star Is Born", "Me Before You", "Armageddon"];
    let auditorium = await Auditorium.find();

    for (let i = 0; i < 84; i++) {
      if (i % 3 == 0) {
        date.setDate(date.getDate() + 1);
        movies = ["The Greatest Showman", "Bird Box", "A Star Is Born", "Me Before You", "Armageddon"];
        auditorium = await Auditorium.find();
      }

      let showtime = new Showtime({
        "auditorium": auditorium.pop()._id,
        "film": this.shuffleArr(movies).pop(),
        "date": date.toString().split(' ').slice(0, 4).join(' '),
        "time": 17 + Math.floor(Math.random() * 3) + ':' + (Math.round(Math.random() < 0.5 ? 15 : 45))
      });
      console.log(await showtime.save());
    }

  }

  shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}
