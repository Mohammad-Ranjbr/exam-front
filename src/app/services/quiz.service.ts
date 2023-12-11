import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public quizzes(){
    return this._http.get(`${baseUrl}/api/quiz/`);
  }

  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/api/quiz/`,quiz);
  }

  public deleteQuiz(quizId:any){
    return this._http.delete(`${baseUrl}/api/quiz/${quizId}`);
  }

  public getQuiz(quizId:any){
    return this._http.get(`${baseUrl}/api/quiz/${quizId}`);
  }

  public updateQuiz(quizId:any,quiz:any){
    return this._http.put(`${baseUrl}/api/quiz/${quizId}`,quiz);
  }

  public getQuizzesOfCategory(categoryId:any){
    return this._http.get(`${baseUrl}/api/quiz/category/${categoryId}`);
  }

  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/api/quiz/active`);
  }

  public getActiveQuizzesOfCaategory(categoryId:any){
    return this._http.get(`${baseUrl}/api/quiz/active/category/${categoryId}`);
  }

}
