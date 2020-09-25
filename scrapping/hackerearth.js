let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.hackerearth.com/@shubhsting"



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
    let Candidatename = $(".top-fold .profile-card h1.name").text();
    let ratingBlock = $(".large.darker.float-right.weight-600");
    let rating = $(ratingBlock[2]).text();
    let text = $(".less-margin-right");
    let languages = $(text[0]).text();
    let College = $(text[1]).text();
    let random = $('span[class="dark weight-700"]').text()
    console.log(random)
}
