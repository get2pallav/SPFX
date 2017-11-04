import * as React from 'react';
import * as DateFormat from 'dateformat';
export interface IELRowProp{
    item:any,
    Fields: string[],
    FieldTypes:{}
}
export interface IELRowState{}

export class ELRow extends React.Component<IELRowProp,IELRowState> {
  public render():React.ReactElement<IELRowProp>{
     var elem= this.props.Fields.map((field)=>{
         var val = this.props.item[field];

         if(this.props.FieldTypes[field]){
             switch(this.props.FieldTypes[field].toLowerCase()){
                 case "datetime":
                  val = DateFormat(new Date(this.props.item[field]), "mediumDate") ;
                  break;
                 case "link":
                  val = <a href={"http://"+encodeURI(this.props.item[field])} target="_blank">{this.props.item[field]}</a>;
                  break;
                  default:
                  break;
             }
         }
          return <td>{val}</td>;
      })
      return(
          <tr>{elem}</tr>
      )
  }
}