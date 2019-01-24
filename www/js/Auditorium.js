class Auditorium extends REST {
    static async generateAuditorium() {
        let smallAuditorium = new Auditorium({
            name: 'Lilla salongen',
            seatsPerRow: [6, 8, 9, 10, 10, 12]
        });

        let bigAuditorium = new Auditorium({
            name: 'Stora salongen',
            seatsPerRow: [8, 9, 10, 10, 10, 10, 12, 12]
        });

        let vipAuditorium = new Auditorium({
            name: 'VIP salongen',
            seatsPerRow: [3, 4, 5]
        });

        console.log(await auditorium.save());
    }
}

Auditorium.generateAuditorium();