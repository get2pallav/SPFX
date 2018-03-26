import * as React from 'react';
import style from '../style/iProButton.module.scss';
import styleLayout from '../style/iProLayout.module.scss';
import styleIcon from '../style/icon.module.scss';

export interface IiProButtonProps {
    icon?: string,
    href?: string,
    text: string,
    svg?: any,
    onClick?: (e) => void
}

export default class iProButton extends React.Component<IiProButtonProps, {}>{
    public render(): React.ReactElement<IiProButtonProps> {
        return (
            <a className={[style.btn, style.btn_inverse, style["mix-btn_fill"]].join(' ')} href={this.props.href} onClick={(event) => { this.props.onClick(event) }}>
                {this.props.text + " "}
                <span className={style["btn-iconAlt"]}>
                    <span className={[styleIcon.icon, styleIcon["icon_add"], styleIcon["mix-icon_brand"]].join(' ')}>
                        {this.props.svg}
                    </span>
                </span>
            </a>
        )
    }
}
