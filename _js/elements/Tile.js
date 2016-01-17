'use strict';

export default class Tile{

  constructor(radius){
    let hexagon = new paper.Path();
    hexagon.strokeColor = '#000000';

    let points = 6;
    let angle = ((2 * Math.PI) / points);

    for(let i = 0; i <= points; i++) {
      hexagon.add(new paper.Point(
        radius * Math.cos(angle * i),
        radius * Math.sin(angle * i)
      ));
    }

  }
}
