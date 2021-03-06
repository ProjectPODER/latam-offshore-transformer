const { dateToISOString, reverseName } = require('./util');
const laundry = require('company-laundry');

function createMainPerson(row, metadata) {
    let country_born = getCountryNames(row.Nacionalidad);
    let country_residence = getCountryNames(row.Pais_de_Residencia);

    let person = {
        "id": laundry.simpleName(laundry.launder(row.Nombre_corregido)),
        "name": row.Nombre_corregido,
        "classification": [mapRole(row.Rol)],
        "subclassification": [row.Rol],
        "other_names": [ { "name": row.Nombre } ],
        "national_identity": row.Nacionalidad,
        "area": [],
        "links": [{ "id": row.link }]
    };

    if(country_born[0] != "") {
        let area_born = {
            "id": laundry.simpleName(laundry.cleanCountry(country_born[0])),
            "name": country_born[0],
            "classification": ["country"],
            "subclassification": ["country-born"]
        };
        if(country_born[0] != country_born[1]) Object.assign(area_born, { "other_names": [ { name: country_born[1] } ] });
        person.area.push(area_born);
    }
    if(country_residence[0] != "") {
        let area_residence = {
            "id": laundry.simpleName(laundry.cleanCountry(country_residence[0])),
            "name": country_residence[0],
            "classification": ["country"],
            "subclassification": ["country-of-residence"]
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

function mapRole(string) {
    switch(string) {
        case 'individual-person-with-significant-control':
            return 'shareholder';
        case 'director':
        case 'llp-designated-member':
        case 'llp-member':
        case 'secretary':
            return 'boardmember';
        default:
            return string;
    }
}

function getCountryNames(string) {
    switch(string) {
        case "American":
            return ["Estados Unidos de Am??rica", "United States of America"];
        case "Argentine":
        case "Argentina":
            return ["Argentina", "Argentina"];
        case "Austrian":
            return ["Austria", "Austria"];
        case "Bahamas":
            return ["Bahamas", "Bahamas"];
        case "Belgium":
            return ["B??lgica", "Belgium"];
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
            return ["Canad??", "Canada"];
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
            return ["Rep??blica Dominicana", "Dominican Republic"];
        case "Dutch":
        case "Netherlands":
            return ["Pa??ses Bajos", "Netherlands"];
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
            return ["Hungr??a", "Hungary"];
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
            return ["Jap??n", "Japan"];
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
            return ["M??xico", "Mexico"];
        case "Monaco":
            return ["M??naco", "Monaco"];
        case "Northern Ireland":
            return ["Irlanda del Norte", "Northern Ireland"];
        case "Panama":
            return ["Panam??", "Panama"];
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
            return ["Sud??frica", "South Africa"];
        case "Spain":
        case "Spanish":
        case "Spanish / Mexican":
        case "Spanish,Mexican":
            return ["Espa??a", "Spain"];
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
            return ["Turqu??a", "Turkey"];
        case "United Arab Emirates":
            return ["Emiratos ??rabes Unidos", "United Arab Emirates"];
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
            return ["Estados Unidos de Am??rica", "United States Of America"];
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
