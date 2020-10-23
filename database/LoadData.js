var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: "AKIAUSSPIXV7WWGWSMGV",
    secretAccessKey: "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"
});

var docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing movies info DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync("database/moviedata.json", "utf8"));
allMovies.forEach(function (movie) {
    var params = {
        TableName: "Moves",
        Item: {
            year: movie.year,
            title: movie.title,
            info: movie.info
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error(
                "Unable to add movie",
                movie.title,
                ". Error JSON:",
                JSON.stringify(err, null, 2)
            );
        } else {
            console.log("PutItem succeeded:", movie.title);
        }
    });
});