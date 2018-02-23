import { getMousePosition, getDistance } from './Utils.js';
import Particle from './Particle';

// According to Caniuse <http://caniuse.com/#feat=requestanimationframe>,
// Opera and Explorer don't require vendor prefix

// We should investigate about both requestAnimationFrame AND cancelAnimationFrame
// support in browsers, otherwise, when cancelAnimFrame falls back to clearTimeout,
// it won't have any effect...

// A good options could be a pollyfill like:
// * https://gist.github.com/paulirish/1579671
// * https://github.com/ngryman/raf.js
// * https://github.com/darius/requestAnimationFrame
// * https://github.com/kof/animation-frame *** I like this one !!!
var requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    // window.ORequestAnimationFrame ||
    // window.msRequestAnimationFrame ||
    function requestAnimFrame(callback){
        return window.setTimeout(callback, 1000 / 60);
    };

var cancelAnimFrame =
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame || // Not sure this one exists
    (window as any).webkitCancelRequestAnimationFrame || // Caniuse refers to this one <http://caniuse.com/#feat=requestanimationframe>
    (window as any).mozCancelAnimationFrame ||
    // window.OCancelAnimationFrame ||
    // window.msCancelAnimationFrame ||
    function cancelAnimFrame(requestID){
        window.clearTimeout(requestID);
    };

export default class Particles {
    canvas: any = {};
    particles = [];
    mouse: {x?: number, y?: number, hoverCanvas?: any} = {};
    isAnimated = false;
    params: any;
    UID: any;
    requestID: any;

    /*
     * Initialize the sandbox
     * @param {Object} element Element for the sandbox.
     * @param {Object} params Few sandbox's params.
     */
    constructor(canvas, params) {
        this.params = params;
        this.initHTML(canvas);
        this.UID = Date.now();

        this.initParticles();
        this.initAnimation();
    }

    /*
     * Initialize the sandbox's html.
     * @param {Object} element Element for the sandbox.
     */
    initHTML(canvas){
        this.canvas.element = canvas// document.createElement('canvas')
        this.canvas.context = this.canvas.element.getContext('2d');
        this.canvas.element.width = (this.params.width) ? this.params.width : canvas.parentNode.offsetWidth;
        this.canvas.element.height = (this.params.height) ? this.params.height : canvas.parentNode.offsetHeight;
        this.canvas.element.style.background = this.params.background;
    }

    /*
     * Resize canvas.
     */
    resize(width, height){
        if (width) {
            this.canvas.element.width = width;
        }

        if (height) {
            this.canvas.element.height = height;
        }
    }

    /*
     * Create all particles in the sandbox.
     */
    initParticles(){
        var i = 0,
            count = this.params.particlesNumber;

        for (; i < count; i += 1) {
            this.particles.push(new Particle(
                this.canvas.element,
                this.params.particle
            ));
        }
    }

    onMouseEnter = () => {
        this.mouse.hoverCanvas = true;

        if (!this.isAnimated) {
            this.draw();
        }
    }

    onMouseLeave = () => {
        this.mouse.hoverCanvas = false;
    }

    onMouseMove = event => {
        let { clientX, clientY } = event;

        var { x, y } = getMousePosition({ clientX, clientY }, this.canvas.element);
        this.mouse.x = x;
        this.mouse.y = y;
    }

    /*
     * Initialize the sandbox's animation.
     */
    initAnimation(){
        this.isAnimated = true;
        this.draw();
    }

    /*
     * Draw the sandbox canvas.
     */
    draw = () => {
        var i = 0,
            j,
            count = this.particles.length,
            canvas = this.canvas,
            particle,
            particle2;

        canvas.context.clearRect(0, 0, canvas.element.width, canvas.element.height);

        for (; i < count; i += 1) {
            particle = this.particles[i];

            if (this.isAnimated) {
                particle.update();
            }

            particle.draw();

            if (!this.params.disableMouse && this.mouse.hoverCanvas) {
                this.drawLink(
                    particle.getPosition('x'),
                    particle.getPosition('y'),
                    this.mouse.x,
                    this.mouse.y
                );
            }

            if (!this.params.disableLinks) {
                for (j = i +1; j < count; j += 1) {
                    particle2 = this.particles[j];

                    this.drawLink(
                        particle.getPosition('x'),
                        particle.getPosition('y'),
                        particle2.getPosition('x'),
                        particle2.getPosition('y')
                    );
                }
            }
        }

        this.requestID = requestAnimFrame(this.draw);
    }

    /*
     * Draw a link between two particles.
     * @param {int} x First object abscissa coords.
     * @param {int} y First object ordered coords.
     * @param {int} x2 Second object abscissa coords.
     * @param {int} y2 Second object ordered coords.
     */
    drawLink(x, y, x2, y2){
        if (getDistance(x, y, x2, y2) <= this.params.createLinkDist) {
            var context = this.canvas.context;
                context.save();
                context.beginPath();
                context.lineWidth = this.params.linksWidth;
                context.moveTo(x, y);
                context.lineTo(x2, y2);
                context.globalAlpha = this.getOpacityLink(x, y, x2, y2);
                context.strokeStyle = this.params.color;
                context.lineCap = 'round';
                context.stroke();
                context.closePath();
                context.restore();
        }
    }

    /*
     * Get opacity for link two particles.
     * @param {int} x First object abscissa coords.
     * @param {int} y First object ordered coords.
     * @param {int} x2 Second object abscissa coords.
     * @param {int} y2 Second object ordered coords.
     * @return {int} 0 <= opacity <= 1
     */
    getOpacityLink(x, y, x2, y2){
        var dist = getDistance(x, y, x2, y2),
            opacity,
            linkDist = this.params.linkDist,
            createLinkDist = this.params.createLinkDist;

        if (dist <= linkDist) {
            opacity = 1;

        } else if (dist >  createLinkDist) {
            opacity = 0;

        } else {
            opacity = 1 - (((dist - linkDist) * 100) / (createLinkDist - linkDist)) / 100;
        }

        return opacity;
    }

    /*
     * Freeze the animation.
     */
    freeze(){
        if (this.isAnimated) {
            this.isAnimated = false;
        }
    }

    /*
     * Unfreeze the animation.
     */
    unfreeze(){
        if (!this.isAnimated) {
            this.isAnimated = true;
        }
    }

    /*
     * Remove the animation's canvas.
     */
    remove(){
        if (this.requestID){
            cancelAnimFrame(this.requestID);
        }

        // TODO: make sure this is the right thing to do !
        if (this.canvas && this.canvas.element && this.canvas.element.parentChild) {
            this.canvas.element.parentChild.removeChild(this.canvas.element);
        }
    }
}
