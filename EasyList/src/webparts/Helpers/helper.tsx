import {
    sp,
    ListEnsureResult

} from 'sp-pnp-js';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import * as $ from 'jquery';

export interface IPeopleResultsProps {
    jobTitle: string,
    PictureUrl: string,
    PreferredName: string
}
//import { Screwdriver,IScrewdriverSettings } from 'sp-screwdriver';
require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepointOnline');
require('sharepointOnline-userprofile')



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

    static setTenantUserProperty(){
        
        // const context: = new SP.ClientContext("https://codesignedintranet-admin.sharepoint.com");
        // const peopleManager: SP.UserProfiles.PeopleManager = new SP.UserProfiles.PeopleManager(context);
        // let userAccount = "i:0#.f|membership|brian@codesignedintranet.onmicrosoft.com";

         
    
            
        sp.configure({
            
        },"")        
       // peopleManager.
      //  peopleManager.setSingleValuedProfileProperty(userAccount,"AboutMe","Brain");

    //    const setting:IScrewdriverSettings = {
    //     siteUrl:"https://codesignedintranet-admin.sharepoint.com"
    //    }

    //    let s = new Screwdriver(setting);
    //    s.ups.setSingleValueProfileProperty({
    //        baseUrl:"https://codesignedintranet-admin.sharepoint.com",
    //        propertyName:"AboutMe",
    //        accountName:userAccount,
    //        propertyValue:"Hi"
    //    })
       
    }

    static getCurrentUserEmail(): Promise<string> {
        return new Promise<string>((resolve)=>{
            sp.web.currentUser.select("Email").get().then((result)=>{
                resolve(result.Email)
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
