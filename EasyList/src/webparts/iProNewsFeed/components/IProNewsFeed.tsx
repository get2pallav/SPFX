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
import styleIcon from '../../components/style/icon.module.scss';
import listNews, { IlistNewsProps, breadcrumbClassType } from '../../components/List/list';
import { INewsArticle } from '../../Helpers/helper';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
import iProIcons from '../../components/icons/icons';
import styleBase from '../../components/style/base.module.scss';

export interface IiProNewsFeedState {
  showEmptyDiv: boolean,
  loadDiv: boolean,
  articleIds?: number[],
  articles?: INewsArticle[]
}

export default class IProNewsFeed extends React.Component<IIProNewsFeedProps, IiProNewsFeedState> {
  constructor(prop: IIProNewsFeedProps) {
    super(prop);
    this.onNewArticleClick = this.onNewArticleClick.bind(this);
    this.state = ({
      showEmptyDiv: true,
      loadDiv: false,
      articleIds: [],
      articles: []
    });
  }

  componentDidMount() {
    iProHelper.getPageCount(this.props.context.pageContext.web.serverRelativeUrl)
      .then((ids: number[]) => {
        this.setState({
          showEmptyDiv: ids.length == 0,
          loadDiv: true,
          articleIds: ids
        })
        return this.state.showEmptyDiv;
      })
      .then(() => {
        if (!this.state.showEmptyDiv) {

          this.state.articleIds.forEach((id) => {
            iProHelper.getNewsArticleDetails(this.props.context.pageContext.web.serverRelativeUrl, id)
              .then((value) => {
                let items: INewsArticle[] = this.state.articles;
                items.push(value);

                this.setState({
                  articles: items
                })

              })
          })
        }
      })
  }

  public render(): React.ReactElement<IIProNewsFeedProps> {
    let v: IiProButtonProps = {
      text: "And New"
    }

    return (
      <div className={styleBase.base}>
        {/* <label>Page Title</label>
        <TextField id="txtPageTitle" />
        <DefaultButton id="btnCreatePage" onClick={this.onCreatePageClick.bind(this)} text="Create Page" />
        <br />
        <label id="lblStatus" /> */}
        <div className={[styleLayout.vr, styleLayout.vr_x5, styleLayout.vr_x6S, styleLayout.vr_x10M].join(' ')}>
          <div className={[styleLayout["grid"], styleLayout["mix-grid_middle"], styleLayout["mix-grid_split"]].join(' ')}>
            <div className={[styleLayout["grid-col"], styleLayout["grid-col_12of12"], styleLayout["grid-col_6of12S"], styleLayout["grid-col_8of12L"]].join(' ')}>
              {
                React.createElement(iProSearchBox, {
                  placeholder: "Search News...",
                  text: "Search"
                })
              }
            </div>
            <div className={[styleLayout["grid-col"], styleLayout["grid-col_12of12"], styleLayout["grid-col_3of12S"], styleLayout["mix-grid-col_textOpp"]].join(' ')}>
              {
                React.createElement(iProButton, {
                  text: "Add Article",
                  svg:iProIcons.icon_add({
                    classNames:[styleIcon["icon-inner"]],
                  }),
                  onClick:this.onNewArticleClick.bind(this)
                })
              }
            </div>
          </div>
        </div>
        <div className={[styleLayout["grid-col"], styleLayout["grid-col_12of12"]].join(' ')}>
          {this.state.loadDiv ? (this.state.showEmptyDiv ? this.loadEmptyDiv() : this.loadNews()) : null}
        </div>

      </div>
    );
  }

  private onNewArticleClick(e:any):void{
    console.log(e);
  }

  private loadEmptyDiv() {
    return (
      <div className={[styleLayout["grid-col"], styleLayout["grid-grid-col_12of12"]].join(' ')}>
        <div className={[styleLayout.align_center].join(' ')}>
          <div className="docBlock-inner_blank u-isVisibleL">
            <div className={[styleLayout.vr, styleLayout.vr_x5].join(' ')}>It doesn't look like there's any news at this site.<br />Create some news to bring this site to life! </div>
            <div className={[styleLayout["grid-col"], styleLayout["grid-col_12of12"], styleLayout["grid-col_3of12S"], styleLayout["mix-grid-col_textOpp"]].join(' ')}>
              {
                React.createElement(iProButton, {
                  text: "Add Article",
                  svg:iProIcons.icon_add({
                    classNames:[styleIcon["icon-inner"]]
                  })
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  private loadNews() {
    let webTitle: string = this.props.context.pageContext.web.title;
    let webType: string = this.props.context.pageContext.web.absoluteUrl.substring(this.props.context.pageContext.site.absoluteUrl.length + 1);

    webType = webType.substring(0, webType.indexOf("/"));

    return (
      this.state.articles.map((article) => {
        return React.createElement(listNews, {
          title: article.Title,
          date: article.ArticleStartDate,
          preview: article.PreviewText,
          webTitle: webTitle,
          webType: webType,
          breadcrumbClassType: breadcrumbClassType.red,
          publishingImage: article.PublishingPageImage,
          FileRef: article.FileRef,
          likeCount: article.LikesCount

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
