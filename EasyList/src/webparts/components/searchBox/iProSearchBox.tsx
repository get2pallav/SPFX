import * as React from 'react';
import style from '../../components/style/iProLayout.module.scss';
import styleText from '../../components/style/text-input.module.scss';

export interface IiProSearchBoxProps {
    placeholder?: string,
    text?: string
}

export default class iProSearchBox extends React.Component<IiProSearchBoxProps, {}>{
    render(): React.ReactElement<IiProSearchBoxProps> {
        return (
            <div className={[style["grid"], style["mix-grid_middle"], style["mix-grid_split"]  ].join(' ')}>
                <div className={[style["grid-col"], style["grid-col_12of12"], style["grid-col_6of12S"], style["grid-col_8of12L"]].join(' ')}>
                    <div>
                        <div className={[style.vr, style.vr_x3, style.vr_x0S].join(' ')}>
                            <div className={styleText.textInputSearch}>
                                <div className={[styleText["textInputSearch-btn"], styleText["mix-textInputSearch-btn_inactive"]].join(' ')} >
                                    <span className={styleText["textInputSearch-btn-icon"]}>
                                        <span className="icon icon_search">
                                            <svg className="icon-inner">
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                                
                                <input type="text" className={styleText["textInputSearch-input"]} name="kwSearchInput" placeholder={this.props.placeholder} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}