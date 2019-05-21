var scrape = require("/scripts/scrape");

var headlinesController = require("/controllers/headlines");
var notesController = require("/controllers/notes");


module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("home");
    });

    app.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if(!docs || docs.insertCount === 0) {
                res.json({
                    message: "No new tweets today. Check back tomorrow!"
                });
            }
            else {
                res.json({
                    message: "Added" + docs.insertedCount + " new tweets!"
                });
            }
        });
    });

    router.get("/api/headlines", function(req, res) {
        var query = {};
        if(req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function(data) {
            res.json(data);
        });

    });

    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.patch("/api/headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    router.get("/api/notes/:headline_id?", function(req, res) {
        var query = {};
        if (req.params.headlines_id) {
            query._id = req.params.headlines_id;
        }

        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });

    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });
}