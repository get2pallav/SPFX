import * as React from 'react';
import styles from './PalEditor.module.scss';
import { IPalEditorProps } from './IPalEditorProps';
import { escape } from '@microsoft/sp-lodash-subset';
const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
import { IPeoplePickerProps, NormalPeoplePicker, IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps, Persona } from 'office-ui-fabric-react/lib/Persona';
import { assign, autobind, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { IPeoplePickerItemProps, IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';
import { ELHelper, IPeopleResultsProps } from '../../Helpers/helper';

export interface IPalEditorState {
  peopleList?: IPersonaProps[],
  currentSelectedPersona?: IPersonaProps[]
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

  public render(): React.ReactElement<IPalEditorProps> {
    return (
      <div id="palEditor">
        {this.loadNormalPeoplePicker()}
      </div>
      //   <NormalPeoplePicker
      //   onResolveSuggestions={ this._onFilterChanged }
      //   onEmptyInputFocus={ this._returnMostRecentlyUsed }
      //   getTextFromItem={ this._getTextFromItem }
      //   pickerSuggestionsProps={ suggestionProps }
      //   className={ 'ms-PeoplePicker' }
      //   key={ 'normal' }
      //   onRemoveSuggestion={ this._onRemoveSuggestion }
      //   onValidateInput={ this._validateInput }
      //   removeButtonAriaLabel={ 'Remove' }
      //   inputProps={ {
      //     onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
      //     onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
      //     'aria-label': 'People Picker'
      //   } }
      //   componentRef={ this._resolveRef('_picker') }
      //   onInputChange={ this._onInputChange }
      // />
    );
  }

  private loadNormalPeoplePicker() {
    var peoplItems: IPeoplePickerProps = {
      onResolveSuggestions: (filter: string, selectedItems?: IPersonaProps[], limitResults?: number) => { return this.onResolveSuggestion(filter, selectedItems, limitResults) },
      pickerSuggestionsProps: suggestionProps,
      getTextFromItem: (Item: IPersonaProps): string => { return Item.primaryText as string },
      
    }
    return (
      <NormalPeoplePicker {...peoplItems} />
    );
  }

  private onResolveSuggestion(filter: string, selectedItems?: IPersonaProps[], limitResults?: number): Promise<IPersonaProps[]>  {
    return new Promise<IPersonaProps[]>((resolve) => {
      
      ELHelper.getPeopleResults(filter).then((results:IPersonaProps[]) => { resolve(results) })
    //  resolve(this.state.peopleList);       
    })
   // return this.state.peopleList;
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
