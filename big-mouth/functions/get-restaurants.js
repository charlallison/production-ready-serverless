'use strict';

const defaultRestaurants = process.env.defaultRestaurants || 8;
function getRestaurants() {
    const req = {
        TableName: process.env.TableName
    }

    const restaurants = dynamodb.scan(req).promise();
    return restaurants;
}

module.exports.handler = async (event) => {
    const restaurants = getRestaurants(defaultRestaurants);

    return {
        statusCode: 200,
        body: JSON.stringify(restaurants)
    }

};