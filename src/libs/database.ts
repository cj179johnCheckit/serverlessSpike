import { MongoService } from './mongo';
import { get, cloneDeep } from 'lodash';
// import { ObjectID } from 'typeorm';
import { Check, ChecklistCheck, OptionsListCheck, SingleCheck } from './interfaces';
import { CheckStrategy } from './checks/CheckStrategy';
import { promises } from 'fs';

export class DatabaseService {
  private service: MongoService;

  constructor(dbConnection: any) {
    this.service = new MongoService(dbConnection);
  }

  async findCustomerTemplate(templateId: string): Promise<any> {
      this.service.setCollection('customer');
      const results = await this.service.find({ _id: templateId});
      return get(results, '[0]', {});
  }

  async findTemplateChecklists(templateId: string, customerId: string = 'test-id'): Promise<any> {
    console.log('STARTING');

    this.service.setCollection('check');

    const checksToDuplicate = await this.service.find({ customerId: templateId, isRoot: true });
    return Promise.all(checksToDuplicate.map(async (check: Check) =>
      await this.importCheck(check, null, null)
    ));

  }

  async findTemplateSchedules(templateId: string): Promise<any> {
    this.service.setCollection('schedule');
    return await this.service.find({ customerId: templateId});
  }

  async importCheck(source: Check, parent: Check = null, newParent: Check = null): Promise<any> {
    console.log(source.name);
    const proimses = [];

    const sourceClone = cloneDeep(source);
    const entityId = this.service.createId();
    const version = Date.now();
    const breadcrumbs = parent !== null ? parent.breadcrumbs : [];
    const breadcrumbId = { name: source.name, entityId: source._id };

    breadcrumbs.push(breadcrumbId);

    const newCheck = Object.assign(sourceClone, {
      _id: entityId,
      version,
      customerId: 'test-id',
      breadcrumbs
    });

    const sourceStrategy = new CheckStrategy().getStrategy(source.type);

    const children = sourceStrategy.getChildren(source);

    if (newParent) {
      const parentStrategy = new CheckStrategy().getStrategy(newParent.type);
      if (parentStrategy.needsUpdateChildLink(newParent)) {
        const updatedNewParent = parentStrategy.updateChildLink(newParent, entityId, source._id);
      }
    }

    return Promise.all(children.map(async (child: any) => {
      const childDetails = await this.service.findOne({_id: child.id});
      return await this.importCheck(childDetails, source, newCheck);
    }));

    // const updatedChildren = Promise.all(children.map(async child => await this.copy(child, source)))

    // update child references using updated children

    // const updatedCheck: Check = null;

    // return updatedCheck;
  }
}