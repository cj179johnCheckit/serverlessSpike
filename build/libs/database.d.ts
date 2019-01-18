export declare class DatabaseService {
    private service;
    constructor(dbConnection: any);
    findCustomerTemplate(templateId: string): Promise<any>;
    findTemplateChecklists(templateId: string, customerId?: string): Promise<any>;
    importCheck(source: any, parentCheck: any): Promise<void>;
    importCheckbad(source: any, parentCheck: any): Promise<any>;
    findTemplateSchedules(templateId: string): Promise<any>;
}
