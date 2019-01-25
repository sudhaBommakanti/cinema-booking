async function runTests() {

  // Create a new author
  let raymond = new Author({
    name: 'Raymond Chandler',
    description: 'Chandler was one of the fathers of crime noire.'
  });

  // Save
  console.log(await raymond.save());

  // Update an existing author
  let shakespeare = await Author.find(`.findOne({name: /Shake/})`);
  shakespeare.description += ' And even greater...';
  console.log(await shakespeare.save());

  // Find and then delete Samuel Beckett
  let samuel = await Author.find(`.findOne({name: /Beckett/})`);
  if (samuel) {
    console.log(await samuel.delete());
  }
}

/* runTests(); */

async function runMovieTest() {
  let showtime = new Showtime({
    audiotorium: "Stora Salongen",
    film: "The Wife",
    date: "2019-01-23",
    time: "15:30"
  });

  // Save
  console.log(await ticketPrice.save());
}

}

runMovieTest();