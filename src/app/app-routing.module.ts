import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomComponent } from './pages/admin/welcom/welcom.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [

  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path:'profile',
        component: ProfileComponent,
      },
      {
        path:'',
        component:WelcomComponent
      },
      {
        path:'categories',
        component:ViewCategoriesComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-questions/:id/:title',
        component:ViewQuizQuestionsComponent
      },
      {
        path:'add-question/:qid/:qtitle',
        component:AddQuestionComponent
      }
    ],
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[UserGuard],
    children: [
      {
        path:':catId',
        component:LoadQuizComponent
      },
      {
        path:'instructions/:qid',
        component:InstructionsComponent
      }
    ]
  },
  {
    path:'start/:qid',
    component:StartComponent,
    canActivate:[UserGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
