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

  genGrid(cnvs);

};

const genGrid = (cnvs) => {
  //set world boundries, amount of tiles
  let worldWidth = 100;
  let worldHeight = 60;
  //create layer for tiles
  let worldLayer = new paper.Layer();
  //define loop variables
  let ww = worldWidth;
  let wh = worldHeight;
  //template for .clone()
  let tileTmpl = new Tile(10);
  //loop-fill the worldlayer
  while(wh > 0){
    let tile = tileTmpl.clone();
    worldLayer.addChild(tile);
    if((worldHeight - wh) % 2){
      tile.position.x = ((worldWidth - ww) * (tile.bounds.width)) + (tile.bounds.width/2);
    }else{
      tile.position.x = (worldWidth - ww) * (tile.bounds.width);
    }
    tile.position.y = (worldHeight - wh) * (tile.bounds.height - tile.bounds.height / 4);
    ww--;
    if(ww === 0){
      ww = worldWidth;
      wh--;
    }
  }
  tileTmpl.remove(); //paper automatically adds this 
};

init();
