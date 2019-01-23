class Movie extends REST { 
    static async generateMovies(){
        let movieOne = new Movie({
            title: "The Greatest Showman",
            productionCountries: ["USA"],
            productionYear: 2017,
            length: 105,
            genre: "Drama",
            distributor: "Twentith Century Fox",
            language: "English",
            subtitles: "Swedish",
            director: "Michael Gracey",
            actors: ["Hugh Jackman", "Michelle Williams", "Zac Efron", "Rebecca Ferguson"],
            description: "Firar födseln av show buisness och berättar om en visionär som kom från ingenting till att skapa spektakulära fenomen och bli världskänd",
            images: [],
            youtubeTrailers: [],
            reviews: [{Source: "DN.se", Quote: "Fantastisk!", Stars: 4, Max: 5}]
        });

        let movieTwo = new Movie({
            title: "Bird Box",
            productionCountries: ["USA"],
            productionYear: 2018,
            length: 124,
            genre: "Horror",
            distributor: "Netflix",
            language: "English",
            subtitles: "Swedish",
            director: "Susanne Bier",
            actors: ["Sandra Bullock", "Trevante Rhodes", "John Malkovich", "Sarah Paulson", "Jacki Weaver"],
            description: "En mamma och hennes två barn försöker hitta säkerhet när något ont drabbar folk.",
            images: [],
            youtubeTrailers: [],
            reviews: [{Source: "Sydsvenskan", Quote: "Sandra Bullock is the shit!", Stars: 5, Max: 5},
                      {Source: "Svenska Dagbladet", Qoute: "Wow!!", Stars: 4 , Max: 5}]
        });

        let movieThree = new Movie({
            title: "A Star is born",
            productionCountries: ["USA"],
            productionYear: 2018,
            length: 136,
            genre: "Romance",
            distributor: "Warner Bros",
            language: "English",
            subtitles: "Swedish",
            director: "Bradley Cooper",
            actors: ["Bradley Cooper", "Lady Gaga", "Sam Elliott", "Andrew Dice Clay"],
            description: "En musiker hjälper en ung sångare hitta berömmelse.",
            images: [],
            youtubeTrailers: [],
            reviews: [{Source: "Aftonbladet", Quote: "Bradley does it again!", Stars: 4, Max: 5 }]
        });

        let movieFour = new Movie ({
            title: "Me before you",
            productionCountries: ["USA", "United Kingdom"],
            productionYear: 2016,
            length: 106,
            genre: "Romance",
            distributor: "Metro-Goldwyn-Mayer",
            language: "English",
            subtitles: "Swedish",
            director: "Thea Sharrock",
            actors: ["Sam Claflin", "Vanessa Kirby", "Emilia Clarke"],
            description: "En tjej i en liten stad formar ett speciellt förhållande med en paralyserad man hon tar hand om.",
            images: [],
            youtubeTrailers: [],
            reviews: [{Source: "Expressen", Quote: "Bra trevlg film!", Stars: 4, Max: 5 }]

        })

        let movieFive = new Movie ({
            title: "Armageddon",
            productionCountries: ["USA"],
            productionYear: 1998,
            length: 151,
            genre: "Action",
            distributor: "Touchstone Pictures",
            language: "English",
            subtitles: "Swedish",
            director: "Michael Bay",
            actors: ["Bruce Willis", "Billy Bob Thornton", "Ben Affleck", "Liv Tyler", "Steve Buscemi", "Peter Stormare"],
            description: "Brave men, women and a crazy russian saves the world!",
            images: [],
            youtubeTrailers: [],
            reviews: [{Source: "Göteborgs Posten", Quote: "Helt fantastisk film! En klassiker!", Stars: 5, Max: 5}]


        })
        
        console.log(await movieOne.save());
        console.log(await movieTwo.save());
        console.log(await movieThree.save());
        console.log(await movieFour.save());
        console.log(await movieFive.save());
    }
}





/*
async function runMovieTest() {
    let showtime = new Showtime({
      auditorium: "Stora Salongen",
      film: "The Wife",
      date: "2019-01-23",
      time: "15:30"
    });
  
    console.log(await showtime.save());
  
  }
  */