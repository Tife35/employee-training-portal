import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

getQuizByCourseId(id: number): Observable<any> {
  return this.http.get<any>('/data/quizzes.json').pipe(
    map((quizzes: any[]) => {
      const courseQuiz = quizzes.find(q => Number(q.courseId) === Number(id)
    );
      return courseQuiz ? courseQuiz.questions : [];
    })
  );
}


}
