import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICredentials } from '../../interfaces/credentials';
import { IResponse } from '../../interfaces/response';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.url;
  constructor(private readonly http: HttpClient) {}

  public signIn(credentials: ICredentials): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.API_URL}/sign-in`, credentials);
  }

  public signUp(user: IUser): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.API_URL}/sign-up`, user);
  }

  public resetPassword(credentials: ICredentials): Observable<IResponse<IUser>> {
    return this.http.post<IResponse<IUser>>(`${this.API_URL}/reset-password`, credentials);
  }
}
