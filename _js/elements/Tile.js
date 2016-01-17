'use strict';

export default class Tile extends paper.Path {

  constructor(radius){
    super();

    this.strokeColor = '#000000';

    let points = 6;
    let angle = ((2 * Math.PI) / points);

    for(let i = 0; i <= points; i++) {
      this.add(new paper.Point(
        radius * Math.cos((angle * i)+11), //+11 to turn
        radius * Math.sin((angle * i)+11)
      ));
    }

  }
}
