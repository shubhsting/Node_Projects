let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");




let url = "https://github.com/shubhsting";

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
    let name = $('span[class="p-name vcard-fullname d-block overflow-hidden"]').text().trim()
    let FObj = $('span[class="text-bold text-gray-dark"]')
    let followers = $(FObj[0]).text();
    let following = $(FObj[1]).text();
    let stars = $(FObj[2]).text();
    let countO = $('span[class="Counter "]')
    let repoCount = $(countO[0]).text().trim();
    let ans = {
        name, followers, following, stars, repoCount
    }
    console.log(ans)
}
