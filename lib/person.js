const { dateToISOString, reverseName } = require('./util');
const laundry = require('company-laundry');

function createMainPerson(row, metadata) {
    let country_born = getCountryName(row.Nacionalidad);
    let country_residence = getCountryName(row.Pais_de_Residencia);

    let person = {
        "id": laundry.simpleName(laundry.launder(row.Nombre_corregido)),
        "name": row.Nombre_corregido,
        "classification": "owner",
        "other_names": [ { "name": row.Nombre } ],
        "national_identity": row.Nacionalidad,
        "area": [],
        "links": [{ "id": row.link }]
    };

    if(country_born) {
        person.area.push({
            "id": laundry.simpleName(laundry.cleanCountry(country_born)),
            "name": laundry.cleanCountry(country_born),
            "classification": "country",
            "subclassification": "country-born"
        })
    }
    if(country_residence) {
        person.area.push({
            "id": laundry.simpleName(laundry.cleanCountry(country_residence)),
            "name": laundry.cleanCountry(country_residence),
            "classification": "country",
            "subclassification": "country-of-residence"
        })
    }

    Object.assign(person, metadata);

    return person;
}

function isPerson(person_id, index) {
    return index.indexOf(person_id);
}

function getCountryName(string) {
    switch(string) {
        case "American":
            return "Estados Unidos";
        case "Argentine":
        case "Argentina":
            return "Argentina";
        case "Austrian":
            return "Austria";
        case "Bahamas":
            return "Bahamas";
        case "Belgium":
            return "Bélgica";
        case "Belize":
        case "Belizean":
            return "Belice";
        case "Bermuda":
            return "Bermuda";
        case "Brazil":
        case "Brazilian":
            return "Brasil";
        case "British":
            return "Reino Unido";
        case "Canada":
        case "Canadian":
            return "Canadá";
        case "Chile":
        case "Chilean":
            return "Chile";
        case "China":
            return "China";
        case "Costa Rica":
        case "Costa Rican":
            return "Costa Rica";
        case "Cuban":
            return "Cuba";
        case "Cyprus":
            return "Chipre";
        case "Dominican":
            return "República Dominicana";
        case "Dutch":
        case "Netherlands":
            return "Países Bajos";
        case "Eangland/East Yorkshire":
        case "England":
        case "England, Uk":
        case "English":
            return "Inglaterra";
        case "French":
        case "France":
            return "Francia";
        case "German":
        case "Germany":
            return "Alemania";
        case "Gibraltar":
            return "Gibraltar";
        case "Gbr":
            return "Reino Unido";
        case "Hong Kong":
            return "Hong Kong";
        case "Hungarian":
            return "Hungría";
        case "Irish":
            return "Irlanda";
        case "Italy":
        case "Italian":
            return "Italia";
        case "India":
            return "India";
        case "Israeli":
        case "Israel":
            return "Israel";
        case "Japan":
            return "Japón";
        case "Malta":
            return "Malta";
        case "Ciudad de Mexico":
        case "Mexica":
        case "Mexican":
        case "Mexican (Uk Resident)":
        case "Mexican /British":
        case "Mexican American":
        case "Mexican British":
        case "Mexican,British":
        case "Mexican/American":
        case "Mexican/British":
        case "Mexican/Italian":
        case "Mexicana":
        case "Mexicano":
        case "Mexiccan":
        case "Mexico":
        case "San Pedro Garza Garcia, Mexico":
        case "Atizapan De Zaragoza, Mexico":
        case "Atizapan de Zaragoza, Mexico":
        case "Mexican":
        case "Mexican Federal District":
        case "Mexicio":
        case "Mexico":
        case "Mexico City":
        case "Mexico D.F.":
        case "Mexico Df":
        case "Mexico D.F":
        case "Mexico Federal District":
        case "Mexico, D.F.":
        case "Mexico/Jalisco":
        case "Mexico/Obregon":
            return "México";
        case "Monaco":
            return "Mónaco";
        case "Northern Ireland":
            return "Irlanda del Norte";
        case "Panama":
            return "Panamá";
        case "Poland":
            return "Polonia";
        case "Portuguese":
            return "Portugal";
        case "Russian":
            return "Rusia";
        case "Scotland":
            return "Escocia";
        case "Slovakia":
            return "Eslovaquia";
        case "South Africa":
            return "Sudáfrica";
        case "Spain":
        case "Spanish":
        case "Spanish / Mexican":
        case "Spanish,Mexican":
            return "España"
        case "Sri Lanka":
            return "Sri Lanka";
        case "Swedish":
            return "Suecia";
        case "Swiss":
        case "Switzerland":
            return "Suiza";
        case "Thailand":
            return "Tailandia";
        case "Turkish":
            return "Turquía";
        case "United Arab Emirates":
            return "Emiratos Árabes Unidos";
        case "Uk":
        case "Uk":
        case "United Kingdom":
        case "United Kingdom ( England ) (Gb-Eng)":
        case "United Kingdom ( England )  (Gb-Eng)":
        case "United Kingdom":
            return "Reino Unido";
        case "Ukrainian":
            return "Ucrania";
        case "Miami,":
        case "United States Of America":
        case "Usa":
        case "United States":
        case "United States Of America":
        case "U.S.A.":
        case "Miami,":
            return "Estados Unidos de América";
        case "Venezuala":
        case "Venezuelan":
            return "Venezuela";
        case "Wales":
            return "Gales";
        case "Unknown":
        case "Undefined":
            return "";
    }
}

module.exports = { createMainPerson, isPerson };
