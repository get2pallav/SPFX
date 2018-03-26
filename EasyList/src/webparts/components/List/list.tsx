import * as React from 'react';
import styleHeadling from '../../components/style/headline-block.module.scss';
import styleBreadcrumbs from '../../components/style/breadcrumbs.module.scss';
import styleLayout from '../../components/style/iProLayout.module.scss';
import styleIcon from '../style/icon.module.scss';
import styleIconLabel from '../style/iconLabel.module.scss';
import styleDropdown from '../style/dropdown.module.scss';
import styleImage from '../style/images.module.scss';
import iProIcons, { IIconProps } from '../icons/icons';
import styleUtil from '../style/utility.module.scss';
export enum breadcrumbClassType {
  orange,
  red
}

export interface IlistNewsProps {
  title: string,
  date: string,
  preview: string,
  webTitle: string,
  webType: string,
  breadcrumbClassType: breadcrumbClassType,
  publishingImage: string,
  FileRef: string,
  likeCount: number
}

export default class listNews extends React.Component<IlistNewsProps, {}>{
  render(): React.ReactElement<IlistNewsProps> {
    return (
      <div className={styleHeadling.headlineBlock}>
        {/* {{ if PublishingPageImage }} */}
        <div className={styleHeadling["headlineBlock-img"]}>
          <div className={styleImage["imgFillBG"]} style={{ backgroundImage: "url('" + this.pictureFileReftoLargeThumbnailUrl(this.props.publishingImage) + "')" }} ></div>
        </div>
        {/* {{/if}} */}
        <div className={[styleLayout.vr, styleLayout.vr_x5, styleLayout.vr_x4S, styleLayout.vr_x5M].join(' ')}>
          <div className={styleHeadling["headlineBlock-text"]}>
            <div className={[styleBreadcrumbs.breadcrumbsDetail, this.props.breadcrumbClassType == breadcrumbClassType.orange ? styleBreadcrumbs["mix-breadcrumbsDetail_alt"] : styleBreadcrumbs["mix-breadcrumbsDetail_alt2"]].join(' ')}>
              <span className={styleBreadcrumbs["breadcrumbsDetail-circle"]}></span>
              <span className={styleBreadcrumbs["breadcrumbsDetail-main"]}>{this.props.webType}</span>
              <span className={styleBreadcrumbs["breadcrumbsDetail-icon"]}>
                <span className={[styleIcon.icon, styleIcon.icon_arrowRight].join(' ')}>
                  {iProIcons.icon_arrowRight({
                    classNames: [styleIcon["icon-inner"]]
                  })}
                </span>
              </span>
              <span className="breadcrumbsDetail-main">{this.props.webTitle}</span>
            </div>
            <div className={styleHeadling["headlineBlock-text-title"]}><a href={this.props.FileRef}>{this.props.title}</a></div>
            <div className={styleHeadling["headlineBlock-text-detail"]}>{this.props.date}</div>
            <div className={styleHeadling["headlineBlock-text-main"]}>{this.props.preview}</div>
          </div>
        </div>
        <div className={[styleLayout.vr, styleLayout.vr_x5, styleLayout.vr_x8S, styleLayout.vr_x10M].join(' ')}>
          <div className={styleHeadling["headlineBlock-icon"]}>
            <div className={styleLayout.grid}>
              <div className={[styleLayout["grid-col"], styleLayout["grid-col_6of12"]].join(' ')}>
                <div className={[styleLayout.listH, styleLayout.listH_x5].join(' ')}>
                  <div>
                    <h4 className={styleUtil["u-isVisuallyHidden"]}>Likes</h4>
                    <button type="button" className={[styleIconLabel.iconLabel, "analyticsTrigger"].join(' ')} style={{ backgroundColor: "transparent", borderWidth: 0 }} name="likeControl">
                      <span className={styleIconLabel["iconLabel-icon"]}>
                        <span className={[styleIcon.icon, styleIcon.icon_like].join(' ')}>
                          {iProIcons.icon_like({
                            classNames: [styleIcon["icon-inner"]]
                          })}
                        </span>
                      </span>
                      <span className={styleIconLabel["iconLabel-label"]}>{this.props.likeCount ? this.props.likeCount : 0 }</span>
                    </button>
                  </div>
                  <div>
                    <h4 className={styleUtil["u-isVisuallyHidden"]}>Comments</h4>
                    <div className={[styleIconLabel.iconLabel, styleIconLabel["mix-iconLabel_inactive"]].join(' ')}>
                      <span className={styleIconLabel["iconLabel-icon"]}>
                        <span className={[styleIcon.icon, styleIcon.icon_comment].join(' ')}>
                          {iProIcons.icon_comment({
                            classNames: [styleIcon["icon-inner"]]
                          })}
                        </span>
                      </span>
                      {/* <span name='SocialPostCount' SocialThreadID="{{:SocialThreadID}}" SocialMarker="SocialThreadRecord_{{:ID}}" dcnIndex="0" itemId="{{:ID}}" itemIndex="{{:#getIndex()}}"></span> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={[styleLayout["grid-col"], styleLayout["grid-col_6of12"], styleLayout["mix-grid-col_textOpp"]].join(' ')}>
                      <div className={[styleLayout.listH, styleLayout.listH_x5].join(' ')}>
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
                                      <ul className={[styleLayout.blocks, styleLayout.blocks_1upM, styleLayout["mix-blocks_spaceAlt"]].join(' ')}>
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
                      </div>
                    </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  pictureFileReftoLargeThumbnailUrl(URL: string) {
    try {
      if (URL && URL.length > 0) {
        var fileName = URL.split('/').pop();
        var n = URL.lastIndexOf(fileName);
        fileName = (fileName.replace(/.([^.]*)$/, '_$1') + ".jpg");
        if (n >= 0 && n + fileName.length >= URL.length) {
          URL = URL.substring(0, n) + "_w/" + fileName;
        }
      }
    } catch (e) { }
    return URL;

  }
}