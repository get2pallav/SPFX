import * as React from 'react';
import style from '../../components/style/iProLayout.module.scss';
import styleText from '../../components/style/text-input.module.scss';
import iProIcons from '../icons/icons';
import styleIcon from '../style/icon.module.scss';

export interface IiProSearchBoxProps {
    placeholder?: string,
    text?: string
}

export default class iProSearchBox extends React.Component<IiProSearchBoxProps, {}>{
    render(): React.ReactElement<IiProSearchBoxProps> {
        return (
            <div className={[style.vr, style.vr_x3, style.vr_x0S].join(' ')}>
                <div className={styleText.textInputSearch}>
                    <div className={[styleText["textInputSearch-btn"], styleText["mix-textInputSearch-btn_inactive"]].join(' ')} >
                        <span className={styleText["textInputSearch-btn-icon"]}>
                            <span className={[styleIcon.icon, styleIcon.icon_search].join(' ')}>
                                {iProIcons.icon_search({
                                    classNames: [styleIcon["icon-inner"]]
                                })}
                            </span>
                        </span>
                    </div>

                    <input type="text" className={styleText["textInputSearch-input"]} name="kwSearchInput" placeholder={this.props.placeholder} />
                </div>
            </div>
        )
    }
}