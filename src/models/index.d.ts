import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type TaskCounterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TaskCounter {
  readonly id: string;
  readonly count?: number | null;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TaskCounter, TaskCounterMetaData>);
  static copyOf(source: TaskCounter, mutator: (draft: MutableModel<TaskCounter, TaskCounterMetaData>) => MutableModel<TaskCounter, TaskCounterMetaData> | void): TaskCounter;
}

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly isComplete?: boolean | null;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}