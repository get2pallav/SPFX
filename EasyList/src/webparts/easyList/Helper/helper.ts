import {
    sp,
    ListEnsureResult
} from 'sp-pnp-js';


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

    static getUserName(Id:number) : Promise<string>{
        return new Promise<string>((resolve) =>{
            sp.web.getUserById(Id).get().then((user) =>{
               resolve(user.Title);
            })
            .catch(()=>{
                resolve("")
            })
        })
    }
}
