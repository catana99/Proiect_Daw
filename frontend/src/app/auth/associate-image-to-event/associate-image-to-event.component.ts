import { EventsService } from 'src/app/core/events.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ImagesService } from 'src/app/core/images.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'associate-image-to-event',
  templateUrl: './associate-image-to-event.component.html',
  styleUrls: ['./associate-image-to-event.component.css']
})
export class AssociateImageToEventComponent implements OnInit, AfterViewInit {
  public events: any[]; //un vector de evenimente cu Obiecte de tipul {label, value}
                        //label reprezinta numele evenimentului si value id-ul lui
  public selectedEventId: any; //id-ul evenimentului selectat din dropdown
  private files: any[];
  private static base64Encodings: any[]; //array cu codarile in base64 ale imaginilor
                                         //static pentru a fi accesat in FR.addEventListener("load", (e) => { ..})
                                         //se foloseste variabila ca AssociateImageToEventComponent.base64Encodings

//constructorul, in afara de injectare dependentelor, si ngOnInit se apeleaza la incarcarea componentei
  constructor(private eventsService: EventsService, private imagesService: ImagesService, private cdr: ChangeDetectorRef,
    private messageService: MessageService) {}

//pentru initializari si luat date de la server; specific Angular
  ngOnInit() {
    this.getEvents();
    AssociateImageToEventComponent.base64Encodings = [];
  }

  ngAfterViewInit() { //astept ca elementul cu id 'chooseFile' sa se incarce
    document.getElementById("chooseFile").addEventListener("change", this.readFiles);
  }

  get base64Encodings() {
    //functie pentru a pune variabila statica in base64Encodings si a o folosi in ngFor-ul din HTML
    return AssociateImageToEventComponent.base64Encodings;
  }

  //iau toate evenimentele din colectia Events
  private getEvents() {
    this.eventsService.getEvents().subscribe( events => {
        this.events = [];
        for (let event of events) {
          this.events.push({
            label: (<any>event.payload.doc.data()).name, //vizibil pentru utilizator in browser
            value: event.payload.doc.id, //trimis in spate catre server
            //proprietatea value va fi timisa catre selectedEventId cand e ales un eveniment din dropdown
          })
        }

        console.log('Evenimentele sunt ', this.events);
        this.cdr.detectChanges();
        //se actualizeaza dropdown-ul cand sunt schimbari in events
        //proprietatile le gasesc la event.payload.doc.data() --> event.payload.doc.data().name
        //id-ul e la event.payload.doc.id
      });
  }
//codul de mai jos transforma imaginile selectate in base64Encodings si le incarca
  private readFiles() {
    if (this.files && this.files[0]) { //daca avem fisiere alese
      AssociateImageToEventComponent.base64Encodings = [];

      for (let file of this.files) {
          var FR= new FileReader(); //creeaza un nou file reader pentru fiecare imagine
          FR.addEventListener("load", (e) => {
            let base64encoding =  (<any>e.target).result;   //in e.target.result am base64encoding

            AssociateImageToEventComponent.base64Encodings.push(base64encoding);
          });
          FR.readAsDataURL(file); //incarca fiecare fisier
      }
      console.warn('base64Encodings', AssociateImageToEventComponent.base64Encodings)
    }
  }

  private addImages() {//i numara imaginile si aici sunt adaugate in baza de date cu campul eventId si base64E
    for (let i=0; i< AssociateImageToEventComponent.base64Encodings.length; ++i) {
        let newImage = {
        eventId: this.selectedEventId,
        base64string: AssociateImageToEventComponent.base64Encodings[i]
      }
      //imaginea trimisa la serviciu care o trimite sa fie adaugata in Firebase
      this.imagesService.addImage(newImage);
      console.warn('newImage', newImage);
    }
    this.messageService.add({severity:'success', summary:'SUCCESS', detail:'Images have been added succesfully!'});
  }

}

