import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [FormsModule, CommonModule],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  newTitle = '';
  newDescription = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => (this.tasks = data));
  }

  addTask() {
    if (!this.newTitle.trim()) return;
    this.taskService
      .createTask({ title: this.newTitle, description: this.newDescription })
      .subscribe(() => {
        this.newTitle = '';
        this.newDescription = '';
        this.loadTasks();
      });
  }

  toggle(task: any) {
    this.taskService.toggleComplete(task._id).subscribe(() => this.loadTasks());
  }

  delete(task: any) {
    this.taskService.deleteTask(task._id).subscribe(() => this.loadTasks());
  }
}
