import { MongoService } from './mongo';
import { get, cloneDeep } from 'lodash';
import { ObjectID } from 'typeorm';
interface breadcrumbId {
  [key: string]: any,
  name: string,
  entityId: ObjectID
};

export class DatabaseService {
  private service: MongoService;
  private count: number;
  constructor(dbConnection: any) {
    this.service = new MongoService(dbConnection);
    this.count = 0;
  }

  async findCustomerTemplate(templateId: string): Promise<any> {
      this.service.setCollection('customer');
      const results = await this.service.find({ _id: templateId});
      return get(results, '[0]', {});
  }

  async findTemplateChecklists(templateId: string, customerId: string = 'test-id'): Promise<any> {
    this.service.setCollection('check');

    const checksToDuplicate = await this.service.find({ customerId: templateId, isRoot: true });

    checksToDuplicate.map(async (check: any) => {
      await this.importCheck(check, null);
    })
  }
  async importCheck(source: any, parentCheck: any) {
    this.count ++;
    const sourceClone = cloneDeep(source);
    const entityId = this.service.createId();
    const version = Date.now();

    const breadcrumbs = parentCheck !== null ? parentCheck.breadcrumbs : [];
    const breadcrumbId = { name: source.name, entityId: source._id };

    breadcrumbs.push(breadcrumbId);

    const newCheck = Object.assign(sourceClone, {
      _id: entityId,
      version,
      customerId: 'test-id',
      breadcrumbs
    });

    switch (newCheck.type) {
      case 'checklist':
        source.checklist.checklistItems.map(async (item: any, index: any) => {
          const itemData = await this.service.findOne({_id: item.checkEntityId});
          if (itemData) {
            newCheck.checklist.checklistItems[index].checkEntityId = await this.importCheck(itemData, newCheck)._id;
          }
        });
      break;
      // case 'optionsList':
      //   source.optionsList.options.map(async (option: any) => {
      //     if (option.followUpCheck) {
      //       option.followUpCheck = await this.importCheck(option.followUpCheck, newCheck);
      //     }

      //     if (option.timeDelayedCheck) {
      //       option.timeDelayedCheck = await this.importCheck(option.timeDelayedCheck, newCheck);
      //     }

      //   });
      // break;
      // case 'temperature':
      // case 'text':
      // case 'acknowledgement':
      // case 'dateEntry':
      //   if (source.followUpCheck) {
      //     source.followUpCheckEntityId = this.importCheck(source.followUpCheck, newCheck);
      //   }
      //   if (source.timeDelayedCheck) {
      //     source.timeDelayedCheck = this.importCheck(source.timeDelayedCheck, newCheck);
      //   }
      // break;
    }
    await this.service.insert([newCheck]);
    return newCheck;
  }

  async findTemplateSchedules(templateId: string): Promise<any> {
    this.service.setCollection('schedule');
    return await this.service.find({ customerId: templateId});
  }
}