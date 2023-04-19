#!/usr/bin/env node // Following should be the first line of the script file

// Good practice to include all needed imports or dependencies at the top of the file.
// import moment from moment-timezone (will need for later)
import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

// const timezone = moment.tz.guess(); Will likely need for later.

// Create the help text (create if statement (if '-h' option or argument is fed in, output or log the following help text & exit 0))
// 0: exit code for "everything worked" ; 1: "there was an error"
const arg2 = minimist(process.argv.slice(2)) // Same structure in previous assignment
if (arg2.h) { // Use '.' and not '= or =='
    // Reference documentation on repository (log the following help text)
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`);

    // Don't forget to "exit 0"
    process.exit(0);
}
