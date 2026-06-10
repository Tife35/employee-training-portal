import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../core/services/quiz.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {

  score = signal(0);
  percentage = signal(0);
  questions = signal<any[]>([]);
  quizCompleted = signal(false);
  currentQuestionIndex = signal(0);

  savedResult: any;

  retryQuiz() {
    this.quizForm.reset();
    this.score.set(0);
    this.currentQuestionIndex.set(0);
    this.quizCompleted.set(false);
    this.percentage.set(0);
  }

  quizForm!: FormGroup;

  courseId!: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private quizService: QuizService) {}
  

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    const data = localStorage.getItem(`quiz_${this.courseId}_score`);
    if (data) {
      this.savedResult = JSON.parse(data);
    }
    this.quizService.getQuizByCourseId(this.courseId).subscribe((data: any) => {
      console.log("RAW QUIZ DATA:", data);
      
      const qs = data ?? [];
      this.questions.set(qs);
      this.currentQuestionIndex.set(0);

        this.initForm();
    });
  }

  initForm() {
    this.quizForm = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  get currentQuestion() {
    return this.questions()?.[this.currentQuestionIndex()] ?? null;
  }

  submitQuiz() {
    if (this.quizForm.invalid || !this.currentQuestion) {
      this.quizForm.markAllAsTouched();
      return;
    }

    const selectedAnswer = this.quizForm.value.answer;
    const correctAnswer = this.currentQuestion.answer;

    if (selectedAnswer === correctAnswer) {
      this.score.update(s => s + 1);
    }

    this.nextQuestion();
  }

  // Move to next question
  nextQuestion() {
    this.quizForm.reset();
     const index = this.currentQuestionIndex();
     const total = this.questions().length;

     if (index < total - 1) {
      this.currentQuestionIndex.set(index + 1);
     } else {
      const finalScore = this.score();
      const percent = total > 0 ? (finalScore / total) * 100 : 0;

      this.percentage.set(percent);
      this.quizCompleted.set(true);
     

      localStorage.setItem(
        `quiz_${this.courseId}_score`,
        JSON.stringify({
          score: finalScore,
          total,
          percentage: percent
        })
      );
    }
  }
}



  