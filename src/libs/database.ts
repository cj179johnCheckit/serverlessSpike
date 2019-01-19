import { MongoService } from './mongo';
import { get, cloneDeep } from 'lodash';
// import { ObjectID } from 'typeorm';
import { Check, ChecklistCheck, OptionsListCheck, SingleCheck } from './interfaces';
import { CheckStrategy } from './checks/checkStrategy';

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
      await this.importCheck(check, null)
    ));

  }

  async findTemplateSchedules(templateId: string): Promise<any> {
    this.service.setCollection('schedule');
    return await this.service.find({ customerId: templateId});
  }

  async importCheck(source: Check, parent: Check = null): Promise<any> {
    console.log(source.name);

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

    const strategy = new CheckStrategy().getStractegy(source.type);

    const children = strategy.getChildren(source);

    return Promise.all(children.map(async (child: any) => {
      const childDetails = await this.service.findOne({_id: child.id});
      return await this.importCheck(childDetails, source);
    }));

    // const updatedChildren = Promise.all(children.map(async child => await this.copy(child, source)))

    // update child references using updated children

    // const updatedCheck: Check = null;

    // return updatedCheck;
  }

  // async getChildren(source: Check): Promise<Check[]> {
  //   // use type to get the children, then look up in Mongo
  //   return [];
  // }

  // async importCheck(source: Check, parentCheck:Check): Promise<any> {

  //   console.log(source.name);

  //   switch (source.type) {
  //     case 'checklist':
  //       const checklist = source as ChecklistCheck;

  //       return Promise.all(checklist.checklist.checklistItems.map(async (item: any, index: any) => {
  //         const itemData = await this.service.findOne({_id: item.checkEntityId})

  //         return this.importCheck(itemData, source)
  //       }));
  //     case 'optionsList':
  //       const optionsList = source as OptionsListCheck
  //       return Promise.all(optionsList.optionsList.options.map(async (option: any, index: any) => {
  //         let result: Array<Promise<any>> = [];

  //         if (option.followUpCheckEntityId) {
  //           const followUpData = await this.service.findOne({_id: option.followUpCheckEntityId});
  //           result.concat(await this.importCheck(followUpData, source));
  //         }

  //         if (option.timeDelayedCheckEntityId) {
  //           const timeDelayData = await this.service.findOne({_id: option.timeDelayedCheckEntityId});
  //           result.concat(await this.importCheck(timeDelayData, source));
  //         }
  //         return result;
  //       }));
  //     case 'temperature': case 'text': case 'acknowledgement': case 'dateEntry':
  //     const singleCheck = source as SingleCheck;

  //     let result: Array<Promise<any>> = [];

  //     if (singleCheck[source.type].followUpCheckEntityId) {
  //         const followUpData = await this.service.findOne({_id: singleCheck[source.type].followUpCheckEntityId});
  //         result.concat(await this.importCheck(followUpData, source));
  //       }
  //       if (singleCheck[source.type].timeDelayedCheckEntityId) {
  //         const timeDelayedData = await this.service.findOne({_id: singleCheck[source.type].timeDelayedCheckEntityId});
  //         result.concat(await this.importCheck(timeDelayedData, source));
  //       }

  //       return result;
  //     default: return [];
  //   }
  // }

  // async importCheckbad(source: any, parentCheck: any) {

  //   const sourceClone = cloneDeep(source);
  //   const entityId = this.service.createId();
  //   const version = Date.now();

  //   const breadcrumbs = parentCheck !== null ? parentCheck.breadcrumbs : [];
  //   const breadcrumbId = { name: source.name, entityId: source._id };

  //   breadcrumbs.push(breadcrumbId);

  //   const newCheck = Object.assign(sourceClone, {
  //     _id: entityId,
  //     version,
  //     customerId: 'test-id',
  //     breadcrumbs
  //   });

  //   switch (newCheck.type) {
  //     case 'checklist':
  //       source.checklist.checklistItems.map(async(item: any, index: any) => {
  //         const itemData = await this.service.findOne({_id: item.checkEntityId});
  //         if (itemData) {
  //           const newData = await this.importCheck(itemData, newCheck);

  //           newCheck.checklist.checklistItems[index].checkEntityId = newData._id;
  //         }
  //       });
  //     break;
  //     case 'optionsList':
  //       source.optionsList.options.map(async (option: any, index: any) => {
  //         if (option.followUpCheck) {
  //           const optionData = await this.service.findOne({_id: option.followUpCheck});
  //           if (optionData) {
  //             source.optionsList.options[index].followUpCheck.entityId = await this.importCheck(optionData, newCheck);
  //           }
  //         }

  //         if (option.timeDelayedCheck) {
  //           const optionData = await this.service.findOne({_id: option.timeDelayedCheck});
  //           if (optionData) {
  //             source.optionsList.options[index].timeDelayedCheck.entityId = await this.importCheck(optionData, newCheck);
  //           }
  //         }

  //       });
  //     break;
  //     case 'temperature':
  //     case 'text':
  //     case 'acknowledgement':
  //     case 'dateEntry':
  //       if (source.followUpCheck) {
  //         const followUpCheckData = await this.service.findOne({_id: source.followUpCheck});
  //         if (followUpCheckData) {
  //           source.followUpCheckEntityId = await this.importCheck(followUpCheckData, newCheck);
  //         }
  //       }
  //       if (source.timeDelayedCheck) {
  //         const timeDelayedCheckData = await this.service.findOne({_id: source.timeDelayedCheck});
  //         if (timeDelayedCheckData) {
  //           source.timeDelayedCheck.entityId = await this.importCheck(timeDelayedCheckData, newCheck);
  //         }
  //       }
  //     break;
  //   }
  //   // await this.service.insert([newCheck]);
  //   console.log(newCheck.name);
  //   return newCheck;
  // }
}