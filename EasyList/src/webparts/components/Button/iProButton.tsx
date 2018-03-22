import * as React from 'react';
import style from '../style/iProButton.module.scss';
import styleLayout from '../style/iProLayout.module.scss';

export interface IiProButtonProps {
    icon?: string,
    href?: string,
    text: string,
}

export default class iProButton extends React.Component<IiProButtonProps, {}>{
    public render(): React.ReactElement<IiProButtonProps> {
        return (
            <div className={[styleLayout["grid-col"], styleLayout["grid-col_12of12"], styleLayout["grid-col_3of12S"], styleLayout["mix-grid-col_textOpp"]].join(' ')}>
                <a className={[style.btn, style.btn_inverse, style["mix-btn_fill"]].join(' ')} href={this.props.href}>
                    {this.props.text}
                    <span className={style["btn-iconAlt"]}>
                        <span className= "icon icon_add mix-icon_brand">
                            {this.props.icon}
                        </span>
                    </span>
                </a>
            </div>
        )
    }
}
