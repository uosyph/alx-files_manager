import DBClient from './utils/db';

const fs = require('fs');
const Bull = require('bull');
const { ObjectId } = require('mongodb');
const imageThumbnail = require('image-thumbnail');

const fileQueue = new Bull('fileQueue');
const userQueue = new Bull('userQueue');

const createImageThumbnail = async (path, options) => {
  try {
    const thumbnail = await imageThumbnail(path, options);
    const imagePath = `${path}_${options.width}`;

    await fs.writeFileSync(imagePath, thumbnail);
  } catch (error) {
    console.log(error);
  }
};

fileQueue.process(async (job) => {
  const { fileId } = job.data;
  if (!fileId) throw Error('Missing fileId');

  const { userId } = job.data;
  if (!userId) throw Error('Missing userId');

  const file = await DBClient.files.findOne({ _id: ObjectId(fileId), userId: ObjectId(userId) });
  if (!file) throw Error('File not found');

  createImageThumbnail(file.localPath, { width: 500 });
  createImageThumbnail(file.localPath, { width: 250 });
  createImageThumbnail(file.localPath, { width: 100 });
});

userQueue.process(async (job) => {
  const { userId } = job.data;
  if (!userId) throw Error('Missing userId');

  const user = await DBClient.users.findOne({ _id: ObjectId(userId) });
  if (!user) throw Error('User not found');

  console.log(`Welcome ${user.email}`);
});
