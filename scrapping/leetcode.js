let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let url = "https://leetcode.com/shubhsting/"

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
    let score = $(".badge.progress-bar-success").text();
    let contests = $(score[0]).text();
    let questionsSolved = $(score[1]).text();
    let points = $(score[3]).text();
    let graph = $('span[class="text-muted"]');
    let lastsub = $(graph[0]).text();
    
}