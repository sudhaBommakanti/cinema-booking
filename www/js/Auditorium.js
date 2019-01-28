class Auditorium extends REST {
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