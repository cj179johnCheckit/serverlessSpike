import { MongoService } from './mongo';
import { get } from 'lodash.get';

export class DatabaseService {
  private service: MongoService;

  constructor(dbConnection: any) {
    this.service = new MongoService(dbConnection);
  }

  async findCustomerTemplate(templateId: string) {
    try {
      this.service.setCollection('customer');
      const results = await this.service.find({ _id: templateId});
      return get(results, '[0]', {});
    } catch (err) {
      console.log(err);
    }

  }
}