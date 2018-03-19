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
                    let cw: ClientSidePageComponent = cwps.filter((wp) => { if (wp.ComponentType == 1 && wp.Name == "EasyList") return wp; })[0];
                    console.log(cw);
                    let jsonWp : any = JSON.parse(cw.Manifest);
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

                //  let wp: ClientSideWebpart = new ClientSideWebpart("EasyListWebPart");
                //   wp.import()
                //  wp.webPartId = "fce9c774-6c5e-46e6-8582-ebb8c6634f93";

                // wp.propertieJson

                //  console.log( wp.getProperties());

                //    let v:ClientSidePageComponent;


                //     result.checkout().then(() => {
                //         result.addSection().addColumn(6).addControl(wp);


                //         result.addSection().addColumn(6).addControl(new ClientSideText("This is a new one"));
                //         result.save().then(() => {
                //             console.log(result);
                //             resolve( "created" )
                //         })
                //     })
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
