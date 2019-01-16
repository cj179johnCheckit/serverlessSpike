import { Collection } from 'typeorm';

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
}