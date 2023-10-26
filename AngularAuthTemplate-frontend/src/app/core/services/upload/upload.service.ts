import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../../interfaces/response';
import { IFile } from '../../interfaces/file';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private API_URL: string = environment.url;

  constructor(private readonly http: HttpClient) { }

  public upload(file: FormData): Observable<IResponse<IFile>> {
    return this.http.post<IResponse<IFile>>(`${this.API_URL}/upload`, file);
  }
}
