import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../../data.json')
const adapter = new JSONFile(file)

const db = new Low(adapter)

export const add = async (req, res) => {
  const {title, content} = req.body;
  console.log("req:", title, content);
  await db.read()
  const lastId = db.data.bookList[db.data.bookList.length - 1].id;
  db.data.bookList.push({
    id: lastId + 1,
    title,
    content
  })
  await db.write();
  res.send({message: "returned"});
};


export const getAll = async (req, res) => {
  await db.read()
  res.send({bookList: db.data.bookList});
};


export const remove = async (req, res) => {
  const {id} = req.body;
  console.log("deleteing", id);
  await db.read()
  _.remove(db.data.bookList, {
    id: id
  });
  // db.data.bookList = newBookList;
  await db.write();

  res.send({message: "returned"});
};