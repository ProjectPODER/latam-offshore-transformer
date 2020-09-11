const { dateToISOString } = require('./util');
const laundry = require('company-laundry');

function createMember(id, row, metadata) {
    let membership = {
        id: id,
        role: mapRole(row.Rol),
        organization_id: laundry.simpleName(laundry.launder(row.Nombre_de_la_compania)),
        organization_name: row.Nombre_de_la_compania,
        organization_class: 'company',
        parent_id: laundry.simpleName(laundry.launder(row.Nombre_corregido)),
        parent_name: row.Nombre_corregido,
        parent_class: 'person'
    };

    Object.assign(membership, metadata);

    return membership;
}

function isMember(member_id, index) {
    return index.indexOf(member_id);
}

function mapRole(string) {
    return string;
}

module.exports = { createMember, isMember };
