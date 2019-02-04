class Auditorium extends Component {
    constructor(props) {
        super(props);
    }
}

/* Fanny och hamids gamla kod ************************************************************************************

for (var audio in auditoriums) {
           // auditoriums[audio] <-- == varje objekt som i sig innehåller allt;
           // Pusha hela objekt till arrayen
           this.auditoriums.push(auditoriums[audio]);
       }
       // för att köra igenom ändringarna på klassen
       this.render();
   }

   */

/*

fanny() {
        let str = '';
        // loopar this.auditoriums
        // du “appendar” till str med +=
        // SEN returnerar du str
        for (let sal of this.auditoriums) {
            str += '<h1>' + sal.name + '</h1>';
        }
        // och str får du ut på skärmen geno att kalla på metoden som du gjort i templaten
        return str;
    }
**********************************************************************************************************************/