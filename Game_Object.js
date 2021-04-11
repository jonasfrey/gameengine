// import me like this <script src="..." type="module"></script>
// ^ if you get: Uncaught SyntaxError: Unexpected token {
// ^ if you get: Uncaught SyntaxError: Unexpected token export
/*
import {
  IsDependingOn
}
from './IsDependingOn.js';
*/

import {
  Points_Object
}
from './Points_Object.js';

import {
  Point_3_D
}
from './Point_3_D.js';

class Game_Object {
  constructor(multiline_string){
      
      Game_Object.instances.push(this);


      if(multiline_string != ""){
        this.multiline_string = multiline_string || `x`
        this.points_object = new Points_Object(this.multiline_string)
      }
      
      //position
      this.position_point_3_d = new Point_3_D(0,0,0);
      this.position_velocity_point_3_d = new Point_3_D(0,0,0);
      this.position_acceleration_point_3_d = new Point_3_D(0,0,0);

      /**
       * unfortunately cloning an object without reference is not that easy
       * spreading does not work this._last_rendered_position_point_3_d = {...this.position_point_3_d}
       * 
       * neither does Object.assign({}, this.position_point_3_d)
       * 
       * Object.create(origin_object); does still not work its still a reference 
       */
      this._last_rendered_position_point_3_d = Object.create(this.position_point_3_d);
      //rotation
      this.rotation_point_3_d = new Point_3_D(0,0,0);
      this.rotation_velocity_point_3_d = new Point_3_D(0,0,0);
      this.rotation_acceleration_point_3_d = new Point_3_D(0,0,0);
      
      //scale
      this.scale_point_3_d = new Point_3_D(1,1,1); // must be 1 1 1 since scaling of 0 would be 0 
      this.scale_velocity_point_3_d = new Point_3_D(0,0,0);
      this.scale_acceleration_point_3_d = new Point_3_D(0,0,0);

      this.render_id_limit = 0;
      this.render_id = 0; 
      
      this.collision_function = function(){return false}
      this.render_function = function(){return false}
    
      
      console.log(this + "was constructed");
    }

    get hue(){
      return this._hue;
    }
    set hue(val){
      this._hue = val;
      for(var key in this.points_object.pixel_drawer_points){
        this.points_object.pixel_drawer_points[key].hue = val;
      }
      
    }

    delete_point_by_object(point_object){
      for(var key in this.points_object.points){

        var point = this.points_object.points[key];
        if(point_object == point){ 
          this.points_object.points.splice(key, 1);
          return true;
          //return delete point;
        }
      }
    }

    delete_point_by_x_y_z(x,y,z){
      var z = z || 0;
      
      var x = parseInt(x - this.position_point_3_d.x);
      var y = parseInt(y - this.position_point_3_d.y);
      var z = parseInt(z - this.position_point_3_d.z);
      
      for(var key in this.points_object.points){

        var point = this.points_object.points[key];
        if(point.x == x && point.y == y && point.z == z){ 
          point = null;
          //return delete point;
        }
      }
    }
    /**
     * honk honk 
     * performs a so called vector addition
     * @param {string} type 
     */
    calculate_point_3_d(type){
      var types = [type];
      if(!type){
        var types = ["position", "rotation", "scale"];
      }
      // set last rendered point 
      
      this._last_rendered_position_point_3_d.x = this.position_point_3_d.x
      this._last_rendered_position_point_3_d.y = this.position_point_3_d.y
      this._last_rendered_position_point_3_d.z = this.position_point_3_d.z

      for(var key in types){
        var type = types[key];
        
        
        // calc velocity vector
        this[type+"_velocity_point_3_d"].x = this[type+"_velocity_point_3_d"].x + this[type+"_acceleration_point_3_d"].x
        this[type+"_velocity_point_3_d"].y = this[type+"_velocity_point_3_d"].y + this[type+"_acceleration_point_3_d"].y
        this[type+"_velocity_point_3_d"].z = this[type+"_velocity_point_3_d"].z + this[type+"_acceleration_point_3_d"].z

        // calc point vector
        this[type+"_point_3_d"].x = this[type+"_point_3_d"].x + this[type+"_velocity_point_3_d"].x
        this[type+"_point_3_d"].y = this[type+"_point_3_d"].y + this[type+"_velocity_point_3_d"].y
        this[type+"_point_3_d"].z = this[type+"_point_3_d"].z + this[type+"_velocity_point_3_d"].z




      }

      // now translate, rotate or scale the pixel object

      //first rotate the points, take the _orign points for that
      var rotated_points = this.points_object.get_rotated_points_around_center_by_radians(this.rotation_point_3_d.x, this.points_object._origin_pixel_drawer_points_json_copy)

      // continue by mmanipulating the scale 
      // i dont know yet what axis to take for a rotation from top down view
    
      var scaled_points = this.points_object.get_scaled_points(this.scale_point_3_d.x, this.scale_point_3_d.y,rotated_points);

      //trying only translation
      var translated_points = this.points_object.get_translated_points(this.position_point_3_d.x, this.position_point_3_d.y, scaled_points)
      
      // now we have to apply the transformation to the actuall points
      for(var k in translated_points){
        var p = translated_points[k];
        this.points_object.pixel_drawer_points[k].x = p.x;
        this.points_object.pixel_drawer_points[k].y = p.y;
        this.points_object.pixel_drawer_points[k].z = p.z;
      }


    }

}
Game_Object.prototype.destroy = function () {
  var i = 0;
  while (Game_Object.instances[i] !== this) { i++; }
  Game_Object.instances[i].points_object.destroy_points();
  Game_Object.instances.splice(i, 1);
};

Game_Object.instances = []
export { Game_Object } 