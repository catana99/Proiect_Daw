import { MessageService } from 'primeng/api';
import { OngEvent } from './../event.model';
import { Component } from '@angular/core';
import { EventsService } from 'src/app/core/events.service';

@Component({
  selector: 'event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  public eventModel : OngEvent; //aici tin datele evenimentului ce urmeaza sa fie adaugat
//declar variabila eventModel de tipul OngEvent
//serviciile de mai jos sunt cele injectate in constructor
  constructor(private eventsService: EventsService, private messageService: MessageService) {
    this.eventModel = new OngEvent(); //initializez un nou eveniment
    this.eventModel.name = '';
    this.eventModel.description = '';
    this.eventModel.date = new Date();
  }



  //se apeleaza cand se apasa pe butonul de Add Event
  private onSubmit() {
    console.log('submited event', this.eventModel);
    let eventToSend = { //functia CollectionReference.add() are nevoie ca primul argument sa fie de tipul object
      name: this.eventModel.name,
      description: this.eventModel.description,
      date: this.eventModel.date
    };

    //trebuie trimis la serviciu un obiect de tip Object (eventToSend), nu de tip OngEvent (eventModel)

    this.eventsService.addEvent(eventToSend); //obiectul eventToSend e trimis la server

    this.messageService.add({severity:'success', summary:'SUCCESS', detail:'Event was succesfully added!'});

    //reinitializeaza toate campurile formularului pentru a se putea introduce unul nou
    this.eventModel.name = '';
    this.eventModel.description = '';
    this.eventModel.date = new Date();
  }

}


