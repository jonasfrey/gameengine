


    //import {Tone} from "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.15/Tone.js";
    import {Points_Object} from './Points_Object.js';
    import {Pixel_Drawer} from './Pixel_Drawer.js';
    import {Point_3_D}from './Point_3_D.js';
    import {Game_Object} from './Game_Object.js';
    import {Pixel_Drawer_Point_3_D} from './Pixel_Drawer_Point_3_D.js';


class Game {

  constructor(){
    
    this.pixel_drawer = new Pixel_Drawer(document.querySelector("canvas#game"));
    
    //we pass the reference here 
    this.pixel_drawer.pixels = Pixel_Drawer_Point_3_D.instances;

    this.console_output_html_element = document.createElement("div");
    this.console_output_html_element.className = "game_console"
    this.console_output_html_element.style.whiteSpace = "pre"
    
    document.documentElement.append(this.console_output_html_element);


    var per_width = 10;
    
    var self = this;

    this.pixel_drawer.scale_x = 3;
    this.pixel_drawer.scale_y = 3;

    this.render_id = 0;
    this.fps = 60;
    this.render_delta_limit_ms = 1000/this.fps;
    this.render_delta_ms = 0;
    this.performance_now = performance.now();
    this.performance_then = performance.now();
    this.keydownsups = JSON.parse('{\"key_Backspace\":{\"down\":false},\"keyCode_8\":{\"down\":false},\"key_Tab\":{\"down\":false},\"keyCode_9\":{\"down\":false},\"key_Enter\":{\"down\":false},\"keyCode_13\":{\"down\":false},\"key_Shift\":{\"down\":false},\"keyCode_16\":{\"down\":false},\"key_Control\":{\"down\":false},\"keyCode_17\":{\"down\":false},\"key_Alt\":{\"down\":false},\"keyCode_18\":{\"down\":false},\"key_Pause\":{\"down\":false},\"keyCode_19\":{\"down\":false},\"key_CapsLock\":{\"down\":false},\"keyCode_20\":{\"down\":false},\"key_Escape\":{\"down\":false},\"keyCode_27\":{\"down\":false},\"key_\":{\"down\":false},\"keyCode_32\":{\"down\":false},\"key_PageUp\":{\"down\":false},\"keyCode_33\":{\"down\":false},\"key_PageDown\":{\"down\":false},\"keyCode_34\":{\"down\":false},\"key_End\":{\"down\":false},\"keyCode_35\":{\"down\":false},\"key_Home\":{\"down\":false},\"keyCode_36\":{\"down\":false},\"key_ArrowLeft\":{\"down\":false},\"keyCode_37\":{\"down\":false},\"key_ArrowUp\":{\"down\":false},\"keyCode_38\":{\"down\":false},\"key_ArrowRight\":{\"down\":false},\"keyCode_39\":{\"down\":false},\"key_ArrowDown\":{\"down\":false},\"keyCode_40\":{\"down\":false},\"key_PrintScreen\":{\"down\":false},\"keyCode_44\":{\"down\":false},\"key_Insert\":{\"down\":false},\"keyCode_45\":{\"down\":false},\"key_Delete\":{\"down\":false},\"keyCode_46\":{\"down\":false},\"key_0\":{\"down\":false},\"keyCode_48\":{\"down\":false},\"key_1\":{\"down\":false},\"keyCode_49\":{\"down\":false},\"key_2\":{\"down\":false},\"keyCode_50\":{\"down\":false},\"key_3\":{\"down\":false},\"keyCode_51\":{\"down\":false},\"key_4\":{\"down\":false},\"keyCode_52\":{\"down\":false},\"key_5\":{\"down\":false},\"keyCode_53\":{\"down\":false},\"key_6\":{\"down\":false},\"keyCode_54\":{\"down\":false},\"key_7\":{\"down\":false},\"keyCode_55\":{\"down\":false},\"key_8\":{\"down\":false},\"keyCode_56\":{\"down\":false},\"key_9\":{\"down\":false},\"keyCode_57\":{\"down\":false},\"key_a\":{\"down\":false},\"keyCode_65\":{\"down\":false},\"key_b\":{\"down\":false},\"keyCode_66\":{\"down\":false},\"key_c\":{\"down\":false},\"keyCode_67\":{\"down\":false},\"key_d\":{\"down\":false},\"keyCode_68\":{\"down\":false},\"key_e\":{\"down\":false},\"keyCode_69\":{\"down\":false},\"key_f\":{\"down\":false},\"keyCode_70\":{\"down\":false},\"key_g\":{\"down\":false},\"keyCode_71\":{\"down\":false},\"key_h\":{\"down\":false},\"keyCode_72\":{\"down\":false},\"key_i\":{\"down\":false},\"keyCode_73\":{\"down\":false},\"key_j\":{\"down\":false},\"keyCode_74\":{\"down\":false},\"key_k\":{\"down\":false},\"keyCode_75\":{\"down\":false},\"key_l\":{\"down\":false},\"keyCode_76\":{\"down\":false},\"key_m\":{\"down\":false},\"keyCode_77\":{\"down\":false},\"key_n\":{\"down\":false},\"keyCode_78\":{\"down\":false},\"key_o\":{\"down\":false},\"keyCode_79\":{\"down\":false},\"key_p\":{\"down\":false},\"keyCode_80\":{\"down\":false},\"key_q\":{\"down\":false},\"keyCode_81\":{\"down\":false},\"key_r\":{\"down\":false},\"keyCode_82\":{\"down\":false},\"key_s\":{\"down\":false},\"keyCode_83\":{\"down\":false},\"key_t\":{\"down\":false},\"keyCode_84\":{\"down\":false},\"key_u\":{\"down\":false},\"keyCode_85\":{\"down\":false},\"key_v\":{\"down\":false},\"keyCode_86\":{\"down\":false},\"key_w\":{\"down\":false},\"keyCode_87\":{\"down\":false},\"key_x\":{\"down\":false},\"keyCode_88\":{\"down\":false},\"key_y\":{\"down\":false},\"keyCode_89\":{\"down\":false},\"key_z\":{\"down\":false},\"keyCode_90\":{\"down\":false},\"key_Meta\":{\"down\":false},\"keyCode_91\":{\"down\":false},\"keyCode_92\":{\"down\":false},\"key_ContextMenu\":{\"down\":false},\"keyCode_93\":{\"down\":false},\"keyCode_96\":{\"down\":false},\"keyCode_97\":{\"down\":false},\"keyCode_98\":{\"down\":false},\"keyCode_99\":{\"down\":false},\"keyCode_100\":{\"down\":false},\"keyCode_101\":{\"down\":false},\"keyCode_102\":{\"down\":false},\"keyCode_103\":{\"down\":false},\"keyCode_104\":{\"down\":false},\"keyCode_105\":{\"down\":false},\"key_*\":{\"down\":false},\"keyCode_106\":{\"down\":false},\"key_+\":{\"down\":false},\"keyCode_107\":{\"down\":false},\"key_-\":{\"down\":false},\"keyCode_109\":{\"down\":false},\"key_.\":{\"down\":false},\"keyCode_110\":{\"down\":false},\"key_/\":{\"down\":false},\"keyCode_111\":{\"down\":false},\"key_F1\":{\"down\":false},\"keyCode_112\":{\"down\":false},\"key_F2\":{\"down\":false},\"keyCode_113\":{\"down\":false},\"key_F3\":{\"down\":false},\"keyCode_114\":{\"down\":false},\"key_F4\":{\"down\":false},\"keyCode_115\":{\"down\":false},\"key_F5\":{\"down\":false},\"keyCode_116\":{\"down\":false},\"key_F6\":{\"down\":false},\"keyCode_117\":{\"down\":false},\"key_F7\":{\"down\":false},\"keyCode_118\":{\"down\":false},\"key_F8\":{\"down\":false},\"keyCode_119\":{\"down\":false},\"key_F9\":{\"down\":false},\"keyCode_120\":{\"down\":false},\"key_F10\":{\"down\":false},\"keyCode_121\":{\"down\":false},\"key_F11\":{\"down\":false},\"keyCode_122\":{\"down\":false},\"key_F12\":{\"down\":false},\"keyCode_123\":{\"down\":false},\"key_NumLock\":{\"down\":false},\"keyCode_144\":{\"down\":false},\"key_ScrollLock\":{\"down\":false},\"keyCode_145\":{\"down\":false},\"key_AudioVolumeMute\":{\"down\":false},\"keyCode_173\":{\"down\":false},\"key_AudioVolumeDown\":{\"down\":false},\"keyCode_174\":{\"down\":false},\"key_AudioVolumeUp\":{\"down\":false},\"keyCode_175\":{\"down\":false},\"key_LaunchMediaPlayer\":{\"down\":false},\"keyCode_181\":{\"down\":false},\"key_LaunchApplication1\":{\"down\":false},\"keyCode_182\":{\"down\":false},\"key_LaunchApplication2\":{\"down\":false},\"keyCode_183\":{\"down\":false},\"key_;\":{\"down\":false},\"keyCode_186\":{\"down\":false},\"key_=\":{\"down\":false},\"keyCode_187\":{\"down\":false},\"key_,\":{\"down\":false},\"keyCode_188\":{\"down\":false},\"keyCode_189\":{\"down\":false},\"keyCode_190\":{\"down\":false},\"keyCode_191\":{\"down\":false},\"key_`\":{\"down\":false},\"keyCode_192\":{\"down\":false},\"key_[\":{\"down\":false},\"keyCode_219\":{\"down\":false},\"key_\\\\\":{\"down\":false},\"keyCode_220\":{\"down\":false},\"key_]\":{\"down\":false},\"keyCode_221\":{\"down\":false},\"key_\'\":{\"down\":false},\"keyCode_222\":{\"down\":false}}')
    this.audio_context = new AudioContext();


    /**
     * used for detecting collisions
     * [
     *       if a array has two items a collision has occured
     *  [[x0] [x1, x1]] y 1  
     *  []
     *  [] 
     * ] */
    this.collision_array = [];
    this.collision_objects = {};
    this._last_rendered_collision_objects = {};

    this.audio_context_muted = true;
    this.audio_context_button = document.querySelector("#audio_context");
    this.audio_context_button.onclick = function(){
        self.audio_context_muted = !self.audio_context_muted;
        if(self.audio_context_muted){
            self.audio_context_button.innerText = "no sound";
        }else{
            self.audio_context_button.innerText = "sound";
        }
        
        self.audio_context.resume().then(() => {
            console.log('Playback resumed successfully');


        });

    }

    var game = this;

    var self = this;

    document.onkeydown = function(){
        var e = e || window.event;

        self.keymap_keydownsups(e, self)
    }
    document.onkeyup = function(){
        var e = e || window.event;

        self.keymap_keydownsups(e, self)
    }
      console.log(this + "was constructed");
    }
    
    keymap_keydownsups(e, self){
        var o = this.keydownsups["key_"+e.key];
        this.keydownsups["keyCode_"+e.keyCode] = o;

        if(e.type == "keydown"){
            o.down = true;
            o.keydown_performance_now = performance.now();
        }
        if(e.type == "keyup"){
            o.down = false;
            o.keyup_performance_now = performance.now();
        }
    }

    render(){

        // this.pixel_drawer.clear() would pixel_drawer.point = []
        // so we have to use clear_canvas() only since pixel_drawer.pixels is a Pixel_Drawer_Point_3_D.instances
        // when a Pixel_Drawer_Point_3_D instance will be destroyed its automatically destroyed in the pixel_drawers.pixels array
        this.pixel_drawer.clear_canvas()
        
        this.collision_array = []
        //this._last_rendered_collision_objects = JSON.parse(JSON.stringify(this.collision_objects))
        this._last_rendered_collision_objects = {...this.collision_objects}
        this.collision_objects = {}

        //console.log(this.render_id)

        for(var key in Game_Object.instances){
            var o = Game_Object.instances[key];
            
            o._last_rendered_this_json_position_point_3_d = JSON.parse(JSON.stringify(o.position_point_3_d))

            o.render_id ++; 
            if(o.render_id_limit > 0 && o.render_id >= o.render_id_limit){
                o.destroy();
                //delete o;
                continue;
            }

            //must be called before render_function
            o.calculate_point_3_d();

            o.render_function();
            
            //o.transform_points_by_delta();
            
            o.transform_points_by_absolute();

            /**
             * get the
             *      translated
             *      rotated
             *      scaled (explosion effec)
             *      etc...
             * points
             * */

            //detect collisions

            // tthis points will not be the same as o.points_object.points ! var points = o.points_object.get_rotated_points_around_center_by_radians(o.rotation_point_3_d.x, o.points_object.points);
            // this is dangerous because for example points_object.delete_point_by_point(point) won't work
            
            // tmp disable collisions

            for(var key in o.points_object.points){
                var point = o.points_object.points[key];
                if(this.collision_objects[point.int_parsed_to_x_y_string()] == undefined){
                    this.collision_objects[point.int_parsed_to_x_y_string()] = [];
                } 
                this.collision_objects[point.int_parsed_to_x_y_string()].push(
                        {
                            game_object: o,
                            point_3_d: point,
                        }
                    )
            }
            
            //o.render_function();

        }
        //tmp disable collisions
        for(var key in this.collision_objects){
            var collision_objects_on_point_3_d = this.collision_objects[key];
            //a collision has occured if  => 23|32 : [{...}, {...}] two objects
            //if array has only one object, no collision has occured on this int parsed point_3_d => 23|32 : [{...}] only one object 
            
            if(collision_objects_on_point_3_d.length<=1){
                continue;
            }

            for(var key in collision_objects_on_point_3_d){

                var collision_object_on_point_3_d = collision_objects_on_point_3_d[key];
                
                var other_collision_objects_on_point_3_d = collision_objects_on_point_3_d.filter(
                    asdf => asdf != collision_object_on_point_3_d
                    );

                // // a collision of two pixels of the same object can occur  
                // // when an object is rotated two pixels may get 2.3¦4.4
                // // and 2.1¦4.1 and then parseInt() since no subpixel 
                // // rendering will make integers out of floats
                // var other_collision_objects_game_object_on_point_3_d = other_collision_objects_on_point_3_d.filter(
                //     asdf => asdf.game_object != collision_object_on_point_3_d.game_object
                //     )
                // if(other_collision_objects_game_object_on_point_3_d.length > 1){
                //     collision_object_on_point_3_d.game_object.collision_function(other_collision_objects_game_object_on_point_3_d)
                // }

                collision_object_on_point_3_d.game_object.collision_function(other_collision_objects_on_point_3_d)

                
            }
        }
        //debugger;
        this.pixel_drawer.render_pixel_drawer_point_3_d_instances();
    }

    get_bar_str(min, max, val, character_width){
        var range = max-min;
        var width = character_width / range * val;
        var str_str = ""
        for(var i = 0; i<max; i++){
            if(i< val){
                str_str += "■"
            }else{
                str_str += " "
            }
        }
        return "["+str_str+"]"
    }
    
    render_loop(){

        //console.log("render_loop was called");

        this.performance_now = performance.now();
        this.render_delta_ms = Math.abs(this.performance_now - this.performance_then)

        if(this.render_delta_ms > this.render_delta_limit_ms){
        
            this.console_text = "render_delta_ms (0-40): " + parseInt(this.render_delta_ms)+"\n"
            this.console_text   = this.get_bar_str(0, 40, this.render_delta_ms, 15)+"\n"
            this.console_output_html_element.innerText = this.console_text;
            this.console_output_html_element.scrollTop = this.console_output_html_element.scrollHeight;
            
            this.render();
            
            this.performance_then = this.performance_now;
        }

        this.render_id = requestAnimationFrame(this.render_loop.bind(this));
    }
    /**
     * honk honk 
     * performs a so called vector addition
     * @param {string} type 
     */
    start_rendering(type){
        this.render_id = requestAnimationFrame(this.render_loop.bind(this));

    }
    stop_rendering(type){
        cancelAnimationFrame(this.render_id)
    }


}

export { Game } 