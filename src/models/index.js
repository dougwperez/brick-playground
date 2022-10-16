// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TaskCounter, Todo } = initSchema(schema);

export {
  TaskCounter,
  Todo
};