import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../core/services/course.service';
import { Course } from '../core/models/course.model';
import { CourseCardComponent } from '../shared/components/course-card/course-card.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses = signal<Course[]>([]);
  filteredCourses = signal<Course[]>([]);

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses.set(data);
      this.filteredCourses.set(data ?? []);
    });
  }

  viewCourse(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }
}
