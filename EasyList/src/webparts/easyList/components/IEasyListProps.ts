export interface IEasyListProps {
  ListName: string;
  FieldsName:string;
  FieldTypes:string;
  Styles:string;
}

export interface IEasyListState{
  items?:any[];
  loaded?:boolean;
}