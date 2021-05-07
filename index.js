let express = require('express');
let axios = require('axios');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  axios({
    method: 'get',
    url: 'https://restcountries.eu/rest/v2/all',
    responseType: 'json'
  })
    .then((response) => {
      const cdata = response.data;
      // console.log(cdata);
      res.render('list', {list: cdata});
    })

});

app.listen(3000, () => console.log('app listening on port 3000!'));
