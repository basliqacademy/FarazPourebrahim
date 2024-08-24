import React from "react";
import s from './Input.module.scss';

type BorderColor = 'black-border' | 'white-border' | 'grey-border';
type BorderType = 'line' | 'regular';
type OpeningAnimation = 'no-animation' | 'fast-animation' | 'regular-animation' | 'slow-animation';
type Transparent = 'transparent' | 'solid';

type Props = {
    borderColor?: BorderColor
    borderType?: BorderType
    openingAnimation?: OpeningAnimation
    transparent?: Transparent
}

export function Input({borderColor = 'grey-border', openingAnimation = 'no-animation', borderType = 'regular', transparent = 'solid', children , ...rest}: Props) {
    return <input className={`${s[borderColor]} ${s[borderType]} ${s[openingAnimation]} ${s[transparent]}`} {...rest}>
        {children}
    </input>
}


export default Input;