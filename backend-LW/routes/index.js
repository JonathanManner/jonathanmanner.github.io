var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

endpoints = require("./endpoints");

const app = express();
/*
* Loop over all endpoints and assign middleware and handler.
**/
for (let key in endpoints) {
    if (endpoints[key]) {
        let endpoint = endpoints[key];

        if (endpoint.middleware) {
            app[endpoint.method](
                endpoint.url,
                endpoint.middleware,
                endpoint.handler
            );
        } else {
            app[endpoint.method](endpoint.url, endpoint.handler);
        }
    }
}

module.exports = exports = app;