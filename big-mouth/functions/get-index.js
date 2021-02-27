'use strict';

const fs = require('fs');
const Mustache = require('mustache');
const axios = require('axios').default;
const restaurantsApiRoot = process.env.restaurants_api;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

var html;

function loadHtml() {
  if(!html) {
    html = fs.readFileSync('static/index.html', 'utf-8');
  }
  return html;
}

function getRestaurants() {
  return axios.get(restaurantsApiRoot).then(response => response.data);
}

module.exports.handler = async (event) => {
  try {
    const template = loadHtml();
    const restaurants = await getRestaurants();
    const dayOfWeek = days[new Date().getDay()];
    const html = Mustache.render(template, { dayOfWeek, restaurants });

    const response = {
      statusCode: 200,
      body: html,
      headers: {
        'Content-Type' : 'text/html; charset=UTF-8'
      }
    };

    return response;
  }catch(error) {
    console.log(error);
  }

};
