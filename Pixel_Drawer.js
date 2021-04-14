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

class Pixel{
    constructor(x, y, hue, brightness){
        this.x = x;
        this.y = y;
        this.hue = hue || 18;
        this.brightness = brightness || 1;
        if(this.brightness < 0){
            this.brightness = 0;
        }

        return this;
    }
}

class Pixel_Drawer {
    constructor(canvas = undefined) {
        console.log(this + "was constructed");


        if(canvas == undefined){

            this.canvas = document.getElementById('canvas');
        }else{
            this.canvas = canvas;
        }
        
        if (this.canvas == undefined) {
            console.warn("no canvas found, make shure a <canvas> html element exists ! ")
        }

        this.ctx = this.canvas.getContext('2d');

        this.parse_to_integer = Pixel_Drawer.parse_to_integer;

        this.canvas.style.background = "black"; 
        this.clear_color = "hsla(0,0%, 0%, 1)";
        this.scale_x = 1;
        this.scale_y = 1;
        this.grid_offset_x = 0.1;
        this.grid_offset_y = 0.1;
        this.light_color_saturation = 0.9;
        this.backlight_alpha_max = 0.5;
        this.pixels = []
    
        var self = this;

        window.onresize = function(){
            self.resize_canvas();
        };
        self.resize_canvas();

        // return new Proxy(this, {
        //     set(target, name, value) {
        //       let setables = ['light_color_saturation'];
        //       if (!setables.includes(name)) {
        //         throw new Error(`Cannot set the ${name} property`);
        //       } else {
        //         target[name] = value;
        //         return true;
        //       }
        //     }
        //   });
  
    }

    // get light_color_saturation() {
    //     return this._light_color_saturation;
    // }
    // set light_color_saturation(param) {
    //     this._light_color_saturation = param;
    //     this.draw(this.pixels);
    // }

    get pixel_grid_width(){
        return  this.canvas.width / (this.scale_x + (this.scale_x*this.grid_offset_x));
    } 
    get pixel_grid_height(){
        return  this.canvas.height / (this.scale_y + (this.scale_y*this.grid_offset_y));
    } 

    resize_canvas(){

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if(!this.canvas.parentElement == null){
            this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.canvas.height = this.canvas.parentElement.offsetHeight;
        }
        this.ctx.translate(this.canvas.width/2,this.canvas.height/2);
    }

    /**
     * 
     * @param {object} pixel 
     * @returns 
     */
    get_scaled_pixel(pixel) {
        
        pixel.scaled_w = 1 * this.scale_y;
        pixel.scaled_h = 1 * this.scale_x;

        pixel.scaled_x = pixel.x * this.scale_x * (1 + this.grid_offset_x * this.scale_x);
        pixel.scaled_y = pixel.y * this.scale_y * (1 + this.grid_offset_y * this.scale_y);

        if(Pixel_Drawer.parse_to_integer){
            pixel.scaled_x = parseInt(pixel.x) * this.scale_x * (1 + this.grid_offset_x * this.scale_x);
            pixel.scaled_y = parseInt(pixel.y) * this.scale_y * (1 + this.grid_offset_y * this.scale_y);
        }

        return pixel;
    }

    draw_pixel_backlight_new(scaled_pixel){
                // Create gradient
                var x  = scaled_pixel.scaled_x + (scaled_pixel.scaled_w / 2);
                var y = scaled_pixel.scaled_y + (scaled_pixel.scaled_h / 2);
                var radius = this.scale_x * 3* scaled_pixel.brightness;
                var grd = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
                grd.addColorStop(0,"hsla(" + scaled_pixel.hue + ", 50%, " + 50 + "%, 1)");
                grd.addColorStop(1,"transparent");
        
                // Fill with gradient
                this.ctx.fillStyle = grd;
                this.ctx.fillRect(x-radius, y-radius ,radius*2,radius*2);
    }
    draw_pixel_backlight(scaled_pixel) {
        this.draw_pixel_backlight_new(scaled_pixel);
        return 
        //circluar backlight
        var cbs = this.scale_x * 2 * scaled_pixel.brightness;

        for (var i = 0; i < cbs; i++) {
            var alpha_linear_out = 1 - (1 / cbs * i);
            var alpha_eased_expo_out = 1 - Math.pow(2, -10 * alpha_linear_out)
            var alpha = alpha_eased_expo_out;
            var alpha = alpha_linear_out;
            var alpha_calculated = alpha * this.backlight_alpha_max * scaled_pixel.brightness;
            if(alpha_calculated < 0.05){
                continue;
            }
            this.ctx.beginPath();
            this.ctx.ellipse(scaled_pixel.scaled_x + (scaled_pixel.scaled_w / 2), scaled_pixel.scaled_y + (scaled_pixel.scaled_h / 2), (scaled_pixel.scaled_w / 2) + i, (scaled_pixel.scaled_h / 2) + i, 0, 0, Math.PI * 2);
            this.ctx.strokeStyle = "hsla(" + scaled_pixel.hue + ", 50%, " + 50 + "%, " + alpha_calculated + ")";
            this.ctx.stroke();

        }
    }

    draw_pixel_border(scaled_pixel) {

        this.ctx.beginPath();
        this.ctx.lineWidth = this.scale_x / 4;
        this.ctx.strokeStyle = "hsla(" + scaled_pixel.hue + ", 50%, 50%, "+scaled_pixel.brightness+")";
        this.ctx.fillStyle = "hsla(" + scaled_pixel.hue + ", 50%, 50%, "+scaled_pixel.brightness+")";
        this.ctx.strokeWidth = this.scale_x / 2;
        this.ctx.shadowColor = "hsla(" + scaled_pixel.hue + ", 50%, 50%, "+scaled_pixel.brightness+")";

        this.ctx.shadowBlur = 5;

        this.ctx.rect(scaled_pixel.scaled_x, scaled_pixel.scaled_y, scaled_pixel.scaled_w, scaled_pixel.scaled_h);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

    }

    draw_pixel_light(scaled_pixel) {

        this.ctx.beginPath();
        this.ctx.strokeStyle = "hsla(" + scaled_pixel.hue + ", 50%,"+this.light_color_saturation*100+"%, "+scaled_pixel.brightness+")";
        this.ctx.fillStyle = "hsla(" + scaled_pixel.hue + ", 50%, "+this.light_color_saturation*100+"%, "+scaled_pixel.brightness+")";
        this.ctx.fillRect(scaled_pixel.scaled_x, scaled_pixel.scaled_y, scaled_pixel.scaled_w, scaled_pixel.scaled_h);
        this.ctx.fill();

    }
    clear_canvas(){
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.clear_color;
        this.ctx.fillRect(-this.canvas.width/2, -this.canvas.height/2, this.canvas.width*2, this.canvas.height*2);
    }
    clear() {
        this.pixels = [];
        this.clear_canvas();
    }

    /**
     * this wont make use of the advantage of referenced objects
     * @param {object} pixel 
     */
    add_pixel(pixel){
        /**
         * maybe make sure the pixel lands on the grid / 
         * for example if the pixel size is 10x10 (this.scale_x = 10; this.scale_x = 10)
         *  then the grid should be zb 100x100 
         * and coordinates of               32|47 is not 
         * possible and would be changed to 30|40

        */
        // no no no wtf are you doin amigo
        // var x = parseInt(pixel.x / this.scale_x);
        // var y = parseInt(pixel.y / this.scale_y);
        
        // thats how it works
        // make subpixel drawings impossible zb 3.2|9.5
        //                                    ->3  |9  
        var x = parseInt(pixel.x);
        var y = parseInt(pixel.y);

        // ok this works not aswell

        // var x = parseInt(pixel.x / this.scale_x);
        // var y = parseInt(pixel.y / this.scale_y);
        
        pixel = new Pixel(x,y, pixel.hue, pixel.brightness)
        pixel = this.get_scaled_pixel(pixel);

        this.pixels.push(pixel);
    }

    /**
     * draws a 'pixel' 
     * draws stuff to the canvas in a particular order to keep the right order of layers 
     * backlight the emulated backlight of a led 
     * border the emulated border of the pixel
     * light the emulated light of the led
     * took inspiration from here https://www.reddit.com/r/gif/comments/lbfcbn/all_of_the_games_currently_included_in_my_ongoing/
     * @param {array} pixels 
     */
    render_pixel_drawer_point_3_d_instances(){
        
        this.draw_pixels(Pixel_Drawer_Point_3_D.instances)
    }

        /**
     * draws a 'pixel' 
     * draws stuff to the canvas in a particular order to keep the right order of layers 
     * backlight the emulated backlight of a led 
     * border the emulated border of the pixel
     * light the emulated light of the led
     * took inspiration from here https://www.reddit.com/r/gif/comments/lbfcbn/all_of_the_games_currently_included_in_my_ongoing/
     * @param {array} pixels 
     */
         render_added_pixels(){
            this.draw_pixels(this.pixels)
        }

    render(){
        this.render_added_pixels();
    }
    /**
     * alias 
     * @param {array} pixels 
     */
    draw_pixels = function(pixels) {
        
        // draw layers separatly
        var stuff = [ "backlight", "border", "light"];

        for (var key in stuff) {
            var name = stuff[key];
            for (var key in pixels) {
                var pixel = pixels[key];
                var scaled_pixel = this.get_scaled_pixel(pixel);
                
                this["draw_pixel_" + name](scaled_pixel)
            }
        }

    }



}
Pixel_Drawer.parse_to_integer = false
export {
    Pixel_Drawer
}