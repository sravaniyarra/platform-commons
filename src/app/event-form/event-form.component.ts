import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../shared/event.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {Events} from '../models/event.model' 

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  });
  // eventobj: Events = new Events;
  events: any[] = [];
  isEditMode = false;
  eventId: number | null = null;

  constructor(
    private event: EventService,
    private dialogRef: MatDialogRef<EventFormComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isEditMode = true;
      this.eventId = this.data.id;
      this.eventForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      if (this.isEditMode && this.eventId !== null) {
        // Update existing event
        this.event.updateEvent(this.eventForm.value, this.eventId).subscribe(() => {
          alert('Event updated successfully');
          this.dialogRef.close(true); // Pass "true" to indicate success
        });
      } else {
        // Create new event
        this.event.postEvent(this.eventForm.value).subscribe(() => {
          alert('Event created successfully');
          this.dialogRef.close(true);
        });
      }
    }
  }

  // onEdit(event: any) {
  //   this.isEditMode = true;
  //   const dialogRef = this.dialog.open(EventFormComponent, {
  //     width: '400px',
  //     data: event // Pass event data for editing
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.loadEvents();
  //   });
  // }

  loadEvents() {
    this.event.getAllEvents().subscribe(events => {
      this.events = events; // Update the event list
    });
  }

  closeForm() {
    this.dialogRef.close();
  }


}
