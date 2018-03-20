import * as React from 'react';
import styles from './IProNewsFeed.module.scss';
import { IIProNewsFeedProps } from './IIProNewsFeedProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/textfield';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ELHelper } from '../../Helpers/helper';
import * as $ from 'jquery';
import iProButton,{IiProButtonProps} from '../../components/iProButton';

export default class IProNewsFeed extends React.Component<IIProNewsFeedProps, {}> {
  public render(): React.ReactElement<IIProNewsFeedProps> {
    let v:IiProButtonProps = {
      text:"And New"
    }

    return (
      <div>
        <label>Page Title</label>
        <TextField id="txtPageTitle" />
        <DefaultButton id="btnCreatePage" onClick={this.onCreatePageClick.bind(this)} text="Create Page" />
        <br />
        <label id="lblStatus" />
       
        { 
          React.createElement(iProButton,{
          text:"Add Article"
        })}

        {/* <div className="vr vr_x5 vr_x6S vr_x10M">
          <div className="grid mix-grid_middle mix-grid_split">
            <div className="grid-col grid-col_12of12 grid-col_6of12S grid-col_8of12L">
              <div>
                <div className="vr vr_x3 vr_x0S">
                  <div className="textInputSearch">
                    <h4 className="u-isVisuallyHidden">Search Box</h4>
                    <div className="textInputSearch-btn mix-textInputSearch-btn_inactive">
                      <span className="textInputSearch-btn-icon">
                        <span className="icon icon_search">

                        </span>
                      </span>
                    </div>
                    <label className="u-isVisuallyHidden">Search</label>
                    <input type="text" className="textInputSearch-input"  name="kwSearchInput" placeholder="Search News..."  />
                    </div>
                </div>
              </div>
            </div>
            <div className="grid-col grid-col_12of12 grid-col_3of12S mix-grid-col_textOpp">
              <h4 className="u-isVisuallyHidden">Actions</h4>
              <a className="btn btn_inverse mix-btn_fill" href="/Pages/NewArticle.aspx">
                New Article
	            		<span className="btn-iconAlt">
                  <span className="icon icon_add mix-icon_brand">
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    );
  }

  private onCreatePageClick(e) {

    ELHelper.createNewPage($("#txtPageTitle")[0].value)
      .then((path: string) => {
        $("#lblStatus").text("Created");
      })
  }

}
