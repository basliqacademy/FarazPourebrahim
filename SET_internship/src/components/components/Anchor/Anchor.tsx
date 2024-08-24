import React from "react";
import s from './Anchor.module.scss';
import {Link, LinkProps} from "react-router-dom";

type Underline = 'visible-underline' | 'disabled-underline';
type Color = 'black' | 'white' | 'brown';
type Hover = 'none' | 'underline' | 'blue-underline';

type Props = {
    color?: Color
    hover?: Hover
    underline?: Underline
} & LinkProps;

export function Anchor({
                           color = "black",
                           hover = "blue-underline",
                           underline = "visible-underline",
                           children,
                           ...rest
                       }: Props) {
    return (
        <Link className={`${s[color]} ${s[hover]} ${s[underline]}`} {...rest}>
            {children}
        </Link>
    );
}

export default Anchor;
