import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/events.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/core/categories.service';

@Component({
  selector: 'view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  public events: any[];
  public selectedEvent: any; //evenimentul selectat cand se da click oriunde pe o linie
  public selectedEventCopy: any; //copie a evenimentului selectat necesara pentru ca atunci cand se da edit a doua oara sa se revina la starea initiala a evenimentului,
  //fara modificarile facute initial
  public displayEditDialog: boolean; //in functie de displayEditDialog se afiseaza fereastra de update, la false e ascunsa, la true e vizibila
  public categories: any[];
  public categoriesTypes: any[] = [];

  constructor(private eventsService: EventsService, private confirmationService: ConfirmationService, private messageService: MessageService, private categoriesService:CategoriesService) { }
  //serviciile sunt injectate in constructor

  ngOnInit() {
    this.getEvents();
    this.getSummary();
    this.getCategories();
    this.displayEditDialog = false; //initial, se lasa fereastra de update ascunsa
  }

  //se iau toate evenimentele din collection Events
  private getEvents() {
    this.eventsService.getEvents().subscribe(
      res => {
        this.events = res;
        console.log('Evenimentele sunt ', this.events);
        //proprietatile se gasesc la event.payload.doc.data()
      });
  }
  private getCategories(){
    this.categoriesService.getCategories().subscribe(
      res => this.categoriesTypes = res);
  }
  private getSummary(){
    this.eventsService.getSummary().subscribe(
      res => {
        this.categories = res;
      });
  }

  //deschiderea fereastrei de update
  private displayUpdateEventDialog(event: any) {
    this.selectedEvent = event;
    this.displayEditDialog = true;
  }

  //inchiderea fereastrei de update
  private hideUpdateEventDialog() {
    this.displayEditDialog = false;
    //resetare evenimentul selectat initial ca sa nu ramana modificarile anterioare dupa ce s-a dat close
    this.selectedEvent = this.selectedEventCopy;
  }

  //updatarea evenimentului
  private updateEvent(selectedEvent) {
    let eventToUpdateData = {
      name: (document.getElementById('viewName') as HTMLInputElement).value,
      description: (document.getElementById('viewDescription') as HTMLTextAreaElement).value,
      date: (document.getElementById('viewDate') as HTMLInputElement).value,
      categories: selectedEvent.categories,
      id: (document.getElementById('viewId') as HTMLInputElement).value
    };
    //iau valorile din input-uri si le pun in eventToUpdate

    console.warn(eventToUpdateData);
    this.eventsService.updateEvent(this.selectedEvent.id, eventToUpdateData).subscribe(
      res => {
      if(res){
        this.messageService.add({severity:'success', summary:'SUCCESS', detail:'Event was succesfully updated!'});
        return res;
      }}
    );
    //pentru a face update e nevoie de id-ul evenimentului si de noile date schimbate


  }

  //stergere eveniment
  //in events.service.ts se sterg si imaginile asociate (deleteAllImagesOfAnEvent)
  private deleteEvent(event: any) {
    this.selectedEvent = event;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this event?',
      key: 'deleteEventDialog',
      accept: () => {
        this.eventsService.deleteEvent(event).subscribe(res => res);
        this.messageService.add({severity:'success', summary:'SUCCESS', detail:'Event was succesfully deleted!'});
      },
      reject: () => {
      }
    });
  }

  //cand dau click oriunde pe o linie, se doreste ca evenimentul sa fie selectat
  private onSelect(event: any) {
    console.log('selected event', event);
    this.selectedEvent = event;
  }

  public isChildLoaded(event){
    if(event == true){
      console.log("Child was loaded!\n");
    }
  }

}
