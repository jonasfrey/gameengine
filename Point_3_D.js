// import me like this <script src="..." type="module"></script>
// ^ if you get: Uncaught SyntaxError: Unexpected token {
// ^ if you get: Uncaught SyntaxError: Unexpected token export
/*
import {
  IsDependingOn
}
from './IsDependingOn.js';
*/

class Point_3_D {

  constructor(x,y,z) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
    this.to_string_seperator = "|";
    console.log(this + "was constructed");
  }


  /**
   * @param {int} index 
   * @param {int} w 
   * @returns {array} [x,y]
   */
  get_x_y_by_1_d_array_index_w(index, w) {
    var x = index % w;
    var y = parseInt(index / w);
    return [x, y]
  }
  /**
   * alias 
   */
  get_x_y(index, w) {
    return this.get_x_y_by_1_d_array_index_w(index, w);
  }
  /**
   * 
   * @param {float} x 
   * @param {float} y 
   * @param {int} w 
   * @returns {int} index
   */
  get_1_d_array_index_by_x_y_w(x, y, w) {
    return y * w + x;
  }
  /**
   * alias 
   */
  get_1_d_array_index(x, y, w) {
    return this.get_1_d_array_index_by_x_y_w(x, y, w)
  }


  /**
   * @param {int} index 
   * @param {int} w 
   * @param {int} h
   * @returns {array} [x,y]
   */
  get_x_y_z_by_1_d_array_index_w_h(index, w, h) {
    var x = index % w;
    var y = parseInt((index%h) / w);
    var z = index % (w * h);
    return [x, y, z]
  }
  /**
   * alias 
   */
  get_x_y_z(index, w, h) {
    return this.get_x_y_z_by_1_d_array_index_w_h(index, w, h);
  }

  /**
   * 
   * @param {float} x 
   * @param {float} y 
   * @param {float} z 
   * @param {int} w 
   * @param {int} h 
   * @returns {int} index
   */
  get_1_d_array_index_by_x_y_z_w_h(x, y, z, w, h) {
    return z * (w * h) + y * w + x 
  }

  /**
   * alias 
   */
  get_1_d_array_index(x, y, z, w, h) {
    return this.get_1_d_array_index_by_x_y_z_w_h(x, y, z, w, h)
  }

  to_x_y_string(){
    return this.x + this.to_string_seperator + this.y
  }

  to_x_y_z_string(){
    return this.x + this.to_string_seperator + this.y + this.to_string_seperator + this.z
  }

  int_parsed_to_x_y_string(){
    return parseInt(this.x) + this.to_string_seperator + parseInt(this.y)
  }

  int_parsed_to_x_y_z_string(){
    return parseInt(this.x) + this.to_string_seperator + parseInt(this.y) + this.to_string_seperator + parseInt(this.z)
  }

}

export {
  Point_3_D
}