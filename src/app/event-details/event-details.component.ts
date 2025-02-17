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
  currentUser: any = {};  // Store current logged-in user details

  constructor(
    private event: EventService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.currentUser = this.authService.getCurrentUser();  // Get current user
  }

  loadEvents() {
    this.event.getAllEvents().subscribe(events => {
      this.events = events; // Update the event list
    });
  }

  openEventForm() {
    const dialogRef = this.dialog.open(EventFormComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadEvents();
    });
  }

  onEdit(event: any) {
    if (event.createdBy !== this.currentUser?.uid) {
      alert('You are not authorized to edit this event');
      return;
    }

    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents();
      }
    });
  }

  viewDetails(event: any) {
    this.newEvent = { ...event };
  }

  onDelete(eventId: number) {
    const event = this.events.find(e => e.id === eventId);
    if (event?.createdBy !== this.currentUser?.uid) {
      alert('You are not authorized to delete this event');
      return;
    }

    if (confirm('Are you sure you want to delete this event?')) {
      this.event.deleteEvent(eventId).subscribe(() => {
        alert('Event deleted successfully');
        this.loadEvents();
      });
    }
  }
}
