import { LinkProps } from 'react-router';

export interface LinkContainerProps extends LinkProps {
    disabled?: boolean;
}
export interface LinkContainer extends React.ComponentClass<LinkContainerProps> { }
export interface LinkContainerElement extends React.ReactElement<LinkContainerProps> { }
export const LinkContainer: LinkContainer

export const IndexLinkContainer: LinkContainer
