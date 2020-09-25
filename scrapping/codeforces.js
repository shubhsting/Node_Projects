let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let url = "https://codeforces.com/profile/shubham97361"



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
    let userrank=$('div[class="user-rank"]').text().trim();

    let username=$('div[style="font-size: 0.8em; color: #777;"]').text().split(",")[0];

    let collegeName=$('div[style="font-size: 0.8em; color: #777;"]').text().split("From")[1];
  
    let ratingInfo=$('span[class="smaller"]').text().trim().split(" ");
    let maxTag=ratingInfo[1].substr(0,ratingInfo[1].length-1)
    let maxRating=ratingInfo[3].substr(0,ratingInfo[3].length-1)
    let finalobj={
        userrank,username,collegeName,maxTag,maxRating
    }
    console.log(finalobj)
}