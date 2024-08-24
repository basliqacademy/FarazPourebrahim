import React from "react";
import s from './Button.module.scss';

type Size = 'sm' | 'md' | 'lg'
type Color = 'grey' | 'black' | 'blue'
type TextColor = 'white-text' | 'black-text' | 'brown-text'

type Props = {
    size?: Size
    color?: Color
    textColor?: TextColor
}

export function Button({size = 'md', color = 'grey', textColor = 'white', children, ...rest}: Props) {
    return <button className={`${s[size]} ${s[color]} ${s[textColor]}`} {...rest}>
        {children}
    </button>
}

export default Button;