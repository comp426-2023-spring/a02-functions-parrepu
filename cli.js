#!/usr/bin/env node

// Good practice to include all needed imports or dependencies at the top of the file.
import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone"; // import moment from moment-timezone (will need for later)

// const timezone = moment.tz.guess(); Include below

// Create the help text (create if statement (if '-h' option or argument is fed in, output or log the following help text & exit 0)
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

// Find the appropriate request URL | What variables do I need to construct my URL string? -> Main variables: latitude, longitude, daily, precipitation days & hours
const days = arg2.d; // "-d" from help text above

// Create a latitude & longitude variable (set the following); '||' means or
// var latitude =  arg2.n || arg2.s * -1; // Can these be constants and should I include '()'?
// var longitude = arg2.e || arg2.w * -1; 

// Create a checker to see if latitude and longitude are in range (Don't forget to define String Variables using 'let'!)
let latitude;
let longitude;

// Latitude Range Check 
if (arg2.n){
    // Set latitude to be the following 
    latitude = arg2.n;
} else if (arg2.s) {
    // Same thing as multiplying by '-1'
    latitude = arg2.s * -1;
} else { // Put the following message
    console.log("Latitude must be in range");
    // Don't forget to utilize 'process.exit()' here
    process.exit(0);
}

// Longitude Range Check
if (arg2.e){
    // Set longitude to be the following 
    longitude = arg2.e;
} else if (arg2.w) {
    // Same thing as multipying by '-1'
    longitude =  arg2.w * -1;
} else { // Put the following message 
    console.log("Longitude must be in range");
    // Don't forget to utilize 'process.exit()' here
    process.exit(0);
}


// Utilize fetch & response to make a request here (think about relevant variable names and watch out for spacing here)
// Debugging: Don't forget to concatenate '&daily=precipitation_hours&timezone=' to the URL
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude +'&longitude='+ longitude +'&daily=precipitation_hours&timezone='+ timezone); // Replace static values with argv values
const data = await response.json();

// Make if-else statement to pass assessment #6 (daily precipitation hours)
// Intialize an empty string that will be added to (online documentation says to use 'let' to declare a String variable)
let emptystring = ""; 
if (data.daily.precipitation_hours[days] > 0) { // Debugging
    // Log the following (reference documentation)
    emptystring = emptystring + "You might need your galoshes ";
} else { // If the var. isn't any other value than zero, it has to be zero
    emptystring = emptystring + "You will not need your galoshes ";
}

// Make another if-else statement to pass assessment #7 (day) | days constant already defined above.  
// Reference documentation for the following
if (days == 0) {
    emptystring = emptystring + "today.";
} else if (days > 1) {
    emptystring = emptystring + "in " + days + " days.";
} else {
  emptystring = emptystring + "tomorrow.";
}

// Debugging: Consider utilizing a 'process.exit()' at the end?
// Include the following if-statement
if(arg2.j){
    console.log(data); // Use 'data' variable
    // Don't forget to use 'process.exit()'
    process.exit(0);
} else {
    console.log(emptystring);
}

// Do I need utilize "process.exit()" here? -> Probably not needed
