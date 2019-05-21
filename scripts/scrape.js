var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://twitter.com/search?src=typd&q=espn", function(err, res, body) {
        var $ = cheerio.load(body);

        var tweets = [];

        $(".content").each(function(i, element){

            var text = $(this).children(".tweetTextSize").text().trim();
            var vid = $(this).children(".twitter-timeline-link u-hidden").text().trim();

            if(text && vid) {
                var textNeat = text.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var vidNeat = vid.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: textNeat,
                    video: vidNeat
                };

                tweets.push(dataToAdd)

            }
        });
        cb(tweets);
    });
};

module.exports = scrape;