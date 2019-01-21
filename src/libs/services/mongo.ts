import { Collection, Db } from 'typeorm';
import { ObjectID } from 'typeorm';

const mongodb = require('mongodb');

export class MongoService {
  private db: Db;

  constructor(dbConnection: any) {
    this.db = dbConnection.db();
  }

  async findOne(collectionName: string, params: any): Promise<any> {
    const results = await this.find(collectionName, params);
    return results.length > 0 ? results.shift() : null;
  }

  find(collectionName: string, params: any): Promise<any> {
    const collection: Collection = this.db.collection(collectionName);

    return new Promise((resolve, reject) => {
      collection.find(params).toArray((err: Error, docs: any) =>
        err ? reject(err) : resolve(docs)
      );
    });
  }
  async updateOne(collectionName: string, params: any, newValue: any): Promise<any> {
    const collection: Collection = this.db.collection(collectionName);

    return await collection.updateOne(
      params,
      { $set: newValue }
    );
  }

  async insert(collectionName: string, data: Object[]): Promise<any> {
    const collection: Collection = this.db.collection(collectionName);
    return await collection.insertMany(data);
  }

  createId(): ObjectID {
    return new mongodb.ObjectID();
  }
}