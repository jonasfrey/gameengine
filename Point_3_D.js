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
    this._x = parseFloat(x);
    this._y = parseFloat(y);
    this._z = parseFloat(z);
    
    this._last_x = parseFloat(x);
    this._last_y = parseFloat(y);
    this._last_z = parseFloat(z);

    this._delta_x = parseFloat(x);
    this._delta_y = parseFloat(y);
    this._delta_z = parseFloat(z);
  
    this.to_string_seperator = "|";
    this.parse_to_integer = Point_3_D.parse_to_integer;
    console.log(this + "was constructed");
  }

  //x 
  get x(){
    if(this.parse_to_integer){ return parseInt(this._x)}
    return this._x;
  }
  set x(val){
    this._last_x = this._x;
    this._x = val;
    this._delta_x = -1 *(this._last_x - this._x);
    return this.x;
  }
  get last_x(){return this._last_x}
  get delta_x(){return this._delta_x}

  //y
  get y(){
    if(this.parse_to_integer){ return parseInt(this._y)}
    return this._y;
  }
  set y(val){
    this._last_y = this._y;
    this._y = val;
    this._delta_y = -1 *(this._last_y - this._y);
    return this.y;
  }
  get last_y(){return this._last_y}
  get delta_y(){return this._delta_y}

  //z
  get z(){
    if(this.parse_to_integer){ return parseInt(this._z)}
    return this._z;
  }
  set z(val){
    this._last_z = this._z;
    this._z = val;
    this._delta_z = -1 *(this._last_z - this._z);
    return this.z;
  }
  get last_z(){return this._last_z}
  get delta_z(){return this._delta_z}


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
    return this._x + this.to_string_seperator + this._y
  }

  to_x_y_z_string(){
    return this._x + this.to_string_seperator + this._y + this.to_string_seperator + this._z
  }

  int_parsed_to_x_y_string(){
    return parseInt(this._x) + this.to_string_seperator + parseInt(this._y)
  }

  int_parsed_to_x_y_z_string(){
    return parseInt(this._x) + this.to_string_seperator + parseInt(this._y) + this.to_string_seperator + parseInt(this._z)
  }

}
Point_3_D.parse_to_integer = false;
export {
  Point_3_D
}