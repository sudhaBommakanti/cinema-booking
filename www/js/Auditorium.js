class Auditorium extends REST {
    static async generateAuditorium() {
        // Här skapar jag en ny instans av klassen Auditorium.
        // Där skickas in ett objekt i dess konstruktor. Konstruktorn i new Auditorium är detta "()"

        await smallAuditorium.save();

        // här invokar/kallar jag på funktionen jag skapade nedan som tar in
        // smallAuditorium-objektet ovan.

        this.getSeats(smallAuditorium);
        console.log(await smallAuditorium.save());
        // console.log(await bigAuditorium.save());
        // console.log(await vipAuditorium.save());
    }

    // skapar en funktion som tar en inparameter.
    // Jag behöver inparametern för att få tillgång till smallAuditorium-objektet i funktionen ovan.
    // jag kollar så att salongens namn är === lilla salongen
    // loopar genom smallAuditorium.seats som är en array med 6 objekt som i sin tur har arrays med
    // seats. Jag appendar alla seats för varje row

    static getSeats(auditorium) {
        $('<h2>')
            .text(auditorium.name)
            .before($('#row-wrapper'));

        for (let row = 0; row < auditorium.seatsPerRow.length; row++) {
            let rowTag = $('<div class="seat-row">').appendTo($('#row-wrapper'));

            for (let seat = 0; seat < row; seat++) {
                rowTag.append(`<div class="seat" data-num="${seat}">`);
            }
        }
    }
}

Auditorium.generateAuditorium();