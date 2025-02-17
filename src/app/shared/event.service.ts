import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Events } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http : HttpClient) { }
  private eventsSubject = new BehaviorSubject<Events[]>([]);  // Holds events list
  events$ = this.eventsSubject.asObservable();  
  // private apiUrl = 'https://sravaniyarra.github.io/dbJson/db.json';
  private apiUrl ='http://localhost:3000/events'
  
  //Get All Events
  //  getAllEvents(): Observable<Events[]>{
  //      return this.http.get<Events[]>(this.apiUrl);
  //  }

  getAllEvents(){
    this.http.get<Events[]>(this.apiUrl).subscribe(
      (events) => {
        this.eventsSubject.next(events);  // Update the BehaviorSubject with the new event list
      },
      (error) => {
        console.error(error);
      }
    );
  }
 

  postEvent(newEvent: Events){
    this.http.post<Events>(this.apiUrl, newEvent).subscribe(
      (event) => {
        const updatedEvents = [...this.eventsSubject.value, event];
        this.eventsSubject.next(updatedEvents);  // Update the event list
      },
      (error) => {
        console.error(error);
      }
    );
  }
 
   // Post Event
  //  postEvent(id:any):Observable<Events>{
  //      return this.http.post<Events>(this.apiUrl,id)
  //  }

   //Get single event

   getEvent(id:number):Observable<Events>{
      return this.http.get<Events>(`${this.apiUrl}/${id}`)
   }

   //Update event

  //  updateEvent(event:any,id:number):Observable<Events>{
  //      return this.http.put<Events>(`${this.apiUrl}/${id}`,event)
  //  }

  updateEvent(updatedEvent: Events) {
    this.http.put<Event>(`${this.apiUrl}/${updatedEvent.id}`, updatedEvent).subscribe(
      () => {
        const updatedEvents = this.eventsSubject.value.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        this.eventsSubject.next(updatedEvents);  // Update the event list
      },
      (error) => {
        console.error(error);
      }
    );
  }
 // Delete event
 
  // deleteEvent(id:number):Observable<Events>{
  // return this.http.delete<Events>(`${this.apiUrl}/${id}`)
  //  }

  deleteEvent(eventId: number) {
    this.http.delete(`${this.apiUrl}/${eventId}`).subscribe(
      () => {
        const updatedEvents = this.eventsSubject.value.filter((event) => event.id !== eventId);
        this.eventsSubject.next(updatedEvents);  // Remove the deleted event
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
