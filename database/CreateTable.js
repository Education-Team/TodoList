var AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: "AKIAUSSPIXV7WWGWSMGV",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var params = {
    TableName: "Movies",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH" }, // Partition key
        { AttributeName: "title", KeyType: "RANGE" } // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    // 다운로드 버전인 경우 아래 코드 무시
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.log(
            "Unable to create table. Error JSON: ",
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log(
            "Created table. Table description JSON: ",
            JSON.stringify(data, null, 2)
        );
    }
});