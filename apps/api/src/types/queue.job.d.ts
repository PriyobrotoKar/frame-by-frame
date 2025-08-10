export enum QueueJobType {
  DELETE_FILE = 'DELETE_FILE',
}

export type SingleJob = {
  type: keyof typeof QueueJobType;
  body: Record<string, string>;
};

export type BatchJob = {
  type: keyof typeof QueueJobType;
  body: {
    id: string;
    payload: Record<string, string>;
  }[];
};
