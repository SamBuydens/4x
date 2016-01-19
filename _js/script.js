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
  let worldWidth = 40;
  let worldHeight = 40;
  //create layer for tiles
  let worldLayer = new paper.Layer();
  //define loop variables
  let ww = worldWidth;
  let wh = worldHeight;
  //defining initial tile size
  let tileSize = (cnvs.height / worldHeight)/2; //divide by two because it's the radius
  tileSize += tileSize/2; //+tileSize/2 because the tiles are placed -1/4 of the following line
  //template for .clone()
  let tileTmpl = new Tile(tileSize);
  //groups for navigation
  let verGroups = [];
  let horGroups = [];
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

  bindNavEvents(cnvs, worldLayer);
};

const bindNavEvents = (cnvs, worldLayer) => { //verschil tellen en toevoegen
  let dragable = false;
  let startPoint = {x: 0, y:0};
  let wlStartPoint = {x: 0, y:0};
  //bind events to worldLayer
  cnvs.addEventListener("mousedown", function(e){
    dragable = true;
    startPoint.x = e.offsetX;
    startPoint.y = e.offsetY;
    wlStartPoint = {x: worldLayer.position.x, y: worldLayer.position.y};
  });
  document.addEventListener("mouseup", function(){
    dragable = false;
  });
  cnvs.addEventListener("mouseleave", function(){
    dragable = false;
  });
  cnvs.addEventListener("mousemove", function(e){
    if(dragable){
      let xMargin = Math.abs(startPoint.x - e.offsetX);
      let yMargin = Math.abs(startPoint.y - e.offsetY);
      if(startPoint.x > e.offsetX){
        worldLayer.position.x = wlStartPoint.x - xMargin;
      }else{
        worldLayer.position.x = wlStartPoint.x + xMargin;
      }

      if(startPoint.y > e.offsetY){
        worldLayer.position.y = wlStartPoint.y - yMargin;
      }else{
        worldLayer.position.y = wlStartPoint.y + yMargin;
      }
    }
  });
};

init();
