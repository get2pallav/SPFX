import * as React from 'react';
import styleHeadling from '../../components/style/headline-block.module.scss';
import styleBreadcrumbs from '../../components/style/breadcrumbs.module.scss';
import styleLayout from '../../components/style/iProLayout.module.scss';

export interface IlistNewsProps{
 title:string,
 date:string,
 preview:string
}

export default class listNews extends React.Component<IlistNewsProps,{}>{
    render(): React.ReactElement<IlistNewsProps>{
        return (
            <div>
            <div className={styleHeadling.headlineBlock}>
              {/* {{ if PublishingPageImage }} */}
              <div className={styleHeadling["headlineBlock-img"]}>
                {/* <div className="imgFillBG" style="background-image: url('{{:~SPThumbNail.pictureFileReftoLargeThumbnailUrl(~Image.getImgSrc(PublishingPageImage))}}')"></div> */}
              </div>
              {/* {{/if}} */}
              <div className={[styleLayout.vr, styleLayout.vr_x5, styleLayout.vr_x4S, styleLayout.vr_x5M].join(' ')}>
                <div className={styleHeadling["headlineBlock-text"]}>
                  <div className="breadcrumbsDetail mix-breadcrumbsDetail{{if ~DepartmentNews.findToken(FileRef,'/Departments/')}}_alt{{else ~DepartmentNews.findToken(FileRef,'/Communities/')}}_alt2{{else}}{{/if}}">
                    <span className={styleBreadcrumbs["breadcrumbsDetail-circle"]}></span>
                    <span className={styleBreadcrumbs["breadcrumbsDetail-main_link"]}></span>
                    <span className={styleBreadcrumbs["breadcrumbsDetail-icon"]}>
                      <span className="icon icon_arrowRight">
                        <svg className="icon-inner">
                        </svg>
                      </span>
                    </span>
                    {/* <span className="breadcrumbsDetail-main">{{: ~webTitle}}</span> */}
                  </div>
                  <h5 className={styleHeadling["headlineBlock-text-title"]}><a href="{{:FileRef}}">{this.props.title}</a></h5> 
                  <div className={styleHeadling["headlineBlock-text-detail"]}>{this.props.date}</div>
                  <div className={styleHeadling["headlineBlock-text-main"]}>{this.props.preview}</div>
                </div>
              </div>
              <div className={[styleLayout.vr, styleLayout.vr_x5, styleLayout.vr_x8S, styleLayout.vr_x10M].join(' ')}>
                <div className={styleHeadling["headlineBlock-icon"]}>
                  <div className={styleLayout.grid}>
                    <div className={[styleLayout["grid-col"], styleLayout["grid-col_6of12"]].join(' ')}>
                      <div className="listH listH_x5">
                        <div>
                          <h4 className="u-isVisuallyHidden">Likes</h4>
                          {/* <button type="button" className="iconLabel analyticsTrigger" name="likeControl" listIdx="{{:#getIndex()}}" dcnIndex="0" listId="{{:~dcn._listId}}" itemId="{{:ID}}" likeclassName="iconLabel_isActive" analyticsSite="{{:~webTitle}}" analyticsList="{{:FileDirRef}}" analyticsId="{{:ID}}" analyticsTitle="{{:Title}}" analyticsAuthor="{{getLookUp:Author}}" analyticsPub="{{convertDateIn:Created dateFormat='datefmt_sharepoint'}}" analyticsContent="article" analyticsActn="like" analyticsActnId="2" analyticsContentId="1"> */}
                          <button>
                            <span className="iconLabel-icon">
                              <span className="icon icon_like">
                                <svg className="icon-inner">
                                </svg>
                              </span>
                            </span>
                            <span className="iconLabel-label">(%d)</span>
                          </button>
                        </div>
                        <div>
                          <h4 className="u-isVisuallyHidden">Comments</h4>
                          <div className="iconLabel mix-iconLabel_inactive">
                            <span className="iconLabel-icon">
                              <span className="icon icon_comment">
                                <svg className="icon-inner">
                                </svg>
                              </span>
                            </span>
                            {/* <span name='SocialPostCount' SocialThreadID="{{:SocialThreadID}}" SocialMarker="SocialThreadRecord_{{:ID}}" dcnIndex="0" itemId="{{:ID}}" itemIndex="{{:#getIndex()}}"></span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={[styleLayout["grid-col"], styleLayout["grid-col_6of12"], styleLayout["mix-grid-col_textOpp"]].join(' ')}>
                      <div className="listH listH_x5">
                        {/* {{ if ~Permission.canEditListItems(~dcn) }} */}
                        <div className="cui-menuDropdown">
                          <div className="dropdownMenuContainer mix-dropdownMenuContainer_pos3">
                            <button type="button" className="btnMenu cui-menuDropdown-btn">
                              <span className="icon icon_dots">
                                <svg className="icon-inner">
                                </svg>
                              </span>
                            </button>
                            <div className="dropdownMenuContainer-main cui-menuDropdown-main">
                              <div className="dropdownBlock mix-dropdownBlock_noArrow">
                                <div className="dropdownBlock-main mix-dropdownBlock-main_pos3">
                                  <div className="dropdownMenuSection">
                                    <div className="dropdownMenuSection-section">
                                      <ul className="blocks blocks_1upM mix-blocks_spaceAlt">
                                        {/* <li className="js-copyLink-btn analyticsTrigger" data-clip-target="#clip-target-{{:#getIndex()}}" analyticsSite="{{:~webTitle}}" analyticsList="{{:FileDirRef}}" analyticsId="{{:ID}}" analyticsTitle="{{:Title}}" analyticsAuthor="{{getLookUp:Author}}" analyticsPub="{{convertDateIn:Created dateFormat='datefmt_sharepoint'}}" analyticsContent="article" analyticsActn="share" analyticsActnId="3" analyticsContentId="1"> */}
                                        <li>
                                          <span className="dropdownMenuSection-section-link">Copy Link</span>
                                          <input id="clip-target-{{:#getIndex()}}" className="hidden" value="{{:~DepartmentNews.getLink(FileRef)}}" />
                                          <span className="copyLink-tooltip js-copyLink-tooltip">
                                            <span className="copyLink-message_inline">Copied!</span>
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="dropdownMenuSection-section">
                                      <ul className="blocks blocks_1upM mix-blocks_spaceAlt">
                                        <li><a href="{{:~webAbsoluteUrl}}/Pages/NewArticle.aspx?ID={{:ID}}&source={{:FileRef}}">Edit</a></li>
                                        <li><span className="dropdownMenuSection-section-link" >Delete</span></li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="dropdownMenuContainer-cover cui-menuDropdown-coverTrigger"></div>
                          </div>
                        </div>
                        {/* {{ else}} */}
                        <div>
                          <button type="button" className="copyLink-btn iconLabel js-copyLink-btn" data-clip-target="#clip-target-{{:#getIndex()}}">
                            <span className="iconLabel-icon">
                              <span className="icon icon_share">
                                <svg className="icon-inner">
                                </svg>
                              </span>
                            </span>
                            <span className="iconLabel-label">Copy Link</span>
                            <input id="clip-target-{{:#getIndex()}}" className="hidden" value="{{:~DepartmentNews.getLink(FileRef)}}" />
                            <span className="copyLink-tooltip js-copyLink-tooltip">
                              <span className="copyLink-message mix-copyLink-message-article">Copied!</span>
                            </span>
                          </button>
                        </div>
                        {/* {{/if}} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}