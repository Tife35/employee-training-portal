import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  constructor() {}

  getCompletedCourses(): number[] {
    const data = localStorage.getItem('completedCourses');
    return data ? JSON.parse(data) : [];

  }

  markCourseCompleted(courseId: number): void {
    const completed = this.getCompletedCourses();

  if (!completed.includes(courseId)) {
    completed.push(courseId);

    localStorage.setItem(
      'completedCourses',
      JSON.stringify(completed)
    );
  }
  }

  getCoursesInProgress(): number[] {
    const data = localStorage.getItem('coursesInProgress');
    return data ? JSON.parse(data) : [];
  }

  trackCourseInProgress(courseId: number): void {
    const courses = this.getCoursesInProgress();

    if (!courses.includes(courseId)) {
      courses.push(courseId);

      localStorage.setItem(
      'coursesInProgress',
      JSON.stringify(courses)
    );
    }
  }

  getAverageQuizScore(): number {

    const scores: number[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      
      const key = localStorage.key(i);

      if (key && key.startsWith('quiz_')) {
        const result = JSON.parse(localStorage.getItem(key)!);

        scores.push(result.percentage);
      }
    }

    if (scores.length === 0) {
      return 0;
    }

    const total = scores.reduce((sum, score) => sum + score, 0);

    return total / scores.length
;    

  }
}
