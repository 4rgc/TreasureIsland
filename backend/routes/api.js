var express = require('express');
var router = express.Router();
const url = require('url')
const querystring = require('querystring')
const { Map, MapConfig } = require('../js/map')
const { validateQueryParams } = require('../js/util')

/* GET users listing. */ 
router.get('/map', function(req, res, next) {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    let errors = validateQueryParams(parsedQs, ['d', 'tun', 'len', 'trp']);
    if(errors.length != 0){
        res.send(JSON.stringify({
            error: errors
        }))
        return;
    }

    let config = new MapConfig(
        {
            dimensions: parsedQs['d'],
            maxTunnels: parsedQs['tun'],
            maxLength: parsedQs['len'],
            trapNumber: parsedQs['trp']
        }
    );
    res.send(JSON.stringify(new Map(config)));
});

module.exports = router;
