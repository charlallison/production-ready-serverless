'use strict';

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultRestaurants = process.env.defaultRestaurants || 8;
const tableName = process.env.restaurants_table;

const getRestaurants = {};

getRestaurants.getAll = async (count) => {    
    return new Promise((resolve, reject) => {
        const req = {
            TableName: tableName,
            Limit: count
        }
        
        dynamodb.scan(req, (err, data) => {
            if(err) reject(err);
            else resolve(data.Items);
        });
    });
};

getRestaurants.handler = async (event) => {
    const restaurants = await getRestaurants.getAll(defaultRestaurants);
    console.log(restaurants);

    return {
        statusCode: 200,
        body: JSON.stringify(restaurants)
    }
};

module.exports = getRestaurants;