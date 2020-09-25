let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
const { contains } = require("cheerio");
let url = "https://www.codechef.com/users/shubhsting"
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
    let globalRankObj = $(".user-profile-container .sidebar .widget.widget-rating .rating-ranks ul li");
    let CandidateName = $(".user-profile-container header h2").text();
    let collegeName = $('.user-profile-container .content-area .user-details ul li>span')[6].children[0].data;
    let psolve = $('.user-profile-container .content-area .rating-data-section.problems-solved .content h5').text();
    let rating = $(".user-profile-container .sidebar .widget.widget-rating .rating-header .rating-number").text();
    let globalRank = $($(globalRankObj[0])).find("strong").text();
    let countryRank = $($(globalRankObj[1])).find("strong").text();

    let ans = $('td')
    let longchallengeRating = $(ans[1]).text();
    let cookoffrating = $(ans[5]).text();
    let lunchtimeRtaing = $(ans[9]).text();

    let ans1 = {
        CandidateName, collegeName, psolve, rating, globalRank, countryRank, longchallengeRating, cookoffrating, lunchtimeRtaing
    }
    console.log(ans1);
}