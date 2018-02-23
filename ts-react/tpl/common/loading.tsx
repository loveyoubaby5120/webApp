import * as Radium from 'radium';
import * as React from 'react';

export const Loading = Radium((props: {
    style?: React.CSSProperties;
}) => {
    return <div style={Style.loading}>
        <span style={[Style.inner]}></span>
        <span style={[Style.inner, Style.two]}></span>
        <span style={[Style.inner, Style.three]}></span>
        <span style={[Style.inner, Style.four]}></span>
        <span style={[Style.inner, Style.five]}></span>
    </div>
});

const loadingKeyframes = Radium.keyframes({
    '0%, 100%': { height: '25px', background: 'lightgreen', margin: '0 1.5px' },
    '50%': { height: '50px', background: 'lightblue', margin: '-12.5px 1.5px' },
}, 'loading');

const Style: { [key: string]: React.CSSProperties } = {
    inner: {
        animation: '1s ease infinite',
        animationName: loadingKeyframes,
        background: 'lightgreen',
        display: 'inline-block',
        width: '6px',
        height: '100%',
        borderRadius: '4px',
        margin: '0 1.5px',
    },
    loading: {
        height: '25px',
        width: '45px',
        margin: '100px auto',
    },
    two: {
        animationDelay: '0.1s',
    },
    three: {
        animationDelay: '0.2s',
    },
    four: {
        animationDelay: '0.3s',
    },
    five: {
        animationDelay: '0.4s',
    },
};
