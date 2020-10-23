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
    Key: {
        year: year,
        title: title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues: {
        ":r": 5.5,
        ":p": "Everything happens all at once.",
        ":a": ["Larry", "Moe", "Curly"]
    },
    ReturnValues: "UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error(
            "Unable to update item. Error JSON:",
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});