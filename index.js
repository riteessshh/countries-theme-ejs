let express = require('express');
let bodyParser = require('body-parser');
let axios = require('axios');
const _ = require("lodash");
let app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/', (req, res) => {
  url = 'https://restcountries.eu/rest/v2/all'
  axios({
    method: 'get',
    url: url,
    responseType: 'json'
  })
    .then((response) => {
      const cdata = response.data;
      // console.log(cdata);
      res.render('list', {list: cdata});
    })
});

app.post('/', (req, res) => {
  countryName = req.body.name;
  // console.log(countryName);
  res.redirect('/'+ countryName);
})

app.get('/search/:cname', (req, res) => {
  const requestedCname = _.lowerCase(req.params.cname);
  const fullUrl = 'https://restcountries.eu/rest/v2/name/' + requestedCname + '?fullText=true'
  // console.log(fullUrl);
  axios({
    method: 'get',
    url: fullUrl,
    responseType: 'json'
  })
    .then((response) => {
      const sdata = response.data;
      // console.log(cdata);
      res.render('list', {list: sdata});
    })
})

app.post('/search', (req, res) => {
  // countryName = req.body.name;
  // console.log(countryName);
  res.redirect('/'+ countryName);
})

app.get('/region/:rname', (req, res) => {
  const requestedRname = _.lowerCase(req.params.rname);
  // console.log(requestedRname);
  url = "https://restcountries.eu/rest/v2/region/"+ requestedRname
  // console.log(url);
  axios({
    baseURL: url,
  })
    .then((response) => {
      // console.log(response.data);
      const rdata = response.data
      res.render('list', {list: rdata})
    })
})

app.post('/region', (req, res) => {
  // countryName = req.body.name;
  // console.log(countryName);
  res.redirect('/'+ countryName);
})

app.get('/:name', (req, res) => {
  const requestedname = _.lowerCase(req.params.name);
  // console.log(requestedname);
  url = 'https://restcountries.eu/rest/v2/name/' + requestedname + '?fullText=true'
  // console.log(url);
  axios({
    baseURL: url,
  })
    .then((response) => {
      const countdata = response.data
      // console.log(countdata);
      res.render('country', {itemdata: countdata})
    })
})


app.listen(3000, () => console.log('app listening on port 3000!'));
