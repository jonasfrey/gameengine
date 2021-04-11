// import me like this <script src="..." type="module"></script>
// ^ if you get: Uncaught SyntaxError: Unexpected token {
// ^ if you get: Uncaught SyntaxError: Unexpected token export
/*
import {
  IsDependingOn
}
from './IsDependingOn.js';
*/
import { Pixel_Drawer_Point_3_D } from './Pixel_Drawer_Point_3_D.js';
//import {Point_3_D} from './Point_3_D.js';

class Points_Object {
  
  constructor(multiline_string){
      this.multiline_string = multiline_string;
      this._origin_pixel_drawer_points = []
      this.pixel_drawer_points = []
      this.width = 0;
      this.height = 0;
      this.depth = 0;
      
      this.z_layer_separator = "-";

      this.pixel_drawer_points = this.get_points_by_multiline_string(this.multiline_string);

      this._origin_pixel_drawer_points_json_copy = this.json_copy(this.pixel_drawer_points)
      //this._original_points = JSON.parse(JSON.stringify(this.points))

      console.log(this + "was constructed");
  }
  get relative_center_x(){
    return parseInt(this.width / 2)
  }
  get relative_center_y(){
    return parseInt(this.height / 2)
  }

  /**
   *|ms:
   *|`    z is 0 
   *|x x  <- y = 0
   *| x   <- y = 1
   *|x x  <- y = 2
   * 
   * 012
   * ^^^
   * |||
   * xxx
   *|-    <- dash separator for ading a z layer
   *      z is 1
   * xxx 
   *| x 
   *|x x
   *| x 
   *|-
   *|     z is 2 
   *|x x
   *| x 
   *|x x
   * this would create a 3d cube, 
   * the x and y axis can be filled by any character for example "x" => true and " " => false
   * the z layers are separated by a single dash "-"
   * 
   * `
   * 
   * @param {string} multiline_string 
   */
  get_points_by_multiline_string(multiline_string){
    var points = [];
    var z_layers_multiline_strings = multiline_string.split('-');
    for(var z in z_layers_multiline_strings){
      // take max z as depht
      if(z >= this.depth){
        this.depth = parseInt(z)+1;//+1 because index starts with 0
      }

      var multiline_string = z_layers_multiline_strings[z];
      points = points.concat(this.get_points_by_multiline_string_x_y(multiline_string, z))
    }

    return points;
  }

  get_points_by_multiline_string_x_y(multiline_string, z){
    //console.log("get_points_by_multiline_string_x_y called");
    var points = [];
    //split by lines 
    var lines = multiline_string.split(/\r?\n/);
    if(lines[0].length == 0){
      // since it is more visually visual when the second line of the multiline_string is used as the first line
      lines.shift();
    }

    for(var y in lines){
      var line = lines[y];
      //split by characters
      var characters = line.split('');
      if(characters.length == 0){ // skip last line
        continue;
      }
      // take max y as height
      if(y >= this.height){
        this.height = parseInt(y)+1;//+1 because index starts with 0
      }
      // take max x as width
      if(x >= this.width){
        this.width = parseInt(x)+1;//+1 because index starts with 0
      }
      for(var x in characters){
        var character = characters[x];
        //space == false, any character == true
        if(character != " "){
          points.push(new Pixel_Drawer_Point_3_D(x,y,z))
        }
      }
    }
    return points;
  }

  get_fractal_points(iterations){

    var points = this.pixel_drawer_points;

    for(var i = 0; i<iterations; i++){
      points = this.get_points_by_points_haha_lol(points);
    }

    return points;
  }
  get_points_by_points_haha_lol(points){
    var n_points = []
    for(var key in points){
      var point = points[key];
      var offset_x = point.x * this.width;
      var offset_y = point.y * this.height;
      var offset_z = point.z * this.depth;
      for(var k2 in this.pixel_drawer_points){
        // get another set of points offset by current point
        var p2 = this.pixel_drawer_points[k2];
        n_points.push(new Pixel_Drawer_Point_3_D(offset_x + p2.x, offset_y + p2.y ,offset_z + p2.z))

      }
  
    }

    return n_points;

  }
  json_copy(data){
    return JSON.parse(JSON.stringify(data))
  }
  /**
   * transformation matrix stuff 
   * values should not be 0 when using referenced objects in the array, since a factor of 0 would eliminated the origin data 
   * @param {*} a 
   * @param {*} b 
   * @param {*} c 
   * @param {*} d 
   * @param {*} points 
   * @returns 
  */
  get_transformed_points(a, b, c, d, points ){

    if(points == undefined){
      var points = this.json_copy(this.pixel_drawer_points)
    }else{
      points = this.json_copy(points)
    }

    for(var key in points){
      var point = points[key];

      var n_x = a*point.x + b* point.y;
      var n_y = c*point.x + d*point.y;
  
      point.x = n_x;
      point.y = n_y;

    }

    return points;
  }
  get_translated_points(a, b, points){
    
    if(points == undefined){
      var points = this.json_copy(this.pixel_drawer_points)
    }else{
      points = this.json_copy(points)
    }

    for(var key in points){
      var point = points[key];

      var n_x = point.x + a;
      var n_y = point.y + b;
  
      point.x = n_x;
      point.y = n_y;

    }

    return points;
  }
  /**
   * 
   * @param {degrees} deg 
   * @param {array} points 
   * @returns 
   */
  get_rotated_points_around_center_by_degrees(deg, points){
    var radians = Math.PI*2/360*deg;
    return this.get_rotated_points_around_center_by_radians(radians, points);
  }
  get_rotated_points_around_center_by_radians(rad, points){

    //Translate your points such that the center is the new origin:

    var tpts = this.get_translated_points(parseInt(-this.width/2), parseInt(-this.height/2), points);

    var rpts = this.get_rotated_points_by_radians(rad , tpts);

    var tpts = this.get_translated_points(parseInt(this.width/2), parseInt(this.height/2), rpts);

    return tpts;

  }
  get_rotated_points_by_degrees(degrees, points){
    var radians = Math.PI*2/360*degrees;
    return this.get_rotated_points_by_radians(radians, points);
  }
  get_rotated_points_by_radians(rad, points){
    return this.get_transformed_points(Math.cos(rad), -Math.sin(rad), Math.sin(rad), Math.cos(rad), points)
  }

  get_scaled_points(w, h, points){
    return this.get_transformed_points(w, 0, 0, h, points)
  }

  /**
   * 
   * this is obsolete since pixel_drawer_point_3_d.destroy() can be used 
   */
  delete_point_by_point(point){
      var i = 0;
      while (this.pixel_drawer_points[i] !== point) { i++; }
      this.pixel_drawer_points.splice(i, 1);
    };
  
}
export { Points_Object } 