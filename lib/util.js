const removeDiacritics = require('diacritics').remove;
const _ = require('lodash');

function repairDate(string) {
    var [ date, time ] = string.split(' ');
    var [ month, day, year ] = date.split('/');

    if(!year || !day || !month) return '';

    if(year.length == 2) year = '20' + year;
    return year + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0') + ((time)? ' ' + time : '');
}

function dateToISOString(string) {
  if(string.indexOf('/') >= 0) string = repairDate(string);
  if(string == '') return string;

  if(string.length < 5) return string;
  var pattern = /[^/\w-]|_/g;
  if(string.match(pattern)) string = string.replace(pattern, '');

  const [ date, time ] = string.split(' ');
  const [ year, month, day ] = date.split('-');
  if (time) {
    const [ hour, minute, second ] = time.split(':');
    if (second) {
      return new Date(Date.UTC(year, (+month -1), day, hour, minute, second)).toISOString();
    }
    // console.log(year, (+month -1), day, hour, minute);
    return new Date(Date.UTC(year, (+month -1), day, hour, minute)).toISOString();
  }
  return new Date(Date.UTC(year, (+month -1), day)).toISOString();

}

function reverseName(string) {
    if(string.indexOf(',')) {
        let parts = string.split(',');
        parts = parts.map( part => part.trim() );
        let first_name = parts.pop();
        string = first_name + ' ' + parts.join(' ');
    }
    return string;
}

module.exports = { dateToISOString, reverseName }
