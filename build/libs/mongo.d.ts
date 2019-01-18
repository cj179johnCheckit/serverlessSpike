export declare class MongoService {
    private db;
    private collection;
    constructor(dbConnection: any);
    setCollection(collectionName: string): MongoService;
    findOne(params: any): Promise<any>;
    find(params: any): Promise<any>;
    updateOne(params: any, newValue: any): Promise<any>;
    insert(data: Object[]): Promise<any>;
    createId(): any;
}
