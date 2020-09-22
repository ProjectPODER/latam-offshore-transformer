const { createMainPerson, isPerson } = require('./person');
const { createMainOrg, isOrg } = require('./organization');
const { createMember, isMember } = require('./membership');
const { dateToISOString, reverseName } = require('./util');
const laundry = require('company-laundry');

let persons = [];
let persons_index = [];
let orgs = [];
let orgs_index = [];
let memberships = [];
let memberships_index = [];
let areas = [];
let areas_index = [];

function parseCollection(collection) {
    collection.map( (doc) => {
        let row = doc.body;
        let metadata = {
            date: doc.httpLastModified,
            source: [ { id: doc.dataSource } ],
            sourceRun: [ { id: doc.dataSourceRun } ]
        }
        let person = null;
        let org = null;

        // Handle company
        if(isOrg(laundry.simpleName(laundry.launder(row.Nombre_de_la_compania)), orgs_index) < 0) {
            org = createMainOrg(row, metadata);
            orgs.push(org);
            orgs_index.push(org.id);
        }

        // Handle person
        if(isPerson(laundry.simpleName(laundry.launder(row.Nombre_corregido)), persons_index) < 0) {
            person = createMainPerson(row, metadata);
            persons.push(person);
            persons_index.push(person.id);
        }

        // Handle membership
        var memberID = laundry.simpleName(laundry.launder(row.Nombre_corregido)) + '_' + laundry.simpleName(laundry.launder(row.Nombre_de_la_compania));
        if(isMember(memberID, memberships_index) < 0) {
            let membership = createMember(memberID, row, metadata);
            memberships.push(membership);
            memberships_index.push(membership);
        }

        // Handle areas
        if(person && person.hasOwnProperty('area') && person.area.length > 0) {
            person.area.map( area => {
                if(areas_index.indexOf(area.id) < 0) {
                    areas.push(area);
                    areas_index.push(area.id);
                }
            } );
        }
        if(org && org.hasOwnProperty('area') && org.area.length > 0) {
            org.area.map( area => {
                if(areas_index.indexOf(area.id) < 0) {
                    areas.push(area);
                    areas_index.push(area.id);
                }
            } );
        }
    } );

    return { "persons": persons, "orgs": orgs, "memberships": memberships, "areas": areas };
}

module.exports = parseCollection;
