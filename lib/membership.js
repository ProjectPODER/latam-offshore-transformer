const { dateToISOString } = require('./util');
const laundry = require('company-laundry');

function createMember(id, row, metadata) {
    let role = mapRole(row.Rol);
    let membership = {
        id: id,
        role: role,
        organization_id: laundry.simpleName(laundry.launder(row.Nombre_de_la_compania)),
        organization_name: row.Nombre_de_la_compania,
        organization_class: 'company',
        parent_id: laundry.simpleName(laundry.launder(row.Nombre_corregido)),
        parent_name: row.Nombre_corregido,
        parent_class: role.toLowerCase(),
        parent_subclass: row.Rol
    };

    Object.assign(membership, metadata);

    return membership;
}

function isMember(member_id, index) {
    return index.indexOf(member_id);
}

function mapRole(string) {
    switch(string) {
        case 'individual-person-with-significant-control':
            return 'Shareholder';
        case 'director':
        case 'llp-designated-member':
        case 'llp-member':
        case 'secretary':
            return 'Boardmember';
        default:
            return string;
    }
}

module.exports = { createMember, isMember };
