const express = require('express');
let ejs = require('ejs');
const axios = require('axios').default;


const app = express();

app.set('view-engine', 'ejs');

app.get("/", function(req, res) {
  axios({
      method: 'get',
      url: 'https://restcountries.eu/rest/v2/all',
      responseType: 'json'
    })
    .then(function(response) {
      const countriesData = response.data;
      res.send(countriesData);
    });
})


app.listen('3000', () => {
  console.log("sever is running.");
})
