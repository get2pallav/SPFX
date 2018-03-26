import {
    sp,
    ListEnsureResult,
    ClientSidePageLayoutType,
    ClientSidePage, ClientSideWebpart, CanvasColumn, WebPartsPersonalizationScope, ClientSideText, ClientSidePageComponent

} from 'sp-pnp-js';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import * as $ from 'jquery';

export interface IPeopleResultsProps {
    jobTitle: string,
    PictureUrl: string,
    PreferredName: string
}

export class ELHelper {
    static checkIfListExists(listName: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            sp.web.lists.getByTitle(listName).get()
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                })
        });
    }

    static getListItems(listName: string, fields: string): Promise<any> {
        return new Promise<void>((resolve) => {
            sp.web.lists.getByTitle(listName).items.select(fields).get().then((items: any) => {
                resolve(items);
            })
                .catch((e) => {
                    resolve([{ "Id": "1", "Title": "Hi" }] as any);
                })
        });
    }

    static getUserName(Id: number): Promise<string> {
        return new Promise<string>((resolve) => {
            sp.web.getUserById(Id).get().then((user) => {
                resolve(user.Title);
            })
                .catch(() => {
                    resolve("")
                })
        })
    }

    static getSiteUsers(): Promise<IPersonaProps[]> {

        return new Promise<IPersonaProps[]>((resolve) => {
            let personas: IPersonaProps[] = [];
            sp.web.siteUsers.get().then((peoples: any) => {
                peoples.forEach(people => {
                    personas.push({
                        primaryText: people.Title,
                        secondaryText: people.Email
                    })
                });
                resolve(personas);
            })
        })
    }

    static getUserProperites(user: string): Promise<any[]> {
        return new Promise<any>((resolve) => {
            $.getJSON("/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(@v)?@v='i:0%23.f|membership|" + user + "'").then(
                (result) => {
                    resolve(result.UserProfileProperties);
                });
        })

    }

    static setTenantUserProperty(isCurremtUser: boolean, userAccount: string, propertyName: string, propertyValue: string): Promise<any> {
        return new Promise<any>((resolve) => {

            sp.profiles.setSingleValueProfileProperty(userAccount, propertyName, propertyValue)
                .then((result) => { resolve(result) })
                .catch((error) => { resolve(error) })
        })
    }

    static createNewPage(pageName: string): Promise<string> {

        let pageTitle: string = encodeURI(pageName);

        return new Promise<string>((resolve, reject) => {
            sp.web.addClientSidePage(pageTitle + ".aspx", pageName).then((result: ClientSidePage) => {

                sp.web.getClientSideWebParts().then((cwps: ClientSidePageComponent[]) => {
                    let cw: ClientSidePageComponent = cwps.filter((wp) => { if (wp.ComponentType == 1 && wp.Name == "Banner") return wp; })[0];
                    console.log(cw);
                    let jsonWp: any = JSON.parse(cw.Manifest);
                    let wp: ClientSideWebpart = new ClientSideWebpart(jsonWp.alias);
                    wp.webPartId = jsonWp.id;
                    return wp;
                })
                    .then((wp: ClientSideWebpart) => {
                        result.checkout().then(() => {
                            result.addSection().addColumn(6).addControl(wp);
                            result.addSection().addColumn(6).addControl(new ClientSideText("This is a new one"));
                            result.save().then(() => {
                                console.log(result);
                                resolve("created")
                            })
                        })
                    })
            })

        })
    }

    static getPeopleResults(filterText?: string): Promise<IPersonaProps[]> {
        return new Promise<IPersonaProps[]>((resolve) => {
            let personas: IPersonaProps[] = [];

            let filterWithFirstUpperCase = filterText.charAt(0).toUpperCase() + filterText.slice(1);

            sp.web.siteUsers.filter("startswith(Title,'" + filterText + "') or startswith(Email,'" + filterText + "') or startswith(Title,'" + filterWithFirstUpperCase + "') or startswith(Email,'" + filterWithFirstUpperCase + "')")
                .get().then((peoples: any) => {
                    peoples.forEach(people => {
                        personas.push({
                            primaryText: people.Title,
                            secondaryText: people.Email,
                            imageUrl: '/_layouts/15/userphoto.aspx?size=s&username=' + people.Email
                        })
                    });
                    resolve(personas);
                })
        })
    }

}

export interface INewsArticle {
    Title: string,
    PreviewText: string,
    PublishingContact: string,
    PublishingRollupImage: string,
    PublishingPageImage: string,
    PublishingPageContent: string,
    ArticleStartDate: string,
    LikesCount: number,
    LikedByStringId: string[],
    FileRef: string,
    FileDirRef: string,
    SocialThreadID: string,
    Author: string,
    Created: string,
    ID: number
}

export class iProHelper {
    static getPageCount(webRealativePath: string): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            sp.web.getFolderByServerRelativePath(webRealativePath + "/pages/news").files
                .select("ListItemAllFields/ID,ListItemAllFields/Created").orderBy("ListItemAllFields/ArticleStartDate",true)
                .expand("ListItemAllFields")
                .get().then((items) => {
                    let ids: number[] = items.map((item) => { return item.ListItemAllFields.ID });
                    resolve(ids);
                })
        })
    }

    static getNewsArticleDetails(webRealativePath: string, itemId: number): Promise<INewsArticle> {
        return new Promise<INewsArticle>((resolve) => {
            sp.web.lists.getByTitle("pages").items.getById(itemId).fieldValuesAsHTML
                .select("Title,PreviewText,ArticleStartDate,LikesCount,LikedBy,FileLeafRef,Created,Author,PublishingPageImage")
                .get()
                .then((value) => {
                    var image = value.PublishingPageImage ? $(value.PublishingPageImage.replace("<img ", "<br ")).attr("src") : "" ;
                    let articleDate = value.ArticleStartDate ? (new Date(value.ArticleStartDate)).toDateString() : "";

                    let article: INewsArticle = {
                        Title: value.Title,
                        PreviewText: value.PreviewText,
                        PublishingRollupImage: "newsItem.PublishingRollupImage",
                        ArticleStartDate: articleDate,
                        LikesCount: value.LikesCount,
                        LikedByStringId: value.LikedBy,
                        FileRef: "../pages/news/"+ value.FileLeafRef,
                        Author: value.Author,
                        Created: value.Created,
                        FileDirRef: "",
                        ID: itemId,
                        PublishingContact: "",
                        PublishingPageContent: "",
                        PublishingPageImage: image,
                        SocialThreadID: ""
                    }
                    resolve(article);
                })
        })
    }

    // static getNewsArticles(webRealativePath: string): Promise<INewsArticle[]> {
    //     return new Promise<INewsArticle[]>((resolve, reject) => {
    //         sp.web.lists.getByTitle("pages").items
    //             .select("Title,PreviewText,ArticleStartDate,LikesCount,FileRef,Created,FieldValuesAsText/MetaInfo")
    //             .expand("FieldValuesAsText")
    //             .filter("startswith(FileRef,'" + webRealativePath + "/pages/news/')")
    //             .top(4).get().then((news) => {

    //                 let articles: INewsArticle[] = news.map((newsItem) => {

    //                     var pubImage = (newsItem.FieldValuesAsText.MetaInfo || "")
    //                         .split('\r\n')
    //                         .filter(function (e) { return e.match(/^PublishingRollupImage:SW/gi); })
    //                         .map(function (e) { return e.split('|')[1]; });
    //                     //    console.log(pubImage[0]);

    //                     let v: INewsArticle = {
    //                         Title: newsItem.Title,
    //                         PreviewText: newsItem.PreviewText,
    //                         PublishingRollupImage: "newsItem.PublishingRollupImage",
    //                         ArticleStartDate: newsItem.ArticleStartDate,
    //                         LikesCount: newsItem.LikesCount,
    //                         LikedByStringId: newsItem.LikedByStringId,
    //                         FileRef: newsItem.FileRef,
    //                         Author: "newsItem.Author",
    //                         Created: newsItem.Created,
    //                         FileDirRef: "",
    //                         ID: 0,
    //                         PublishingContact: "",
    //                         PublishingPageContent: "",
    //                         PublishingPageImage: "newsItem.PublishingPageImage",
    //                         SocialThreadID: ""
    //                     };

    //                     return v;
    //                 })
    //                 resolve(articles);
    //             });




    //         // sp.web.getFolderByServerRelativeUrl(webRealativePath + "/pages/news").files.top(4).expand("ListItemAllFields").get().then((news) => {
    //         //     console.log(news)
    //         //     let articles: INewsArticle[] = news.map((news) => {

    //         //         let newsDetails = news.ListItemAllFields;
    //         //         let v: INewsArticle = {
    //         //             Title:newsDetails.Title,
    //         //             PreviewText: newsDetails.PreviewText,
    //         //             PublishingRollupImage: newsDetails.PublishingRollupImage,
    //         //             ArticleStartDate: newsDetails.ArticleStartDate,
    //         //             LikesCount: newsDetails.LikesCount,
    //         //             LikedByStringId:newsDetails.LikedBy,
    //         //             FileRef : newsDetails.FileRef,
    //         //             Author: newsDetails.Author,
    //         //             Created: newsDetails.Created,
    //         //             FileDirRef :"",
    //         //             ItemCount:0,
    //         //             PublishingContact:"",
    //         //             PublishingPageContent:"",
    //         //             PublishingPageImage:newsDetails.PublishingPageImage,
    //         //             SocialThreadID:""
    //         //         };
    //         //         return v;
    //         //     })
    //         //     resolve(articles)
    //         // })
    //     })
    // }

}
