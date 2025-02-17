import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http : HttpClient) { }
  // private apiUrl = 'https://sravaniyarra.github.io/dbJson/db.json';
  // private apiUrl ='http://localhost:3000/events'
   private apiUrl = 'https://platform-commons-api-7ee5639348b6.herokuapp.com/events'
  
  //Get All Events
   getAllEvents(): Observable<Events[]>{
       return this.http.get<Events[]>(this.apiUrl);
   }


   
   // Post Event
   postEvent(id:any):Observable<Events>{
       return this.http.post<Events>(this.apiUrl,id)
   }

   //Get single event

   getEvent(id:number):Observable<Events>{
      return this.http.get<Events>(`${this.apiUrl}/${id}`)
   }

   //Update event

   updateEvent(event:any,id:number):Observable<Events>{
       return this.http.put<Events>(`${this.apiUrl}/${id}`,event)
   }
 // Delete event
 
  deleteEvent(id:number):Observable<Events>{
  return this.http.delete<Events>(`${this.apiUrl}/${id}`)
   }
}
