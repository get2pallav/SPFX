import * as React from 'react';
import styles from './PalEditor.module.scss';
import { IPalEditorProps } from './IPalEditorProps';
import { escape } from '@microsoft/sp-lodash-subset';
const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
import { IPeoplePickerProps, NormalPeoplePicker, IPersonaProps, IBasePickerProps } from 'office-ui-fabric-react';
import { IPeoplePickerItemProps } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';

export default class PalEditor extends React.Component<IPalEditorProps, {}> {

  public render(): React.ReactElement<IPalEditorProps> {
    return (
      <div id="palEditor">

      </div>
    );
  }

  public componentDidMount() {
    this.getCKeditor();
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
