class Auditorium extends REST {
    static async generateAuditorium() {
        let smallAuditorium = new Auditorium({
            name: 'Lilla salongen',
            seatsPerRow: [
                { row1: [6] },
                { row2: [8] },
                { row3: [9] },
                { row4: [10] },
                { row5: [10] },
                { row6: [12] }
            ]
        });

        let bigAuditorium = new Auditorium({
            name: 'Stora salongen',
            seatsPerRow: [8, 9, 10, 10, 10, 10, 12, 12]
        });

        let vipAuditorium = new Auditorium({
            name: 'VIP salongen',
            seatsPerRow: [3, 4, 5]
        });

        console.log(await smallAuditorium.save());
        console.log(await bigAuditorium.save());
        console.log(await vipAuditorium.save());
    }
}

