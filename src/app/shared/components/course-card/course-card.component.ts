import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Input() course: any;

  @Output() courseClick = new EventEmitter<number>();

  selectCourse() {
    this.courseClick.emit(this.course.id);
  }
}
