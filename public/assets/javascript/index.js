$(document).ready(function () {

    var tweetContainer = $(".tweet-container");
    $(document).on("click", ".btn.save", handleTweetSave);
    $(document).on("click", ".scrape-new", handleTweetScrape);


    initPage();

    function initPage() {

        tweetContainer.empty();
        $.get("/api/headlines?saved=false")
            .then(function (data) {

                if (data && data.length) {
                    renderTweet(data);
                }
                else {
                    renderEmpty()
                }
            });
    }

    function renderTweets(tweets) {

        var tweetPanels = [];

        for (var i = 0; i < tweets.length; i++) {
            tweetPanels.push(createPanel(tweets[i]));
        }

        tweetContainer.append(tweetPanels);
    }


    function createPanel(tweet) {

        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                tweet.headline,
                "<a class='btn btn-success save'>",
                "Save Tweet",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                tweet.vid,
                "</div>",
                "</div>"
            ].join(""));

        panel.data("_id", tweet._id);
        return panel;
    }

    function renderEmpty() {
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Uh oh. Looks like we don't have any new Tweets.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What would you like to do</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a href='/saved'>Try Scraping New Tweets</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
            tweetContainer.append(emptyAlert);

    }

    function handleTweetSave() {

        var tweetsToSave = $(this).parents(".panel").data()
        tweetsToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: tweetsToSave
        })
        .then(function(data) {
            if (data.ok) {
                initPage()
            }
        });
    }

    function handleTweetScrape() {
        $.get("/api/fetch")
        .then(function(data) {
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
        });
    }

});