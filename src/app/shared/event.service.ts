import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from '../models/event.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://platform-commons-api-7ee5639348b6.herokuapp.com/events';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get All Events
  getAllEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(this.apiUrl);
  }

  // Post Event (with createdBy)
  postEvent(event: any): Observable<Events> {
    return new Observable((observer) => {
      // Wait for the current user to be available
      this.authService.getCurrentUser().subscribe((user: any) => {
        if (user) {
          event.createdBy = user.uid; // Set the creator of the event
          // Make the API call to post the event
          this.http.post<Events>(this.apiUrl, event).subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.error('User is not authenticated');
        }
      });
    });
  }

  // Get single event
  getEvent(id: number): Observable<Events> {
    return this.http.get<Events>(`${this.apiUrl}/${id}`);
  }

  // Update event
  updateEvent(event: any, id: number): Observable<Events> {
    return this.http.put<Events>(`${this.apiUrl}/${id}`, event);
  }

  // Delete event
  deleteEvent(id: number): Observable<Events> {
    return this.http.delete<Events>(`${this.apiUrl}/${id}`);
  }
}
