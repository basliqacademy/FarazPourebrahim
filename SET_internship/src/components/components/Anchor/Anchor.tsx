import React from "react";
import s from './Anchor.module.scss';
import {Link, LinkProps} from "react-router-dom";

type Underline = 'none' | 'underline' | 'on-hover';
type Color = 'black' | 'white' | 'brown';

type Props = {
    color?: Color
    underline?: Underline
} & LinkProps;

export function Anchor({
                           color = "black",
                           underline = "visible-underline",
                           children,
                           ...rest
                       }: Props) {
    return (
        <Link className={`${s[color]} ${s[underline]}`} {...rest}>
            {children}
        </Link>
    );
}

export default Anchor;
