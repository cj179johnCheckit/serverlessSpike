import { Check } from './interfaces';
export declare class DatabaseService {
    private service;
    constructor(dbConnection: any);
    findCustomerTemplate(templateId: string): Promise<any>;
    findTemplateChecklists(templateId: string, customerId?: string): Promise<any>;
    findTemplateSchedules(templateId: string): Promise<any>;
    importCheck(source: Check, parent?: Check): Promise<any>;
}
