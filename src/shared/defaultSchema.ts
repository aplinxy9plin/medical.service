import mongoose from "mongoose";

export const defaultSchema = [
  {
    title: 'Зрение',
    type: 'double',
    id: new mongoose.Types.ObjectId()
  },
  {
    title: 'COVID',
    type: 'boolean',
    id: new mongoose.Types.ObjectId()
  },
  {
    title: 'Кол-во посещений',
    type: 'int',
    id: new mongoose.Types.ObjectId()
  },
  {
    title: 'Рецепты на',
    type: 'string',
    id: new mongoose.Types.ObjectId()
  },
  {
    title: 'Дата последнего посещения',
    type: 'date',
    id: new mongoose.Types.ObjectId()
  },
]