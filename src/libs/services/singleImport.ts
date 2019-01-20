import { MongoService } from './mongo';
import { get, cloneDeep } from 'lodash';
import { Check, BreadcrumbId } from '../interfaces';
import { CheckStrategy } from '../strategy/CheckStrategy';
import { log } from 'util';

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
}