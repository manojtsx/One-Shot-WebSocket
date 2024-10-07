import { Socket } from "socket.io";
import { getSocketIO } from "../../server";
import TodoModel from "./todoModel";

class Todo {
  private io = getSocketIO();
  constructor() {
    this.initializeSocket();
  }

  private async initializeSocket() {
    this.io = getSocketIO();
    (await this.io).on("connection", (socket) => {
      socket.on("addTodo", (data) => {
        this.handleAddTodo(socket, data);
      });
      socket.on("deleteTodo", (data) => {
        this.handleDeleteTodo(socket, data);
      });
      socket.on("updateTodo", (data) => {
        this.handleUpdateTodo(socket, data);
      });
    });
  }

  private async handleAddTodo(socket: Socket, data: any) {
    try {
      const { task, deadLine, status } = data;
      console.log(data);
      const newTodo = new TodoModel({ task, deadLine, status });
      await newTodo.save();
      const todos = await TodoModel.find();
      socket.emit("updated_todos", {
        status: "success",
        data: todos,
      });
    } catch (error) {
      socket.emit("updated_todos", {
        status: "error",
        error,
      });
    }
  }

  private async handleDeleteTodo(socket: Socket, data: { id: string }) {
    try {
      const { id } = data;
      const isDeleted = await TodoModel.deleteOne({ _id: id });
      if (!isDeleted) {
        throw new Error("Todo not found");
      }
      const todos = await TodoModel.find();
      socket.emit("updated_todos", {
        status: "success",
        data: todos,
      });
    } catch (error) {
      socket.emit("updated_todos", {
        status: "error",
        error,
      });
    }
  }

  private async handleUpdateTodo(
    socket: Socket,
    data: { id: string; status: string }
  ) {
    try {
      const { id, status } = data;
      const isUpdated = await TodoModel.updateOne({ _id: id }, { status });
      if (!isUpdated) {
        throw new Error("Todo not found");
      }
      const todos = await TodoModel.find();
      socket.emit("updated_todos", {
        status: "success",
        data: todos,
      });
    } catch (error) {
      socket.emit("updated_todos", {
        status: "error",
        error,
      });
    }
  }
}

export default new Todo();
