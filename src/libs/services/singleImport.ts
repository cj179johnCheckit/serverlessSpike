import { MongoService } from './mongo';
import { get, cloneDeep } from 'lodash';
import { Check, BreadcrumbId } from '../interfaces';
import { CheckStrategy } from '../strategy/CheckStrategy';
import { ObjectID } from 'typeorm';

export class SingleImport {
  private service: MongoService;

  constructor(dbService: MongoService) {
    this.service = dbService;
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
    const sourceStrategy = new CheckStrategy().getStrategy(source.type);
    return sourceStrategy.getChildren(source);
  }

  async updateCheckParent(parent: Check, childId: ObjectID, sourceCheckId: ObjectID): Promise<any> {
    const parentStrategy = new CheckStrategy().getStrategy(parent.type);
    if (parentStrategy.needsUpdateChildLink(parent)) {
      const updatedParent = parentStrategy.updateChildLink(parent, childId, sourceCheckId);
      return await this.service.updateOne('check', { _id: parent._id }, updatedParent);
    }
    return Promise.resolve();
  }

}