import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../core/services/course.service';
import { Course } from '../core/models/course.model';
import { CourseCardComponent } from '../shared/components/course-card/course-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.filteredCourses = [];
    this.courseService.getCourses().subscribe((data: Course[]) => {
      console.log('Courses loaded:', data);

      this.courses = data;
      this.filteredCourses = data ?? [];
    });
  }

  viewCourse(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }
}
