export enum EStatus {
    Completed = 'completed',
    Pending = 'pending'
}

export interface ITodo {
    task : string;
    deadLine : string;
    status : EStatus;
}