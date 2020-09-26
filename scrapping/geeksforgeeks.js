let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let J = require('jquery')
function GFG(name) {
    let url = "https://auth.geeksforgeeks.org/user/" + name + "/practice/";
    request(url, cb);
}


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
// let da = []
function work(body) {
    let $ = cheerio.load(body);
    let fullInfo = $($('div[class="mdl-cell mdl-cell--7-col mdl-cell--12-col-phone whiteBgColor mdl-shadow--2dp userMainDiv"]')).find("div")
    let abs = $($('div[class="mdl-cell mdl-cell--9-col mdl-cell--12-col-phone textBold"]')).find("a")
    let randObj = $('div[class="mdl-cell mdl-cell--9-col mdl-cell--12-col-phone textBold"]')
    let name = $($($(fullInfo[0])).find("div")[1]).text();
    let collegeName = $(abs[0]).text();
    let collegeAmbassador = $(abs[2]).text();
    let rankCollege = $(randObj[1]).text();
    rankCollege = rankCollege.substr(1, rankCollege.length)
    let rObj = $('div[class="mdl-cell mdl-cell--6-col mdl-cell--12-col-phone textBold"]')
    let overAllCodScore = $(rObj[0]).text().split(":")[1].trim();
    let totalQuestions = $(rObj[1]).text().split(":")[1].trim();

    let da = {
        name, collegeName, collegeAmbassador, rankCollege, overAllCodScore, totalQuestions
    }
    J(".gf").val(name)

}

module.exports.GFG = GFG;