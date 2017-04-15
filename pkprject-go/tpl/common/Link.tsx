import * as React from 'react';
import * as Radium from 'radium';
import {Link as LinkOrig} from 'react-router';
import {LinkContainer as LinkContainerOrig} from 'react-router-bootstrap';

let RadiumLink = Radium(LinkOrig);

export let Link = (props) => {
    return <RadiumLink {...props} activeClassName="active"/>
};

interface LinkContainerProps extends ReactRouter.LinkProps {
    disabled?: boolean
}

let RadiumLinkContainer = Radium(LinkContainerOrig);

export function LinkContainer(props) {
    return <RadiumLinkContainer {...props} />
};
