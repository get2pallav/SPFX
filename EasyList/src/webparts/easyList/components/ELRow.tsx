import * as React from 'react';
import * as DateFormat from 'dateformat';
import { ELHelper } from '../Helper/helper';
import * as $ from 'jquery';
export interface IELRowProp {
    item: any,
    Fields: string[],
    FieldTypes: {}
}
export interface IELRowState { }

export class ELRow extends React.Component<IELRowProp, IELRowState> {
    public render(): React.ReactElement<IELRowProp> {
        var elem = this.props.Fields.map((field) => {
            var prop = this.props.item[field]; 
            var val = prop;
            var classNameId = "ok";

            if (this.props.FieldTypes[field]) {
                switch (this.props.FieldTypes[field].toLowerCase()) {
                    case "datetime":
                        val = DateFormat(new Date(prop), "mediumDate");
                        break;
                    case "link":
                        val = <a href={"http://" + encodeURI(prop)} target="_blank">{this.props.item[field]}</a>;
                        break;
                    // case "user":
                    //     classNameId = prop;
                    //     ELHelper.getUserName(prop).then((userName) => {
                    //         $("." + classNameId).html(userName);
                    //     })
                    //     break;
                    default:
                        break;
                }
            }
            return <td className={classNameId}>{val}</td>;
        })
        return (
            <tr>{elem}</tr>
        )
    }
}