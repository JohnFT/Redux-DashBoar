interface DataObj {
    name: string;
    email: string;
    uid: string;
}

export class User {
    public name: string;
    public email: string;
    public uid: string;

    constructor(user: DataObj) {
        this.name = user && user.name || null;
        this.email = user && user.email || null;
        this.uid = user && user.uid || null;
    }
}


