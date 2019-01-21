import { MongoService } from './mongo';
import { cloneDeep } from 'lodash';
import { BreadcrumbId, Check } from '../interfaces/check';
import { CheckStrategy } from '../strategy/checkStrategy';
import { ObjectID } from 'typeorm';

export class SingleImport {
  private service: MongoService;
  private strategy: CheckStrategy;

  constructor(dbService: MongoService) {
    this.service = dbService;
    this.strategy = new CheckStrategy();
  }

  copyCheck(source: Check, parent: Check, customerId: string): Check {
    const sourceClone = cloneDeep(source);
    const newCheckId = this.service.createId();
    const version = Date.now();

    let breadcrumbs = <BreadcrumbId[]> [];

    if (parent !== null) {
      breadcrumbs = parent.breadcrumbs.concat([{
        name: parent.name,
        entityId: parent._id
      }]);
    }

    sourceClone.breadcrumbs = breadcrumbs;

    return Object.assign(sourceClone, {
      _id: newCheckId,
      version,
      customerId
    });
  }

  getCheckChildren(source: Check): any[] {
    const sourceStrategy = this.strategy.getStrategy(source.type);
    return sourceStrategy.getChildren(source);
  }

  async updateCheckParent(parent: Check, childId: ObjectID, sourceCheckId: ObjectID): Promise<any> {
    const parentStrategy = this.strategy.getStrategy(parent.type);
    if (parentStrategy.needsUpdateChildLink(parent)) {
      const updatedParent = parentStrategy.updateChildLink(parent, childId, sourceCheckId);
      return await this.service.updateOne('check', { _id: parent._id }, updatedParent);
    }
    return Promise.resolve();
  }

}