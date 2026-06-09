import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../core/services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {

  score: number = 0;

  percentage: number = 0;

  savedResult: any;

  quizCompleted = false;

  retryQuiz() {
    this.quizForm.reset();
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.quizCompleted = false;
    this.percentage = 0;
  }

  quizForm!: FormGroup;

  courseId!: number;
  questions: any[] = [];
  currentQuestionIndex = 0;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private quizService: QuizService) {}
  

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    const data = localStorage.getItem(`quiz_${this.courseId}_score`);
    if (data) {
      this.savedResult = JSON.parse(data);
    }
    this.quizService.getQuizByCourseId(this.courseId).subscribe(data => {
      console.log("RAW QUIZ DATA:", data);
      
      this.questions = Array.isArray(data) ? data : (data?.questions ?? []);
       this.currentQuestionIndex = 0;
      
      if (this.questions.length > 0) {
        this.initForm();
      } else {
        console.error("No questions found");
      }
    });
  }

  initForm() {
    this.quizForm = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  submitQuiz() {
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched();
      return;
    }

    const selectedAnswer = this.quizForm.value.answer;
    const correctAnswer = this.currentQuestion.answer;

    if (selectedAnswer === correctAnswer) {
      this.score++;
    }

    this.nextQuestion();
  }

  // Move to next question
  nextQuestion() {
    this.quizForm.reset();

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.percentage = (this.score / this.questions.length) * 100;
      this.quizCompleted = true;

      localStorage.setItem(
        `quiz_${this.courseId}_score`,
        JSON.stringify({
          score: this.score,
          total: this.questions.length,
          percentage: this.percentage
        })
      );
      console.log('Quiz completed!');
      console.log('Final Score:', this.score, '/', this.questions.length);
    }
  }
}



  