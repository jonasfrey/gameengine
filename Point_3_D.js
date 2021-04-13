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

    this._delta_x = parseFloat(x);
    this._delta_y = parseFloat(y);
    this._delta_z = parseFloat(z);
    
    this._delta_history_x = []
    this._delta_history_y = []
    this._delta_history_z = []

    this.dimension_variables = ["x","y","z"]
    for(var key in this.dimension_variables){

      let dv = this.dimension_variables[key];

      Object.defineProperty(this, dv, {
        get : function () {
          if(this.parse_to_integer){ return parseInt(this["_"+dv])}
          return parseFloat(this["_"+dv]);
        },
        set : function(val){
          this["last_"+dv] = this["_"+dv];
          this["_"+dv] = val;
          this["_delta_history_"+dv].push(-1*(val-this["last_"+dv]))
        }
      });

      // Object.defineProperty(this, "last_"+dv, {
      //   get : function () {
      //     return this["_delta_history_"+dv][this["_delta_history_"+dv].length-1];
      //   }
      // });
      Object.defineProperty(this, "delta_"+dv, {
        get : function () {
          return this["_delta_history_"+dv].reduce((a, b) => a - b, 0)
        }
      });

    }
  
    this.to_string_seperator = "|";
    this.parse_to_integer = Point_3_D.parse_to_integer;
    console.log(this + "was constructed");
  }

  clear_delta_history(){

    for(var key in this.dimension_variables){
      let dv = this.dimension_variables[key];
      this["_delta_history_"+dv] = [];
    }
  }
  // /**
  //  * we have to pass object and cannot use this, since it would recursivly execute copy_object function i believe
  //  * create a copy of this object 
  //  */
  copy(){

    //return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    //return Object.assign(Object.create(Object.getPrototypeOf(this)), {})
    var o = Object.assign({}, this);
    o.copy = this.copy;
    
    return o

    // for(var key in this){
    //   // the propery 'copy' is not iterated through here ? :0
    //   o[key] = this[key];
    // }
    // return o;
  }
  // copy_object(object){
  //   var o = {};
  //   for(var key in object){
  //     o[key] = object[key];
  //   }
  //   return o;
  // }
  //x 
  
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