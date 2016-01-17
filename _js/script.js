'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
import {$} from './helpers/util';
import worldbounds from '../_hbs/worldbounds';

let Tile = require('./elements/Tile');

const init = () => {
  //create canvas element
  $('body').insertAdjacentHTML('beforeend', worldbounds());
  //get canvas element
  let cnvs = $('#world-bounds');
  //setup paperjs
  paper.setup(cnvs);

  genGrid();

};

const genGrid = () => {
  let tile = new Tile(100);
};

init();
