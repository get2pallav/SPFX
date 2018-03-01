import * as React from 'react';
import styles from './EasyList.module.scss';
import { IEasyListProps, IEasyListState } from './IEasyListProps';
import { ELRow } from './ELRow';
import { escape } from '@microsoft/sp-lodash-subset';
import { ELHelper } from '../../Helpers/helper';
import { SPComponentLoader } from '@microsoft/sp-loader';

export default class EasyList extends React.Component<IEasyListProps, IEasyListState> {
  constructor(prop: IEasyListProps) {
    super(prop);
    this.state = ({
      items: [],
      loaded:false
    });
    SPComponentLoader.loadCss("https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css");
    this.load();
  }

  load() {
    ELHelper.getListItems(this.props.ListName, this.props.FieldsName)
      .then((listItems) => {debugger;
        this.setState({
          items: listItems
        });
      })
      .then(() => {
        SPComponentLoader.loadScript("https://code.jquery.com/jquery-3.2.1.min.js", { globalExportsName: 'jQuery' })
          .then((jQuery: any): void => {
            SPComponentLoader.loadScript("https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js", { globalExportsName: "jQuery" })
              .then(() => {
                jQuery("#table_ds").dataTable();
                this.setState({
                  loaded:true
                })
              });
          });
      });
  }

  public render(): React.ReactElement<IEasyListProps> {
    let headElem;
    let fields = this.props.FieldsName.split(',');
    let fieldTypes = {};
    try {
      fieldTypes = JSON.parse(this.props.FieldTypes);
    } catch (e) {
    }
    if (this.props.FieldsName)
      headElem = <thead><tr>{fields.map((field) => { return <td>{field}</td> })}</tr></thead>;
    else
      headElem = <thead><tr><td>ID</td><td>Title</td></tr></thead>

    return (
      <table id="table_ds" className={this.props.Styles} cellSpacing="0" style={{display: this.state.loaded, width:'100%' }}>
        {headElem}
        <tbody>
         { this.state.items.map((item) => {return <ELRow Fields={fields} item={item} FieldTypes={fieldTypes}></ELRow>  }) }
        </tbody>
      </table>
    );
  }
}
