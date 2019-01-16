export declare class MongoService {
    private db;
    private collection;
    constructor(dbConnection: any);
    setCollection(collectionName: string): MongoService;
    find(params: any): Promise<any>;
    updateOne(params: any, newValue: any): Promise<any>;
}
