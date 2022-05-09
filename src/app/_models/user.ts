//interface in angular is diffrent from c# when we use interface in angular
// it specify that something is type of something
export interface User {
    username:string;
    token:string;
    photoUrl:string;
    knownAs: string;
    gender:string;
    roles : string[]; // because user could have multiple role
}



