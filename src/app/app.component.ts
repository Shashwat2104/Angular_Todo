import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const addTaskButton = document.getElementById("addTaskButton") as HTMLButtonElement;
    const taskTitleInput = document.getElementById("taskTitle") as HTMLInputElement;
    const firstContainer = document.getElementById("firstContainer");
    const secondContainer = document.getElementById("secondContainer");
    const allTaskBtn = document.getElementById("allTaskBtn");
    const completedTaskBtn = document.getElementById("completedTaskBtn");

    if (addTaskButton && taskTitleInput && firstContainer && secondContainer && allTaskBtn && completedTaskBtn) {
      addTaskButton.addEventListener("click", () => {
        const title = taskTitleInput.value.trim();
        if (title) {
          this.taskService.addTask(title);
          taskTitleInput.value = "";
        }
      });

      allTaskBtn.addEventListener('click', () => {
        firstContainer.classList.remove("disable");
        secondContainer.classList.add("disable");
        this.taskService.renderTasks(this.taskService.tasks);
      });

      completedTaskBtn.addEventListener('click', () => {
        firstContainer.classList.add("disable");
        secondContainer.classList.remove("disable");
        this.taskService.renderCompletedTasks(this.taskService.completedTask);
      });
    }
  }
}
