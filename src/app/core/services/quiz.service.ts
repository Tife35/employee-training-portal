import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

getQuizByCourseId(id: number): Observable<any[]> {
  return this.http.get<any[]>('/data/quizzes.json').pipe(
    map((quizzes: any[]) => {
      if (!Array.isArray(quizzes)) {
          console.error('Quiz JSON is not an array:', quizzes);
          return [];
        }


      const courseQuiz = quizzes.find(q => Number(q.courseId) === Number(id)
    );

    if (!courseQuiz) {
          console.warn('No quiz found for courseId:', id);
          return [];
        }


      return courseQuiz.questions || [];
    })
  );
}


}
