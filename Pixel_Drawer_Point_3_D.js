// import me like this <script src="..." type="module"></script>
// ^ if you get: Uncaught SyntaxError: Unexpected token {
// ^ if you get: Uncaught SyntaxError: Unexpected token export
/*
import {
  IsDependingOn
}
from './IsDependingOn.js';
*/

import { Point_3_D } from "./Point_3_D.js";

/**
 * pixel_drawer will have access to Pixel_Drawer_Point_3_D.instances 
 * so any change to a reference will affect the drawed/rendered result
 */

class Pixel_Drawer_Point_3_D extends Point_3_D{

  constructor(x,y,z, hue = 1, brightness = 1) {
    
    super(x,y,z);
    //this.point_3_d = new Point_3_D(x,y,z);
    Pixel_Drawer_Point_3_D.instances.push(this);
    
    this.brightness = brightness;
    this.hue = hue;
  }

}

Pixel_Drawer_Point_3_D.prototype.destroy = function () {
  var i = 0;
  while (Pixel_Drawer_Point_3_D.instances[i] !== this) { i++; }
  Pixel_Drawer_Point_3_D.instances.splice(i, 1);
};

Pixel_Drawer_Point_3_D.instances = []

export {
  Pixel_Drawer_Point_3_D
}