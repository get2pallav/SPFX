import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import * as strings from 'easyListStrings';
import EasyList from './components/EasyList';
import { IEasyListProps } from './components/IEasyListProps';
import { IEasyListWebPartProps } from './IEasyListWebPartProps';
import { ELHelper } from './Helper/helper';
export default class EasyListWebPart extends BaseClientSideWebPart<IEasyListWebPartProps> {
  errorString = "";
  public render(): void {
    const element: React.ReactElement<IEasyListProps> = React.createElement(
      EasyList,
      {
        ListName: this.properties.ListName,
        FieldsName: this.properties.FieldsName,
        FieldTypes: this.properties.FieldTypes,
        Styles:this.properties.Styles
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onAfterPropertyPaneChangesApplied() {
    ELHelper.checkIfListExists(this.properties.ListName)
      .then((value) => {
        this.errorString = value ? "List Exists" : "List does not exists";
        this.context.propertyPane.refresh();
      });
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
                PropertyPaneTextField('ListName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('FieldsName', {
                  label: strings.Fields,
                  description: strings.FieldsDescription
                }),
                PropertyPaneTextField('FieldTypes', {
                  label: strings.FieldTypes,
                  description: strings.FieldTypesDescription,
                  multiline:true
                }),
                PropertyPaneDropdown('Styles', {
                  label: "Styles",
                  options:[
                  {key:'',text:"No Style"},
                  {key:'display',text:"Basic"},
                  {key:'hover',text:"Hover"},
                  {key:'display compact',text:"Compact"},
                  {key:'cell-border',text:"cell borders"},
                  {key:'row-border',text:"row borders"}
                ]

                }),
                PropertyPaneLabel('Error', {
                  text: this.errorString
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
