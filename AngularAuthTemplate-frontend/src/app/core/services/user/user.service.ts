import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../../interfaces/response';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL: string = environment.url
  constructor(private readonly http:HttpClient) { }

  public getUser(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${this.API_URL}/user`)
  }
}
