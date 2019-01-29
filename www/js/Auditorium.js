class Auditorium extends REST {
    constructor() {
        super();
        this.getShowtimes();
    }
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

    // async getAuditoriums() {
    //     let auditoriums = await $.ajax({
    //         url: '/json/auditoriums',
    //         method: 'GET',
    //         contentType: 'application.json'
    //     }).catch(err => console.error(err));
    //     console.log(auditoriums);
    // }

    // async getAuds() {
    //     const auditoriums = await fetch('http://localhost:3000/json/auditoriums', {
    //         method: 'GET'
    //     });
    //     this.auditoriums = await auditoriums.json();
    //     this.render();
    // }

    async getShowtimes() {
        let a = await $.ajax({
            url: '/json/auditoriums',
            method: 'GET',
            contentType: 'application/json'
        }).catch(err => console.error(err));
        console.log(a);

        return a;
    }
}