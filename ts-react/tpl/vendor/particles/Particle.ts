import { getRandNumber } from './Utils';

export default class Particle {
    canvas: any = {};
    vector: any = {};
    params: any;
    x: any;
    y: any;
    radius: any;
    size: any;

    /*
     * Initialize the particle.
     * @param {Object} canvas DOM element.
     * @param {Object} params Few particle's params.
     */
    constructor(canvas, params){
        this.params = {
            color: 'red',
            minSize: 2,
            maxSize: 4,
            speed: 60
        };

        for(let param in params){
            this.params[param] = params[param];
        }

        this.setCanvasContext(canvas);
        this.initSize();
        this.initPosition();
        this.initVectors();
    }

    /*
     * Initialize particle's position.
     */
    initPosition(){
        this.x = getRandNumber(0 + this.radius, this.canvas.element.width - this.radius);
        this.y = getRandNumber(0 + this.radius, this.canvas.element.height - this.radius);
    };

    /*
     * Initialize particle's size.
     */
    initSize(){
        this.size = getRandNumber(this.params.minSize, this.params.maxSize);
        this.radius = this.size / 2;
    }

    /*
     * Initialize particle's vectors for speed.
     */
    initVectors(){
        let { speed } = this.params;

        do {
            this.vector.x = getRandNumber(-speed / 60, speed / 60, false);
            this.vector.y = getRandNumber(-speed / 60, speed / 60, false);
        } while (this.vector.x == 0 || this.vector.y == 0);
    }

    /*
     * Set the context to draw particles.
     * @param {Object} canvas Canvas.
     */
    setCanvasContext(canvas){
        this.canvas.element = canvas;
        var context = canvas.getContext('2d');

        if (typeof context === 'object' && typeof context.canvas === 'object') {
            this.canvas.context = context;

        } else {
            throw 'Error: Can\'t set canvas context to Particle because context isn\'t a CanvasRenderingContext2D object.';
        }
    }

    /*
     * Draw particle.
     */
    draw(){
        var context = this.canvas.context;

        context.beginPath();
        context.arc(this.x, this.y, this.size /2, 0, Math.PI*2);
        context.fillStyle = this.params.color;
        context.fill();
        context.closePath();
    }

    /*
     * Update the particle's position.
     */
    update(){
        this.x += this.vector.x;
        this.y += this.vector.y;

        if (0 > (this.x - this.radius) || (this.x + this.radius) > this.canvas.element.width) {
            this.vector.x = -this.vector.x;
        }

        if (0 > (this.y - this.radius) || (this.y + this.radius) > this.canvas.element.height) {
            this.vector.y = -this.vector.y;
        }
    }

    /*
     * Return position of particle.
     * @param {string} axis Optionnal axis.
     * @return {int|Object} Return object if axis is not defined, else return int.
     */
    getPosition(axis){
        if (typeof axis === 'string' && (axis != 'x' && axis != 'y')) {
            axis = null;
        }

        return (typeof(axis) === 'string') ? this[ axis ] : { x: this.x, y: this.y };
    }
}
