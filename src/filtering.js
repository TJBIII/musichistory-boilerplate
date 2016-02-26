"use strict";
//One module is responsible for making the filtering form work. Therefore, it will need to use methods from the previous module.

let load = require('./load');


function filter () {

  let songs = load.getSongs();

}


module.exports = filter;