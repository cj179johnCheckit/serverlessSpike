export declare class DatabaseService {
    private service;
    constructor(dbConnection: any);
    findCustomerTemplate(templateId: string): Promise<any>;
}
