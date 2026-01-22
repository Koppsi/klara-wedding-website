import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Rsvp {
  
  private googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyIbz9YFOV-D-RM4zTwAHdSxAt5DaRa_KHBn6MYxy_c1T6Kjiop-lWwsCMtjBwVy8Ar/exec';

  constructor(private http: HttpClient) {}

  sendRsvp(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain;charset=utf-8' });

    return this.http.post(this.googleScriptUrl, JSON.stringify(data), { headers });
  }
}
