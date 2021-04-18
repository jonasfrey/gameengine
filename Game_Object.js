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

      this.transformation_types = ["position", "rotation", "scale"];
      //TODO implement velocity and acceleration for graphical_transformation_types aswell
      this.graphical_transformation_types = ["hue", "saturation", "brightness"]

      this.speed_types = ["velocity", "acceleration"];


      if(multiline_string != ""){
        this.multiline_string = multiline_string || `x`
        this.points_object = new Points_Object(this.multiline_string)
      }
      
      this.basic_speed_object = {speed:1};
      //position
      this.position_point_3_d = new Point_3_D(0,0,0);
      this.position_velocity_point_3_d = new Point_3_D(0,0,0);
      this.position_acceleration_point_3_d = new Point_3_D(0,0,0);

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
    get brightness(){
      return this._hue;
    }
    set brightness(val){
      this._brightness = val;
      for(var key in this.points_object.pixel_drawer_points){
        this.points_object.pixel_drawer_points[key].brightness = val;
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
        var types = this.transformation_types;
      }


      for(var key in types){
        var type = types[key];
        
        
        // calc velocity vector
        this[type+"_velocity_point_3_d"].x = parseFloat(this[type+"_velocity_point_3_d"]._x + this.basic_speed_object.speed * this[type+"_acceleration_point_3_d"]._x)
        this[type+"_velocity_point_3_d"].y = parseFloat(this[type+"_velocity_point_3_d"]._y + this.basic_speed_object.speed * this[type+"_acceleration_point_3_d"]._y)
        this[type+"_velocity_point_3_d"].z = parseFloat(this[type+"_velocity_point_3_d"]._z + this.basic_speed_object.speed * this[type+"_acceleration_point_3_d"]._z)

        // calc point vector
        this[type+"_point_3_d"].x = parseFloat(this[type+"_point_3_d"]._x + this.basic_speed_object.speed * this[type+"_velocity_point_3_d"]._x)
        this[type+"_point_3_d"].y = parseFloat(this[type+"_point_3_d"]._y + this.basic_speed_object.speed * this[type+"_velocity_point_3_d"]._y)
        this[type+"_point_3_d"].z = parseFloat(this[type+"_point_3_d"]._z + this.basic_speed_object.speed * this[type+"_velocity_point_3_d"]._z)

      }

      // here we have two ways of applying the transformations to the points_object
      // but acutally we should first let the programmer make some changes on the for example position_point_3_d.x y or z to have later access to the correct delta

        // A: we use the origin points of the objedct and apply the absolute value of the transformation
        //this.transform_points_by_absolute();
        // B: we use the actual points of the object and apply the delta value of the transformation 
        //this.transform_points_by_delta(); 

    }
    transform_points_by_absolute(){
      
      // now translate, rotate or scale the pixel object

      //first rotate the points, take the _orign points for that
      //json copy would remove the getters and setters from point_3_d
      //var rotated_points = this.points_object.get_rotated_points_around_center_by_radians(this.rotation_point_3_d.x, this.points_object._origin_pixel_drawer_points_json_copy)

      var rotated_points = this.points_object.get_rotated_points_around_center_by_radians(
        this.rotation_point_3_d.x,
        JSON.parse(JSON.stringify(this.points_object.json_copied_points)) // <- a json copy of the origin points in the constructor function
      );
      
      // continue by mmanipulating the scale 
      // i dont know yet what axis to take for a rotation from top down view
    
      var scaled_points = this.points_object.get_scaled_points(
        this.scale_point_3_d.x,
        this.scale_point_3_d.y,
        rotated_points
        );

      //trying only translation
      var translated_points = this.points_object.get_translated_points(
        this.position_point_3_d.x,
        this.position_point_3_d.y,
        scaled_points
        )

      // now we have to apply the transformation to the actuall points
      for(var k in translated_points){
        
        var p = translated_points[k];
        
        //since we are using json copied points we have to use the "private" props with the underline prefix '_...'
        this.points_object.pixel_drawer_points[k].x = p._x;
        this.points_object.pixel_drawer_points[k].y = p._y;
        this.points_object.pixel_drawer_points[k].z = p._z;
      }


      //this.clear_point_3_d_delta_historys();


    }
    transform_points_by_delta(){
      // now the problem with the delta is the following 
      // the positions for the points have to be recalculated with every change, which can be very processing costy can 
      // this is not very efficient
      // for example the programmer does change the position multiple times
      // code ...
      // game_object.position_point_3_d.x = 0
      // code ...
      // game_object.position_point_3_d.x = 10 -> delta would be 10, should recalculate points
      //... some more code
      // game_object.position_point_3_d.x = 2 -> delta would be 8, should recalculate points
      // ... code
      //game_object.position_point_3_d.x = 15 -> delta would be 13, should recalculate points
      //
      // now if the points get recalculated only with delta 13, the positions are wrong since they were not recalculated forecah delta ! 
      // but since we add every change to the _delta_history array we can get that arrays sum to get the delta :)

     //this.points_object.rotate_points_around_center_by_radians(this.rotation_point_3_d.delta_x)
      // i dont know yet what axis to take for a rotation from top down view    
      //this.points_object.get_scaled_points(this.scale_point_3_d.delta_x, this.scale_point_3_d.delta_y,this.points_object.pixel_drawer_points);
      //trying only translation

      // console.log("pos" +this.points_object.pixel_drawer_points[0].to_string());
      
      // console.log("delta" +this.points_object.pixel_drawer_points[0].delta_to_string());

      // console.log(this.position_point_3_d.x);
      // console.log(this.position_point_3_d.delta_x);

      //this.points_object.scale_points(this.scale_point_3_d._delta_x, this.scale_point_3_d._delta_y)
      //this.points_object.translate_points(this.position_point_3_d._delta_x, this.position_point_3_d._delta_y)
      

      //this.points_object.rotate_points(this.rotation_point_3_d._delta_x)


      //rotate around center 
      this.points_object.translate_points(
        - this.position_point_3_d.x - (this.points_object.width/2),
        - this.position_point_3_d.y - (this.points_object.height/2)
        );

        console.log(this.position_point_3_d.y);

      this.points_object.rotate_points(this.rotation_point_3_d._delta_x);

      this.points_object.translate_points(
        this.position_point_3_d.x + (this.points_object.width/2),
        this.position_point_3_d.y + (this.points_object.height/2)
      );

      this.points_object.translate_points(this.position_point_3_d._delta_x, this.position_point_3_d._delta_y)

      this.clear_point_3_d_delta_historys();
      //after the translation we must clear the delta history of every point_3_d

    }
    clear_point_3_d_delta_historys(){
      for(var key in this.transformation_types){
        var transformation_type = this.transformation_types[key];
        this[transformation_type+"_point_3_d"].clear_delta_history();
        for(var key in this.speed_types){
          var speed_type = this.speed_types[key];
          this[transformation_type+"_"+speed_type+"_point_3_d"].clear_delta_history();
        }
      }
      this.points_object.clear_point_3_d_delta_historys();
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