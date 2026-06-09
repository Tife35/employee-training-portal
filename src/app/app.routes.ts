import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

    {
        path: 'courses',
        loadComponent: () => import('./courses/courses.component').then(m => m.CoursesComponent),
        canActivate: [authGuard]
    },

    {
        path: 'course/:id',
        loadComponent: () => import('./course/course.component').then(m => m.CourseComponent),
        canActivate: [authGuard]
    },

    {
        path: 'quiz/:id',
        loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent),
        canActivate: [authGuard]
    },

    { path: '**', redirectTo: 'login' }
];
