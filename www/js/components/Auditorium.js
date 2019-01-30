class Auditorium extends Component {
    constructor() {
        super();
        this.addRoute('/auditoriums', 'Välj plats!');
        this.getAuditoriums();
    }

    async getAuditoriums() {
        let auditoriums = await $.ajax({
            url: '/json/auditoriums',
            method: 'GET',
            contentType: 'application/json'
        }).catch(err => console.error(err));
        $('h2').text(auditoriums[1].name);
        console.log(auditoriums[1].name);
        for (let row = 0; row < auditoriums[1].seatsPerRow.length; row++) {
            // console.log(row);
            let rowTag = $('<div class="seat-row">').appendTo($('#row-wrapper'));
            // console.log(rowTag);
            for (let seat = 0; seat < auditoriums[1].seatsPerRow[row]; seat++) {
                rowTag.append(
                    `<span class="seat" data-num="${seat}">` + seat + '</span>'
                );
                // console.log(rowTag);
            }
        }
        return auditoriums;
    }
}