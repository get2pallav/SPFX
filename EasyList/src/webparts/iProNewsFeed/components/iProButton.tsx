import * as React from 'react';

export interface IiProButtonProps{
  icon?:string,
  href?:string,
  text:string,
}

export default class iProButton extends React.Component<IiProButtonProps,{}>{
    public render() : React.ReactElement<IiProButtonProps>{
        return (
            <div className="grid-col grid-col_12of12 grid-col_3of12S mix-grid-col_textOpp">
            <a className="btn btn_inverse mix-btn_fill" href={this.props.href}>
                {this.props.text}
                <span className="btn-iconAlt">
                    <span className="icon icon_add mix-icon_brand">
                        {this.props.icon}
                    </span>
                </span>
            </a>
        </div>
        )
    }
}