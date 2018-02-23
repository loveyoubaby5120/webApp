import * as React from 'react';
import Particles from './Particles';

export class ParticlesComponent extends React.Component<{width: number, height: number}, {}> {
    private particlesConfig = {
        particlesNumber: 70,
        linkDist: 150,
        createLinkDist: 150,
        disableLinks: false,
        disableMouse: false,
        background: 'transparent',
        color: '#e4e4e4',
        linksWidth: 0.5,
        particle: {
            color: '#eee',
            minSize: 1,
            maxSize: 4,
            speed: 20,
        },
    };

    private canvas = null;
    private particles = null;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.particles = new Particles(this.canvas, Object.assign({}, this.particlesConfig, {
            width: this.props.width,
            height: this.props.height,
        }));
    }

    componentWillReceiveProps(nextProps) {
        let { width, height } = nextProps;

        if (this.props.width !== width || this.props.height !== height) {
            this.particles.resize(width, height);
        }
    }

    componentWillUnmount() {
        this.particles.remove();
    }

    render() {
        return (
            <canvas
                className='Particles'
                ref={(canvas) => { this.canvas = canvas; }}
                onMouseMove={this.onMouseMove}
                onMouseLeave={this.onMouseLeave}
                onMouseEnter={this.onMouseEnter} />
        );
    }

    private onMouseMove = () => {
        if (this.particles) {
            this.particles.onMouseMove();
        }
    }

    private onMouseEnter = () => {
        if (this.particles) {
            this.particles.onMouseEnter();
        }
    }

    private onMouseLeave = () => {
        if (this.particles) {
            this.particles.onMouseLeave();
        }
    }
}
