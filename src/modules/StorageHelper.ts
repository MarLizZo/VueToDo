import { type ITask } from "@/interfaces/ITask";

export class StorageHelper {
    static readStorage(): ITask[] {
        if (localStorage.getItem("tasks")) {
            return JSON.parse(localStorage.getItem("tasks")!);
        }
        return [];
    }

    static saveToStorage(data: ITask[]): void {
        localStorage.setItem("tasks", JSON.stringify(data));
    }

    static getInProgressTasks(): ITask[] {
        return this.readStorage().filter((t) => t.in_progress);
    }

    static getCompletedTasks(): ITask[] {
        return this.readStorage().filter((t) => !t.in_progress);
    }
}
