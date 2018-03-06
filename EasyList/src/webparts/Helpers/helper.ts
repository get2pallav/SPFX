import {
    sp,
    ListEnsureResult
} from 'sp-pnp-js';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

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

    static getPeopleResults(filterText?: string): Promise<IPersonaProps[]> {
        return new Promise<IPersonaProps[]>((resolve) => {
            let personas: IPersonaProps[] = [];
            if (!filterText)
                filterText = "A";
            sp.web.siteUsers.filter("startswith(Title,'" + filterText + "') or startswith(Email,'"+ filterText + "')").get().then((peoples: any) => {
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
}
