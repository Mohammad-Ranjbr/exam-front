import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authenticationRequest = req;
        // add the jwt token (localStorage) request
        const token = this.loginService.getToken();
        if(token != null){
            authenticationRequest = authenticationRequest.clone({setHeaders: {Authorization:`ExamPortal ${token}`}});
        }
        return next.handle(authenticationRequest);
    }

}

export const authInceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
    }
]