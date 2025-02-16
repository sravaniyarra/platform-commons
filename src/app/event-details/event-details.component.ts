import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  // opened = false;
  events: any[] = [];
  newEvent = { id: '', title: '', description: '', location: '' };
  isEditMode = false;
  indexselectedtoEdit: any;

  constructor(private event: EventService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.event.getAllEvents().subscribe(events => {
      this.events = events; // Update the event list
    });
  }

  openEventForm() {
    const dialogRef = this.dialog.open(EventFormComponent);

    // Refresh events when the dialog is closed
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvents();
    });
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
  
  viewDetails(event: any) {
    this.newEvent = { ...event };
  }

  onDelete(eventId: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.event.deleteEvent(eventId).subscribe(() => {
        alert('Event deleted successfully');
        this.loadEvents(); // Refresh the list after deletion
      });
    }
  }
}
