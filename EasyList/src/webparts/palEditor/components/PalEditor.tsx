import * as React from 'react';
import styles from './PalEditor.module.scss';
import { IPalEditorProps } from './IPalEditorProps';
import { escape } from '@microsoft/sp-lodash-subset';
const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
import { IPeoplePickerProps, NormalPeoplePicker, IBasePickerSuggestionsProps, IBasePicker } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps, Persona } from 'office-ui-fabric-react/lib/Persona';
import { assign, autobind, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { IPeoplePickerItemProps, IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';
import { ELHelper, IPeopleResultsProps } from '../../Helpers/helper';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/textfield';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as $ from 'jquery';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IPalEditorState {
  peopleList?: IPersonaProps[];
  mostRecentlyUsed?: IPersonaProps[];
  currentSelectedPersona?: IPersonaProps[];
  userProfileProperties?: any[];
  columns?: IColumn[];
  tanentUrl?: string;
  showProertyDiv: boolean;
}
const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts'
};


export default class PalEditor extends React.Component<IPalEditorProps, IPalEditorState> {
  private _picker: IBasePicker<IPersonaProps>;
  private _columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Property Name',
      minWidth: 200,
      fieldName: 'Key',
      isResizable: true,
      isSorted: false,
      onColumnClick: this._onNameColumnClick.bind(this),
      isSortedDescending: false
    },
    {
      key: 'column2',
      name: 'Value',
      minWidth: 400,
      fieldName: 'Value',
      isResizable: true,
      isMultiline: true
    }
  ];

  constructor(props: IPalEditorProps) {
    super(props);
    this.state = {
      mostRecentlyUsed: [],
      currentSelectedPersona: [],
      peopleList: [],
      userProfileProperties: [],
      columns: this._columns,
      tanentUrl: "",
      showProertyDiv: false
    }
  }
  public render(): React.ReactElement<IPalEditorProps> {
    return (

      <div id="palEditor">
        <Label>People Picker</Label>
        {this.loadNormalPeoplePicker()}
        <br />
        <div style={{ marginLeft: 200 }}>
          <DefaultButton primary={true} text="Get Properties" onClick={this.getUserProperties.bind(this)} style={{ marginRight: 20 }} />
        </div>

        <table>
          <tr><td>
            <text>Update Property for {this.state.currentSelectedPersona && this.state.currentSelectedPersona[0] ? this.state.currentSelectedPersona[0].secondaryText : "'Logged In User'"}</text> 
          </td></tr>
          <tr><td style={{width:500}}>
            <TextField underlined label="Property Name" id="PropertyName" /> <TextField underlined label="Property Value" id="PropertyValue" />
          </td><td style={{width:300}}>
              <DefaultButton primary={true} text="Update Property" onClick={this.showTenantDiv.bind(this)} />
            </td></tr>
        </table>
        {this.state.showProertyDiv ? (
          <div id="propertyList">
            <DetailsList items={this.state.userProfileProperties} columns={this.state.columns} layoutMode={DetailsListLayoutMode.justified} />
          </div>
        ) : (<div></div>)}

      </div>
    );
  }


  private getUserProperties() {
    if (this.state.currentSelectedPersona.length > 0 && this.state.currentSelectedPersona[0].secondaryText != "")
      ELHelper.getUserProperites(this.state.currentSelectedPersona[0].secondaryText).then((results: any[]) => {
        this.setState({
          userProfileProperties: results,
          showProertyDiv: true
        });
      })
    else {
      this.setState({
        showProertyDiv: false
      })
    }
  }

  private getTanentUrl() {

    ELHelper.getTanentUrl().then((result) => {
      this.setState({
        tanentUrl: result
      })
    })
  }

  private showTenantDiv() {

    var userData = {
      'accountName': "i:0#.f|membership|pallav.mathur@cox.com",
      'propertyName': $("#PropertyName")[0].value, //can also be used to set custom single value profile properties
      'propertyValue': $("#PropertyValue")[0].value
    }
    const opt: ISPHttpClientOptions = { headers: { 'Content-Type': 'application/json;odata=nometadata' }, body: JSON.stringify(userData) };

    this.props.context.spHttpClient.post("/_api/SP.UserProfiles.PeopleManager/SetSingleValueProfileProperty",
      SPHttpClient.configurations.v1, opt)
      .then((response: SPHttpClientResponse) => { console.log(response) })
      .catch((error: SPHttpClientResponse) => { console.log(error) });
  }

  private _onNameColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    let { userProfileProperties } = this.state;
    let newColumns: IColumn[] = this._columns.slice();
    let newItems: any[] = userProfileProperties;
    newColumns[0].isSorted = true;
    newColumns[0].isSortedDescending = !newColumns[0].isSortedDescending;

    newItems = this._sortItems(newItems, newColumns[0].fieldName, newColumns[0].isSortedDescending);

    this.setState({
      columns: newColumns,
      userProfileProperties: newItems
    })
  }

  private _sortItems(items: any[], sortBy: string, descending = false): any[] {
    if (descending) {
      return items.sort((a: any, b: any) => {
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a: any, b: any) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
  }

  private loadNormalPeoplePicker() {
    var peoplItems: IPeoplePickerProps = {
      onResolveSuggestions: this.onResolveSuggestion.bind(this),
      pickerSuggestionsProps: suggestionProps,
      getTextFromItem: (Item: IPersonaProps): string => { return Item.secondaryText as string },
      key: 'normal',
      onEmptyInputFocus: this.returnMostRecenlyUsed.bind(this),
      className: 'ms-PeoplePicker',
      onRemoveSuggestion: (item: IPersonaProps) => { this.onRemoveSuggestion(item) },
      inputProps: {
        onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
        onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
        'aria-label': 'People Picker'
      },
      onInputChange: this._onInputChange.bind(this),
      onChange: this._onItemsChange.bind(this),

    }
    return (
      <NormalPeoplePicker {...peoplItems} />
    );
  }
  private _onInputChange(input: string): string {
    const outlookRegEx = /<.*>/g;
    const emailAddress = outlookRegEx.exec(input);

    if (emailAddress && emailAddress[0]) {
      return emailAddress[0].substring(1, emailAddress[0].length - 1);
    }

    return input;
  }
  private onResolveSuggestion(filter: string, selectedItems?: IPersonaProps[], limitResults?: number): Promise<IPersonaProps[]> {

    let mru: IPersonaProps[] = this.state.mostRecentlyUsed ? this.state.mostRecentlyUsed : [];
    if (mru.length >= 5) {
      mru.splice(0, 3);
    }
    selectedItems.forEach((item) => {
      if (mru.indexOf(item) == -1)
        mru.push(item);
    })

    this.setState({
      currentSelectedPersona: selectedItems,
      mostRecentlyUsed: mru
    })
    return new Promise<IPersonaProps[]>((resolve) => {
      if (filter.length > 2) {
        ELHelper.getPeopleResults(filter).then((results: IPersonaProps[]) => { resolve(results) })
      }

    })
  }

  private _onItemsChange(items: any[]) {
    if (items.length == 0) {
      this.setState({
        showProertyDiv: false
      })
    }
    this.setState({
      currentSelectedPersona: items
    });
  }
  private onRemoveSuggestion(item: IPersonaProps) {
    const { peopleList, mostRecentlyUsed } = this.state;
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
      this.setState({ peopleList: newPeople });
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[] = mostRecentlyUsed.slice(0, indexMostRecentlyUsed).concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      this.setState({ mostRecentlyUsed: newSuggestedPeople });
    }
  }
  private returnMostRecenlyUsed(currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    // console.log(currentPersonas);
    let { mostRecentlyUsed } = this.state;
    currentPersonas.forEach((persona) => {
      const idx: number = mostRecentlyUsed.indexOf(persona);
      if (idx >= 0) {
        mostRecentlyUsed = mostRecentlyUsed.splice(0, idx).concat(mostRecentlyUsed.splice(idx + 1));
      }
    })
    return new Promise<IPersonaProps[]>((resolve) => { resolve(mostRecentlyUsed) });
  }

  private getCKeditor(): void {
    ClassicEditor.create(document.querySelector("#palEditor"))
      .then(editor => {
        console.log(editor);
      })
      .error(error => {
        console.log(error)
      })
  }

}
