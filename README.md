# latam-offshore-transformer

Transforms data from the LATAM Offshore database into Popolo standard in JSON.

## Usage

    cat JSON_STREAM | node index.js

## Details

The script takes a stream of JSON objects, one object per line, from stdin, and outputs Popolo JSON objects  for persons, organizations, and memberships. Each collection is sent to stdout as a stream of JSON objects, one object per line, and split using a special delimiter string: **[SPLIT]**. The output order is persons, organizations, and memberships.

LATAM Offshore information is stored in CSV files, which should be converted into JSON with column names as properties before using this script.
