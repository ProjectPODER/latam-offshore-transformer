const { dateToISOString, reverseName } = require('./util');
const laundry = require('company-laundry');

function createMainPerson(row, metadata) {
    let country_born = getCountryNames(row.Nacionalidad);
    let country_residence = getCountryNames(row.Pais_de_Residencia);

    let person = {
        "id": laundry.simpleName(laundry.launder(row.Nombre_corregido)),
        "name": row.Nombre_corregido,
        "classification": "owner",
        "other_names": [ { "name": row.Nombre } ],
        "national_identity": row.Nacionalidad,
        "area": [],
        "links": [{ "id": row.link }]
    };

    if(country_born[0] != "") {
        let area_born = {
            "id": laundry.simpleName(laundry.cleanCountry(country_born[0])),
            "name": country_born[0],
            "classification": "country",
            "subclassification": "country-born"
        };
        if(country_born[0] != country_born[1]) Object.assign(area_born, { "other_names": [ { name: country_born[1] } ] });
        person.area.push(area_born);
    }
    if(country_residence[0] != "") {
        let area_residence = {
            "id": laundry.simpleName(laundry.cleanCountry(country_residence[0])),
            "name": country_residence[0],
            "classification": "country",
            "subclassification": "country-of-residence"
        }
        if(country_residence[0] != country_residence[1]) Object.assign(area_residence, { "other_names": [ { name: country_residence[1] } ] });
        person.area.push(area_residence);
    }

    Object.assign(person, metadata);

    return person;
}

function isPerson(person_id, index) {
    return index.indexOf(person_id);
}

function getCountryNames(string) {
    switch(string) {
        case "American":
            return ["Estados Unidos de América", "United States of America"];
        case "Argentine":
        case "Argentina":
            return ["Argentina", "Argentina"];
        case "Austrian":
            return ["Austria", "Austria"];
        case "Bahamas":
            return ["Bahamas", "Bahamas"];
        case "Belgium":
            return ["Bélgica", "Belgium"];
        case "Belize":
        case "Belizean":
            return ["Belice", "Belize"];
        case "Bermuda":
            return ["Bermuda", "Bermuda"];
        case "Brazil":
        case "Brazilian":
            return ["Brasil", "Brazil"];
        case "British":
            return ["Reino Unido", "United Kingdom"];
        case "Canada":
        case "Canadian":
            return ["Canadá", "Canada"];
        case "Chile":
        case "Chilean":
            return ["Chile", "Chile"];
        case "China":
            return ["China", "China"];
        case "Costa Rica":
        case "Costa Rican":
            return ["Costa Rica", "Costa Rica"];
        case "Cuban":
            return ["Cuba", "Cuba"];
        case "Cyprus":
            return ["Chipre", "Cyprus"];
        case "Dominican":
            return ["República Dominicana", "Dominican Republic"];
        case "Dutch":
        case "Netherlands":
            return ["Países Bajos", "Netherlands"];
        case "Eangland/East Yorkshire":
        case "England":
        case "England, Uk":
        case "English":
            return ["Inglaterra", "England"];
        case "French":
        case "France":
            return ["Francia", "France"];
        case "German":
        case "Germany":
            return ["Alemania", "Germany"];
        case "Gibraltar":
            return ["Gibraltar", "Gibraltar"];
        case "Gbr":
            return ["Reino Unido", "United Kingdom"];
        case "Hong Kong":
            return ["Hong Kong", "Hong Kong"];
        case "Hungarian":
            return ["Hungría", "Hungary"];
        case "Irish":
            return ["Irlanda", "Ireland"];
        case "Italy":
        case "Italian":
            return ["Italia", "Italy"];
        case "India":
            return ["India", "India"];
        case "Israeli":
        case "Israel":
            return ["Israel", "Israel"];
        case "Japan":
            return ["Japón", "Japan"];
        case "Malta":
            return ["Malta", "Malta"];
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
            return ["México", "Mexico"];
        case "Monaco":
            return ["Mónaco", "Monaco"];
        case "Northern Ireland":
            return ["Irlanda del Norte", "Northern Ireland"];
        case "Panama":
            return ["Panamá", "Panama"];
        case "Poland":
            return ["Polonia", "Poland"];
        case "Portuguese":
            return ["Portugal", "Portugal"];
        case "Russian":
            return ["Rusia", "Russia"];
        case "Scotland":
            return ["Escocia", "Scotland"];
        case "Slovakia":
            return ["Eslovaquia", "Slovakia"];
        case "South Africa":
            return ["Sudáfrica", "South Africa"];
        case "Spain":
        case "Spanish":
        case "Spanish / Mexican":
        case "Spanish,Mexican":
            return ["España", "Spain"];
        case "Sri Lanka":
            return ["Sri Lanka", "Sri Lanka"];
        case "Swedish":
            return ["Suecia", "Sweden"];
        case "Swiss":
        case "Switzerland":
            return ["Suiza", "Switzerland"];
        case "Thailand":
            return ["Tailandia", "Thailand"];
        case "Turkish":
            return ["Turquía", "Turkey"];
        case "United Arab Emirates":
            return ["Emiratos Árabes Unidos", "United Arab Emirates"];
        case "Uk":
        case "Uk":
        case "United Kingdom":
        case "United Kingdom ( England ) (Gb-Eng)":
        case "United Kingdom ( England )  (Gb-Eng)":
        case "United Kingdom":
            return ["Reino Unido", "United Kingdom"];
        case "Ukrainian":
            return ["Ucrania", "Ukraine"];
        case "Miami,":
        case "United States Of America":
        case "Usa":
        case "United States":
        case "United States Of America":
        case "U.S.A.":
        case "Miami,":
        case "Miami, ":
            return ["Estados Unidos de América", "United States Of America"];
        case "Venezuala":
        case "Venezuelan":
            return ["Venezuela", "Venezuela"];
        case "Wales":
            return ["Gales", "Wales"];
        case "Unknown":
        case "Undefined":
            return [""];
    }
}

module.exports = { createMainPerson, isPerson };
