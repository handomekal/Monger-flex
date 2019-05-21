var scrape = require("/scripts/scrape");
var makeDate = require("/scripts/date");

var Headline = require("/models/Headline");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            var tweets = data;
            for (var i=0; i < tweets.length; i++) {
                tweets[i].date = makeDate();
                tweets[i].saved = false;
            }

            Headline.collection.insertMany(tweets, {ordered:false}, function(err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}