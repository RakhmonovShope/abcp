import React from 'react';
import classes from './Button.module.scss';

interface IButtonProps {
    onClick: () => void;
}

// Использует React.memo для предотвращения ненужных повторных рендеров.
const Button = React.memo(
    ({onClick}: IButtonProps): JSX.Element => (
        <button className={classes.wrapper} type="button" onClick={onClick}>
            Get random user
        </button>
    )
);

export default Button;