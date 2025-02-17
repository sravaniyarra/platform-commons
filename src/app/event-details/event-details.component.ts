import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  events: any[] = [];
  newEvent = { id: '', title: '', description: '', location: '' };
  currentUser: any;

  displayedColumns: string[] = ['id', 'title', 'details', 'edit', 'delete'];

  constructor(
    private event: EventService, 
    private router: Router, 
    private dialog: MatDialog, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user; // Ensure currentUser is set
      this.loadEvents(); // Load events after setting currentUser
    });
      // this.authService.getCurrentUser().subscribe(user => {
      //   this.currentUser = user; // Ensure currentUser is set before loading events
      //   console.log('Current User:', this.currentUser); // Debug log
    
      //   if (this.currentUser) {
      //     this.loadEvents(); // Load events AFTER setting currentUser
      //   }
      // });
    
    
  }

  loadEvents() {
    this.event.getAllEvents().subscribe(events => {
      console.log('Loaded events:', events); // Debug log
      this.events = events;
    });
  }

  openCreateEventForm() {
    const dialogRef = this.dialog.open(EventFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents(); // Reload events after creation
      }
    });
  }

  viewDetails(event: any) {
    this.newEvent = { ...event }; // Show selected event details
  }

  onEdit(event: any) {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      data: event // Pass event data for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents(); // Reload events after update
      }
    });
  }

  onDelete(eventId: number) {
    console.log('Deleting event with ID:', eventId); // Debug log
    if (confirm('Are you sure you want to delete this event?')) {
      this.event.deleteEvent(eventId).subscribe(() => {
        alert('Event deleted successfully');
        this.loadEvents(); // Refresh the list after deletion
      }, error => {
        console.error('Error deleting event:', error);
        alert('Error deleting event');
      });
    }
  }

  logout(){
      this.router.navigate(['/login'])
  }
}
