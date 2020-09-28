var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = require('jquery')(window);

$(document).ready(function () {
    $('.btn').on("click", function () {
        alert("clicked");
    })
})