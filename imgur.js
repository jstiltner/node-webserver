'use strict';
const imgur = require('imgur');


imgur.uploadFile('/tmp/renamed/kittens.png')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });
