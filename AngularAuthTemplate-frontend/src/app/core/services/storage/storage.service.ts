import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  public getItem(name: string): string | null {
    return localStorage.getItem(name);
  }

  public removeItem(name: string): void {
    localStorage.removeItem(name)
  }

  public setItem<T>(name: string, value: T): void {
    localStorage.setItem(
      name,
      typeof value !== 'string' ? JSON.stringify(value) : value
    );
  }

  public hasItem(name: string): string | null  {
    return localStorage.getItem(name)
  }
}
