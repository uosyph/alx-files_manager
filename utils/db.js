import { MongoClient, ObjectId } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    MongoClient.connect(DB_URI, { useUnifiedTopology: true }, (error, client) => {
      if (error) {
        console.log(error.message);
        this.db = false;
      } else {
        this.db = client.db(DB_DATABASE);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const userCount = this.users.countDocuments();
    return userCount;
  }

  async nbFiles() {
    const fileCount = this.files.countDocuments();
    return fileCount;
  }

  async userExists(email) {
    return this.users.findOne({ email });
  }

  async newUser(email, passwordHash) {
    return this.users.insertOne({ email, passwordHash });
  }

  async filterUser(filters) {
    // eslint-disable-next-line no-param-reassign
    if ('_id' in filters) filters._id = ObjectId(filters._id);
    return this.users.findOne(filters);
  }

  async filterFiles(filters) {
    const idFilters = ['_id', 'userId', 'parentId'].filter((prop) => prop in filters && filters[prop] !== '0');
    // eslint-disable-next-line no-param-reassign
    idFilters.forEach((i) => { filters[i] = ObjectId(filters[i]); });
    return this.files.findOne(filters);
  }
}

const dbClient = new DBClient();
export default dbClient;
