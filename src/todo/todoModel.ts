import { Schema, model } from "mongoose";
import { ITodo, EStatus } from "./todoTypes";

const todoSchema = new Schema<ITodo>({
    task: { type: String, required: true },
    deadLine: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(EStatus),
        default: EStatus.Pending
    }
});

const TodoModel = model<ITodo>('todos', todoSchema);
export default TodoModel;