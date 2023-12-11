import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(quizId:any){
    return this._http.get(`${baseUrl}/api/questions/quiz/all/${quizId}`);
  }

  public getQuestionOfQuizForTest(quizId:any){
    return this._http.get(`${baseUrl}/api/questions/quiz/${quizId}`);
  }

  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/api/questions/`,question);
  }

  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/api/questions/${questionId}`,questionId);
  }

  public evaluatingQuiz(questions:any){
    return this._http.post(`${baseUrl}/api/questions/eval-quiz`,questions);
  }

}
