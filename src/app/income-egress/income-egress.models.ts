interface ObjData {
    description: string;
    value: number;
    type: string;
    uid?: string;
}

export class IncomeEgress {
    public description: string;
    public value: number;
    public type: string;
    public uid?: string;

    constructor(objData: ObjData) {
        this.description = objData && objData.description || null;
        this.value = objData && objData.value || null;
        this.type = objData && objData.type || null;
        // this.uid = objData && objData.uid || null;
    }
}
