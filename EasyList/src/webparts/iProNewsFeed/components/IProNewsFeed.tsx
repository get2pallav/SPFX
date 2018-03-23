import * as React from 'react';
import styles from './IProNewsFeed.module.scss';
import { IIProNewsFeedProps } from './IIProNewsFeedProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/textfield';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ELHelper, iProHelper } from '../../Helpers/helper';
import * as $ from 'jquery';
import iProButton, { IiProButtonProps } from '../../components/Button/iProButton';
import iProSearchBox, { IiProSearchBoxProps } from '../../components/searchBox/iProSearchBox';
import styleLayout from '../../components/style/iProLayout.module.scss';
import styleButton from '../../components/style/iProButton.module.scss';
import listNews, { IlistNewsProps } from '../../components/List/list';
import { INewsArticle } from '../../Helpers/helper';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
export interface IiProNewsFeedState {
  showEmptyDiv: boolean,
  loadDiv: boolean,
  articles?: INewsArticle[]
}

export default class IProNewsFeed extends React.Component<IIProNewsFeedProps, IiProNewsFeedState> {
  constructor(prop: IIProNewsFeedProps) {
    super(prop);
    this.state = ({
      showEmptyDiv: true,
      loadDiv: false,
      articles: []
    });
  }

  componentDidMount() {
    iProHelper.getPageCount(this.props.context.pageContext.web.serverRelativeUrl).then((count: number) => {
      let showEmptyDiv: boolean = false;
      if (count == 0)
        showEmptyDiv = true;

      this.setState({
        showEmptyDiv: showEmptyDiv,
        loadDiv: true
      })
      return showEmptyDiv;
    })
      .then((showEmptyDiv: boolean) => {
        iProHelper.getNewsArticles(this.props.context.pageContext.web.serverRelativeUrl).then((newsArticles: INewsArticle[]) => {
          this.setState({
            articles: newsArticles
          })
        })
      })
  }

  public render(): React.ReactElement<IIProNewsFeedProps> {
    let v: IiProButtonProps = {
      text: "And New"
    }

    return (
      <div>
        <label>Page Title</label>
        <TextField id="txtPageTitle" />
        <DefaultButton id="btnCreatePage" onClick={this.onCreatePageClick.bind(this)} text="Create Page" />
        <br />
        <label id="lblStatus" />
        <div className={[styleLayout.vr, styleLayout.vr_x5, styleLayout.vr_x6S, styleLayout.vr_x10M].join(' ')}>
          {
            React.createElement(iProSearchBox, {
              placeholder: "Search News...",
              text: "Search"
            })
          }

          {this.state.loadDiv ? (this.state.showEmptyDiv ? this.loadEmptyDiv() : this.loadNews()) : null}
        </div>
      </div>
    );
  }

  private loadEmptyDiv() {
    return (
      <div className={[styleLayout["grid-col"], styleLayout["grid-grid-col_12of12"]].join(' ')}>
        <div className={[styleLayout.align_center].join(' ')}>
          <div className="docBlock-inner_blank u-isVisibleL">
            <div className={[styleLayout.vr, styleLayout.vr_x5].join(' ')}>It doesn't look like there's any news at this site.<br />Create some news to bring this site to life! </div>
            {
              React.createElement(iProButton, {
                text: "Add Article"
              })
            }
          </div>
        </div>
      </div>
    );
  }

  private loadNews() {
    return (
      this.state.articles.map((article) => {
        return React.createElement(listNews, {
          title: article.Title,
          date: article.ArticleStartDate,
          preview: article.PreviewText
        })
      })
    )
  }

  private onCreatePageClick(e) {

    ELHelper.createNewPage($("#txtPageTitle")[0].value)
      .then((path: string) => {
        $("#lblStatus").text("Created");
      })
  }

}
