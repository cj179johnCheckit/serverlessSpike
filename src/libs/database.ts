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

  constructor(dbConnection: any) {
    this.service = new MongoService(dbConnection);
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

  async importCheck(source: any, parentCheck:any) {

    console.log(source.name);
    switch (source.type) {
      case 'checklist':
        source.checklist.checklistItems.map(async(item: any, index: any) => {
          const itemData = await this.service.findOne({_id: item.checkEntityId});
          this.importCheck(itemData, source);
        });
      break;
      case 'optionsList':
        source.optionsList.options.map(async (option: any, index: any) => {
          if (option.followUpCheckEntityId) {
            const followUpData = await this.service.findOne({_id: option.followUpCheckEntityId});
            this.importCheck(followUpData, source);
          }

          if (option.timeDelayedCheckEntityId) {
            const timeDelayData = await this.service.findOne({_id: option.timeDelayedCheckEntityId});
            this.importCheck(timeDelayData, source);
          }

        });
      break;
      case 'temperature':
      case 'text':
      case 'acknowledgement':
      case 'dateEntry':
        if (source[source.type].followUpCheckEntityId) {
          const followUpData = await this.service.findOne({_id: source[source.type].followUpCheckEntityId});
          this.importCheck(followUpData, source);
        }
        if (source[source.type].timeDelayedCheckEntityId) {
          const timeDelayedData = await this.service.findOne({_id: source[source.type].timeDelayedCheckEntityId});
          this.importCheck(timeDelayedData, source);
        }
      break;
    }
  }

  async importCheckbad(source: any, parentCheck: any) {

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
        source.checklist.checklistItems.map(async(item: any, index: any) => {
          const itemData = await this.service.findOne({_id: item.checkEntityId});
          if (itemData) {
            const newData = await this.importCheck(itemData, newCheck);

            newCheck.checklist.checklistItems[index].checkEntityId = newData._id;
          }
        });
      break;
      case 'optionsList':
        source.optionsList.options.map(async (option: any, index: any) => {
          if (option.followUpCheck) {
            const optionData = await this.service.findOne({_id: option.followUpCheck});
            if (optionData) {
              source.optionsList.options[index].followUpCheck.entityId = await this.importCheck(optionData, newCheck);
            }
          }

          if (option.timeDelayedCheck) {
            const optionData = await this.service.findOne({_id: option.timeDelayedCheck});
            if (optionData) {
              source.optionsList.options[index].timeDelayedCheck.entityId = await this.importCheck(optionData, newCheck);
            }
          }

        });
      break;
      case 'temperature':
      case 'text':
      case 'acknowledgement':
      case 'dateEntry':
        if (source.followUpCheck) {
          const followUpCheckData = await this.service.findOne({_id: source.followUpCheck});
          if (followUpCheckData) {
            source.followUpCheckEntityId = await this.importCheck(followUpCheckData, newCheck);
          }
        }
        if (source.timeDelayedCheck) {
          const timeDelayedCheckData = await this.service.findOne({_id: source.timeDelayedCheck});
          if (timeDelayedCheckData) {
            source.timeDelayedCheck.entityId = await this.importCheck(timeDelayedCheckData, newCheck);
          }
        }
      break;
    }
    // await this.service.insert([newCheck]);
    console.log(newCheck.name);
    return newCheck;
  }

  async findTemplateSchedules(templateId: string): Promise<any> {
    this.service.setCollection('schedule');
    return await this.service.find({ customerId: templateId});
  }
}