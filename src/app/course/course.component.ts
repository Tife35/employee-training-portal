// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { CourseService } from '../core/services/course.service';

// @Component({
//   selector: 'app-course',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './course.component.html',
//   styleUrl: './course.component.css',
// })
// export class CourseComponent implements OnInit {
//   courseId!: number;
//   course: any;

//   constructor(private route: ActivatedRoute, private courseService: CourseService) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       const idParam = params.get('id');

//       console.log('Raw ID:', idParam);

//       const id = Number(idParam);

//       if (!idParam || isNaN(id)) {
//         console.error('Invalid course ID');
//         return;
//       }

//     this.courseService.getCourseById(id).subscribe(course => {
//       this.course = course;
//       console.log('Course loaded:', this.course);

//     });
      
//     });
  
//   }
//   markComplete(lesson: any) {
//     lesson.completed = true;
//   }

//   getProgress() {
//     if (!this.course || !this.course.lessons) return 0;

//     const completed =
//       this.course.lessons.filter(
//         (lesson: any) => lesson.completed
//       ).length;

//     return (completed / this.course.lessons.length) * 100;
//   }
// }


import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../core/services/course.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {

  courseId!: number;
  course = signal<any>(undefined);

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');

      const id = Number(idParam);

      if (!idParam || isNaN(id)) {
        console.error('Invalid course ID');
        return;
      }

      this.courseService.getCourseById(id).subscribe(course => {
        console.log('Course loaded:', course);
        this.course.set(course);
      });
    });
  }

  markComplete(lesson: any) {
    this.course.update(currentCourse => {
    if (currentCourse && currentCourse.lessons) {

      const target = currentCourse.lessons.find(
        (item: any) => item.title === lesson.title
      );

      if (target) {
        target.completed = true;
      }
    }

    return { ...currentCourse };
  });
}

  getProgress() {
    const currentCourse = this.course();
    if (!currentCourse?.lessons?.length) return 0;

    const completed = currentCourse.lessons.filter(
      (lesson: any) => lesson.completed
    ).length;

    return (completed / currentCourse.lessons.length) * 100;
  }
}