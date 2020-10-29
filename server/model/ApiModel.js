const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
    region: "ap-northeast-2",
    accessKeyId: "AKIAUSSPIXV7WWGWSMGV",
    secretAccessKey: "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"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "todolist";

let params;

// SELECT
async function selectItem() {
	params = {
		TableName: table
	};

	try {
		const data = await docClient.scan(params).promise();
		return data;
	} catch(err) {
		console.error(
			"Unable to read item. Error JSON:",
			JSON.stringify(err, null, 2)
		);
		return null;
	}
}

// SELECT ONE
async function selectOneItem(key) {
	params = {
		TableName: table,
		Key: {
			keyid: Number(key)
		}
	};

	try {
		const data = await docClient.get(params).promise();
		return data;
	} catch(err) {
		console.error(
			"Unable to readOne item. Error JSON:",
			JSON.stringify(err, null, 2)
		);
		return null;
	}
}

// UPDATE
async function updateItem(params, reqData) {
	switch(reqData.type) {
		case 'D':
			params = {
				TableName: table,
				Key: {
					keyid: Number(params.id)
				},
				UpdateExpression: "remove todos.#attrKeyId",
				ConditionExpression: "attribute_exists(todos.#attrKeyId)",
				ExpressionAttributeNames : {
					"#attrKeyId" : reqData.data.id
				 }
			};

			try {
				const data = await docClient.update(params).promise();
				return data;
			} catch(err) {
				console.error(
					"Unable to update item. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				return null;
			}
		case 'T':
			params = {
				TableName: table,
				Key: {
					keyid: Number(params.id)
				},
				UpdateExpression: "set todos.#attrKeyId.done = :attrValue",
				ConditionExpression: "attribute_exists(todos.#attrKeyId)",
				ExpressionAttributeNames : {
					"#attrKeyId" : reqData.data.id
				},
				ExpressionAttributeValues: {
					":attrValue": reqData.data.done
				},
				ReturnValues: "UPDATED_NEW"
			};

			try {
				const data = await docClient.update(params).promise();
				return data;
			} catch(err) {
				console.error(
					"Unable to update item. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				return null;
			}
		case 'C':
			params = {
				TableName: table,
				Key: {
					keyid: Number(params.id)
				},
				// UpdateExpression: "set #attrName = list_append(#attrName, :attrValue)",
				 UpdateExpression: "set todos.#attrKeyId = :attrValue",
				ExpressionAttributeNames : {
					"#attrKeyId" : reqData.data.todo.id
				  },
				ExpressionAttributeValues: {
					":attrValue": reqData.data.todo
				},
				ReturnValues: "UPDATED_NEW"
			};

			try {
				const data = await docClient.update(params).promise();
				return data;
			} catch(err) {
				console.error(
					"Unable to update item. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				return null;
			}
		default:
			return null;
	}
}

// INSERT
function insertItem() {
	params = {
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
	docClient.insert(params, function (err, data) {
		if (err) {
			console.error(
				"Unable to add item. Error JSON:",
				JSON.stringify(err, null, 2)
			);
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});
}

// DELETE
function deleteItem() {
	docClient.delete(params, function (err, data) {
		if (err) {
			console.error(
				"Unable to delete item. Error JSON:",
				JSON.stringify(err, null, 2)
			);
		} else {
			console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
		}
	});
}

exports.selectItem = selectItem;
exports.selectOneItem = selectOneItem;
exports.insertItem = insertItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;