 /* Skriv din kod här */

// Min URL som behövs
const URL = 'https://restcountries.eu/rest/v2/all';

// Fetch metod
fetch(URL).then(
    function(response){
        // errorhantering
        if(response.status === 404){
            throw 'Not found';
        }
        else{
            return response.json();
        }
    }
).then(
    function(data){
       console.log(data);

       // Skpar en tom array
        let countryArray = [];

        // Skapar en for-loop för att välja ut 3 random länder
        for(let i = 0; i < 3; i++){
            let rand = Math.floor(Math.random()* data.length);

            // Pushar in datan till vår tomma array
            countryArray.push(
                new Country(data[rand].flag, data[rand].name, data[rand].timezones[0])
            );
        }

        console.log(countryArray);

        // Skapar en for of loop och kallar på vår instans funktion
        for(c of countryArray){
            c.countryFlag();
            c.countryName();
            c.countryTimezone();
        }
    }
).catch(
    function(error){
        console.log(error);
    }
)

// Constructorn med 3 parametrar och 3 egenskaper
function Country(_flagUrl, _name, _timezone){
    this.flagUrl = _flagUrl;
    this.name = _name;
    this.timezone = _timezone;
}


// Skapar en instans-metod till flagUrl
Country.prototype.countryFlag = function(){
    // Hämtar body-elementet och skapar ett img-element
    let body = document.querySelector('body');
    let img = document.createElement('img');
    // Tilldelar img flagUrl-datan
    img.src = this.flagUrl;
    // Tilldelar hur stor bilden ska vara
    img.style.width = '15rem';
    // Appendar img till body
    body.appendChild(img);
}

// Skapar en instans-metod till name-data
Country.prototype.countryName = function(){
    // Hämtar body-elementet och skapar ett h1-element
    let body = document.querySelector('body');
    let h1 = document.createElement('h1');
    // Tilldelar h1-elementet datan för name.
    h1.innerText = this.name;
    // Väljer hur stor texten ska vara
    h1.style.fontSize = '2rem';
    // Appendar h1 till body
    body.appendChild(h1);
}

// Skapar en instans-metod till timezone-data
Country.prototype.countryTimezone = function(){
    // Skapar en variabel och tilldelar det inbyggda objektet Date, som innehållar datum och tid
    let date = new Date();
    // Hämtar body från HTML och skapar ett h3-element
    let body = document.querySelector('body');
    let timeText = document.createElement('h3');
    // Skapar en variabel och ger den värdet av timezone-data
    let timeZone = this.timezone;
    // Skapar en variabel för en del av timeZone-string och konverterar till heltal
    let timeZoneHours = parseInt(timeZone.substr(3, 3));
    // Skapar en variabel för en del av timeZone-string och konverterar till heltal
    let timeZoneMinutes = parseInt(timeZone.substr(7, 2));
    // Skapar variablar och hämtar aktuell UTC-tid för timmar och minuter
    let UTCHour = date.getUTCHours();
    let UTCMinutes = date.getUTCMinutes();
    // Lägger till text som innehåller aktuell UTC till UTC-tidzon
    timeText.innerText = `${UTCHour + timeZoneHours}:${UTCMinutes + timeZoneMinutes}`;
    // Appendar timeText till body
    body.appendChild(timeText);
}







    