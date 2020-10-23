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
    }
};

docClient.get(params, function (err, data) {
    if (err) {
        console.error(
            "Unable to read item. Error JSON:",
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});