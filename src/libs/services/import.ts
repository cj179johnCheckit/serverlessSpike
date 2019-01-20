import { MongoService } from './mongo';
import { cloneDeep } from 'lodash';
import { Check } from '../interfaces';
import { SingleImport } from './singleImport';
import { CheckStrategy } from '../strategy/CheckStrategy';

export class ImportService {
  private service: MongoService;
  private singleImport: SingleImport;

  constructor(dbService: MongoService) {
    this.service = dbService;
    this.singleImport = new SingleImport(dbService);
  }

  async importTemplateChecklists(templateId: string, customerId: string = 'test-id'): Promise<any> {
    console.log('Starting checklists import');
    const checksToDuplicate = await this.service.find('check', { customerId: templateId, isRoot: true });
    return Promise.all(checksToDuplicate.map(async (check: Check) =>
      await this.importCheck(check, null, null)
    ));
  }

  async importCheck(source: Check, parent: Check = null, newParent: Check = null): Promise<any> {
    console.log(source.name);

    const newCheck = this.singleImport.copyCheck(source, newParent, 'test-customer-id');

    const sourceStrategy = new CheckStrategy().getStrategy(source.type);
    const children = sourceStrategy.getChildren(source);
    if (newParent) {
      const parentStrategy = new CheckStrategy().getStrategy(newParent.type);
      if (parentStrategy.needsUpdateChildLink(newParent)) {
        const updatedNewParent = parentStrategy.updateChildLink(newParent, newCheck._id, source._id);
      }
    }

    return Promise.all(children.map(async (child: any) => {
      const childDetails = await this.service.findOne('check', { _id: child.id });
      return await this.importCheck(childDetails, source, newCheck);
    }));
  }

  async importTemplateSchedules(templateId: string): Promise<any> {
    return await this.service.find('schedule', { customerId: templateId});
  }
}