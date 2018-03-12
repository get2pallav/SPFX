import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PalEditorWebPartStrings';
import PalEditor from './components/PalEditor';
import { IPalEditorProps } from './components/IPalEditorProps';

export interface IPalEditorWebPartProps {
  description: string;
}

export default class PalEditorWebPart extends BaseClientSideWebPart<IPalEditorWebPartProps> {
  
  public render(): void {
    
    const element: React.ReactElement<IPalEditorProps > = React.createElement(
      PalEditor,
      {
        description: this.properties.description,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
