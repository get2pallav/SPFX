import * as React from 'react';
import style from '../components/iProButton.module.scss';
import * as styleLayout from '../components/iProLayout.module.scss' ;

export interface IiProButtonProps{
  icon?:string,
  href?:string,
  text:string,
}

export default class iProButton extends React.Component<IiProButtonProps,{}>{
    public render() : React.ReactElement<IiProButtonProps>{
        return (
            <div className={[styleLayout.default["grid-col"], styleLayout.default["grid-col_12of12"] , styleLayout.default["grid-col_3of12S"] , styleLayout.default["mix-grid-col_textOpp"] ].join(' ')}>
            <a className={[style.btn, style.btn_inverse ,style["mix-btn_fill"] ].join(' ')} href={this.props.href}>
                {this.props.text}
                <span className={style["btn-iconAlt"]}>
                    <span className="icon icon_add mix-icon_brand">
                        {this.props.icon}
                    </span>
                </span>
            </a>
        </div>
        )
    }
    //"grid-col grid-col_12of12 grid-col_3of12S mix-grid-col_textOpp"
}
