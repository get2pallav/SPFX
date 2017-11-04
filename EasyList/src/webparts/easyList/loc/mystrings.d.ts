declare interface IEasyListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameFieldLabel: string;
  Fields:string;
  FieldTypes:string;
  FieldsDescription:string;
  FieldTypesDescription:string;
}

declare module 'easyListStrings' {
  const strings: IEasyListStrings;
  export = strings;
}
