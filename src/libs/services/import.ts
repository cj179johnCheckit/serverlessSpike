import { MongoService } from './mongo';
import { Check } from '../interfaces/check';
import { SingleImport } from './singleImport';

export class ImportService {
  private service: MongoService;
  private singleImport: SingleImport;
  private customerId: string;

  constructor(dbService: MongoService, customerId: string) {
    this.service = dbService;
    this.singleImport = new SingleImport(dbService);
    this.customerId = customerId;
  }

  async importTemplateChecklists(templateId: string): Promise<any> {
    console.log('Starting checklists import');
    const checksToDuplicate = await this.service.find('check', { customerId: templateId, isRoot: true });
    return Promise.all(checksToDuplicate.map(async (check: Check) =>
      await this.importCheck(check, null)
    ));
  }

  async importCheck(source: Check, newParent: Check = null): Promise<any> {
    console.log(source.name);
    const promises = [];

    const newCheck = this.singleImport.copyCheck(source, newParent, this.customerId);
    const children = this.singleImport.getCheckChildren(source);

    if (newParent) {
      const updatePromise = await this.singleImport.updateCheckParent(newParent, newCheck._id, source._id);
      promises.push(updatePromise);
    }

    const childrenSearchPromises = children.map(async (child: any) => {
      const childDetails = await this.service.findOne('check', { _id: child.id });
      return await this.importCheck(childDetails, newCheck);
    });

    const saveNewCheckPromise = await this.service.insert('check', [newCheck]);

    promises.push(saveNewCheckPromise);

    return Promise.all(promises.concat(childrenSearchPromises));
  }

  async importTemplateSchedules(templateId: string): Promise<any> {
    return await this.service.find('schedule', { customerId: templateId});
  }
}