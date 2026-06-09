import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../core/services/progress.service';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user: any;

  searchText: string = '';

  completedCourses = 0;
  coursesInProgress = 0;
  averageQuizScore = 0;

  courses = [
    { title: 'Angular Fundamentals', description: 'Learn Angular Basics'},
    { title: 'TypeScript Basics', description: 'Learn TypeScript'},
    { title: 'Angular Routing', description: 'Learn Routing'}

  ];
  
  filteredCourses = [...this.courses];

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;

    this.loadDashboardData();
  }

  loadDashboardData() {
    const completed = this.progressService.getCompletedCourses();
    const inProgress = this.progressService.getCoursesInProgress();
    const average = this.progressService.getAverageQuizScore();

    this.completedCourses = completed.length;
    this.coursesInProgress = inProgress.length;
    this.averageQuizScore = average;
  }

  filterCourses() {
    const search = this.searchText.toLowerCase();

    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(search)
    );
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
