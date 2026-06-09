// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Course } from '../models/course.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class CourseService {
//   constructor(private http: HttpClient) {}

//   getCourses(): Observable<Course[]> {
//     return this.http.get<Course[]>('/data/courses.json');
//   }

//   getCourseById(id: number): Observable<Course | undefined> {

//       return this.getCourses().pipe(
//         map(courses => {
//           console.log('All courses:', courses);
//           console.log('Searching for ID:', id);

//           return courses.find(course => Number(course.id) === Number(id));
//         })
//       );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>('/data/courses.json');
  }

  getCourseById(id: number): Observable<any> {
    return this.getCourses().pipe(
      map(courses => {
        console.log('RAW COURSES:', courses);
        console.log('SEARCH ID:', id);

        const found = courses?.find(c => Number(c.id) === Number(id));

        console.log('FOUND COURSE:', found);

        return found || null;

        
      })
    );
  }
}