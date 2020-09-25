let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.hackerrank.com/profile/shubhsting"
request(url, cb);
function cb(err, header, body) {
    if (err == null && header.statusCode == 200) {
        console.log("received")
        work(body)
    }
    else if (header.statusCode == 404) {
        console.log("404 wrong url");
    }
    else {
        console.log(err);
        console.log(header.statusCode);
    }
}

function work(body) {
    let $ = cheerio.load(body);
    let badjes=$(".theme-m .ui-badge .badge-title").length;
    console.log(badjes);

}