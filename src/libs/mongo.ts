import { Collection } from 'typeorm';

const mongodb = require('mongodb');

export class MongoService {
  private db: any;
  private collection: Collection;

  constructor(dbConnection: any) {
    this.db = dbConnection.db();
  }

  setCollection(collectionName: string): MongoService {
    this.collection = this.db.collection(collectionName);
    return this;
  }

  async findOne(params: any): Promise<any> {
    const results = await this.find(params);
    return results.length > 0 ? results.shift() : null;
  }
  find(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.collection.find(params).toArray((err: Error, docs: any) =>
        err ? reject(err) : resolve(docs)
      );
    });
  }
  async updateOne(params: any, newValue: any): Promise<any> {
    return await this.collection.updateOne(
      params,
      { $set: newValue }
    );
  }

  async insert(data: Object[]): Promise<any> {
    return await this.collection.insertMany(data);
  }

  createId() {
    return new mongodb.ObjectID();
  }
}