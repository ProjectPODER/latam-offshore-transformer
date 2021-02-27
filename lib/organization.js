const { dateToISOString, reverseName } = require('./util');
const laundry = require('company-laundry');

function createMainOrg(row, metadata) {
    let org = {
        "id": laundry.simpleName(laundry.launder(row.Nombre_de_la_compania)),
        "name": row.Nombre_de_la_compania,
        "classification": "company",
        "subclassification": "offshore",
        "identifiers": [{
            "identifier": row.Numero_de_la_compania,
            "scheme": "Companies House"
        }]
    };

    org.area = [];
    org.area.push({
        "id": laundry.simpleName(laundry.cleanCountry("Reino Unido")),
        "name": "Reino Unido",
        "other_names": [ { "name": "United Kingdom" } ],
        "classification": "country"
    });

    org.links = [{ "id": "https://beta.companieshouse.gov.uk/company/" + row.Numero_de_la_compania }]

    Object.assign(org, metadata);

    return org;
}

function isOrg(org_id, index) {
    return index.indexOf(org_id);
}

module.exports = { createMainOrg, isOrg };
