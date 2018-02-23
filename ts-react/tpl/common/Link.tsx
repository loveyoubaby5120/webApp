import * as React from 'react';
import * as Radium from 'radium';
import { Link as LinkOrig, LinkProps } from 'react-router';
import { LinkContainer as LinkContainerOrig, LinkContainerProps } from 'react-router-bootstrap';

let RadiumLink = Radium(LinkOrig);

export let Link = (props: LinkProps) => {
    return <RadiumLink {...props} activeClassName='active' />;
};

let RadiumLinkContainer = Radium(LinkContainerOrig);

export function LinkContainer(props: LinkContainerProps) {
    return <RadiumLinkContainer {...props} />;
};
