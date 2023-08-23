import { Injectable } from '@angular/core';


interface TaskData {
  title: string;
  completed: boolean;
  priority: number;
}
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  tasks: TaskData[] = [];
  completedTask: TaskData[] = [];

  addTask(title: string): void {
    const currLength: number = this.tasks.length;
    const task: TaskData = { title, completed: false, priority: currLength + 1 };
    this.tasks.push(task);
    this.renderTasks(this.tasks);
  }

  markTaskAsCompleted(index: number): void {
    if (this.tasks[index]) {
      this.tasks[index].completed = true;
      this.completedTask.push(this.tasks[index]);
      this.renderTasks(this.tasks);
    }
  }

  showCompleted(): void {
    this.renderCompletedTasks(this.completedTask);
  }

  removeTask(index: number): void {
    this.tasks = this.tasks.filter((task, ind) => ind !== index);
    this.renderTasks(this.tasks);
  }

  removeCompletedTask(index: number): void {
    this.completedTask = this.completedTask.filter((_, ind) => ind !== index);
    this.renderCompletedTasks(this.completedTask);
  }

  renderTasks(tasks : TaskData[]): void {
        const taskList = document.getElementById("taskList")!;
        taskList.innerHTML = "";

        tasks.forEach((task,index)=>{
            const listItem = document.createElement("tr");

            const td1 = document.createElement("td")
            td1.textContent = task.title?? "Untitled Task";
            td1.className = "p-2 border-solid border-2"
            const td2 = document.createElement("td")
            td2.textContent = task.completed ? "Completed" : "Not Completed";
            td2.className = "p-2 border-solid border-2"
            
            // const td3 = document.createElement("td")
            // td3.textContent = task.priority.toString();
            // td3.className = "p-2 border-solid border-2"
            
            const td4 = document.createElement("td")
            const markBtn = document.createElement("button")
            td4.className = "p-2 border-solid border-2"
            markBtn.textContent = "Mark as Complete"
            markBtn.addEventListener("click", () => this.markTaskAsCompleted(index));
            markBtn.className = 'rounded-md bg-green-400 px-4 py-1 hover:bg-green-500 hover:text-white'
            
            td4.append(markBtn)
            
            const td5 = document.createElement("td")
            td5.className = "p-2 border-solid border-2"
            const delBtn = document.createElement("button")
            delBtn.textContent = "Delete"
            delBtn.className = "rounded-md bg-red-400 px-4 py-1 hover:bg-red-500 hover:text-white"
            delBtn.addEventListener("click",() => {
                this.removeTask(index)
                this.renderTasks(this.tasks)
            })
            td5.append(delBtn)

            listItem.append(td1,td2,td4,td5)

            taskList.appendChild(listItem);
        })
    }
    renderCompletedTasks(tasks : TaskData[]): void {
        const taskList = document.getElementById("completedTaskList")!;
        taskList.innerHTML = "";

        tasks.forEach((task,index)=>{
            const listItem = document.createElement("tr");

            const td1 = document.createElement("td")
            td1.textContent = task.title?? "Untitled Task";
            td1.className = "p-2 border-solid border-2"
            const td2 = document.createElement("td")
            td2.textContent = task.completed ? "Completed" : "Not Completed";
            td2.className = "p-2 border-solid border-2"
            
            const td5 = document.createElement("td")
            td5.className = "p-2 border-solid border-2"
            const delBtn = document.createElement("button")
            delBtn.textContent = "Delete"
            delBtn.className = "rounded-md bg-red-400 px-4 py-1 hover:bg-red-500 hover:text-white"
            delBtn.addEventListener("click", () => {
                this.removeCompletedTask(index)
                this.renderCompletedTasks(this.completedTask)
            })

            td5.append(delBtn)

            listItem.append(td1,td2,td5)

            taskList.appendChild(listItem);
        })
    }
}
