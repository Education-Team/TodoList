var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: "AKIAUSSPIXV7WWGWSMGV",
    secretAccessKey: "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"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2017;
var title = "The Big Wonny";

var params = {
    TableName: table,
    Item: {
        year: year,
        title: title,
        info: {
            plot: "Nothing happens at all.",
            rating: 0
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
    if (err) {
        console.error(
            "Unable to add item. Error JSON:",
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});