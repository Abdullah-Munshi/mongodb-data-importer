const fs = require("fs");
const { MongoClient } = require("mongodb");

// Define a Class
class DataImporter {
  constructor(uri) {
    this.client = new MongoClient(uri);
  }

  async importData(dataSource, db, collection) {
    try {
      await this.client.connect();
      const data = JSON.parse(fs.readFileSync(dataSource));
      await this.client.db(db).collection(collection).insertMany(data);
    } finally {
      await this.client.close();
    }
  }
}

module.exports = DataImporter;
