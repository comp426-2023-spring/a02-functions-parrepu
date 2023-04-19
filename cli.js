#!/usr/bin/env node // Following should be the first line of the script file

// Good practice to include all needed imports or dependencies at the top of the file.
// import moment from moment-timezone (will need for later)
import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

// const timezone = moment.tz.guess(); Will probably need for later.

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

// Timezone (reference repo documentation)
const timezone = moment.tz.guess();

// Find the appropriate request URL
// What variables do I need to construct my URL string? -> Main variables: latitude, longitude, daily, precipitation days & hours
const days = arg2.d; //"-d" from help text above

// Create a latitude & longitude variable (set the following); '||' means or
var latitude =  arg2.n || arg2.s * -1; // Can these be constants and should I include '()'?
var longitude = arg2.e || arg2.w * -1; 

// Utilize fetch & response to make a request here (think about relevant variable names and watch out for spacing here)
// Debugging: Don't forget to concatenate '&daily=precipitation_hours&timezone=' to the URL
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude +'&longitude='+ longitude +'&daily=precipitation_hours&timezone='+ timezone); // What http link do I put here? | replace static values with argv values
const data = await response.json();

// Include the following if-statement
if(arg2.j){
    console.log(data); // Use 'data' variable
    // Don't forget to use 'process.exit()'
    process.exit(0);
}

// Make if-else statement to pass assessment #6 (daily precipitation hours)
// Intialize an empty string that will be added to (online documentation says to use 'let' to declare a JavaScript string)
let emptystring = "";
if (data.daily.precipitation_hours[days] > 0) { // Debugging
    // Iterate back to the string var. (Don't forget to add a space after galoshes)
    emptystring = emptystring + "You might need your galoshes ";
} else { // If the var. isn't any other number than zero, it has to be zero (Don't forget to add a space after galoshes)
    emptystring = emptystring + "You will not need your galoshes ";
}

// Make another if-else statement to pass assessment #7 (day) | days constant already defined above.  
// Reference documentation for the following | Debugging: Just return the 'console.log()' at the end of the file once emptystring has been iterated to
if (days > 1) {
    emptystring = emptystring + "in " + days + " days.";
} else if (days == 0) {
    emptystring = emptystring + "today.";
} else {
    emptystring = emptystring + "tomorrow.";
}

// Finally, output emptystring in the console.
console.log(emptystring);

// Debugging: Consider utilizing a 'process.exit()' at the end
process.exit(0);