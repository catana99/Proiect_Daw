import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/events.service';
import { ImagesService } from 'src/app/core/images.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public events: any[]; //un vector de evenimente cu obiecte de tipul {label, value}
  //label reprezinta numele evenimentului si value id-ul lui
  public selectedEventId: any; //id-ul evenimentului selectat din dropdown
  private base64Encodings: any[]; //array cu codarile in base64 ale imaginilor
  private gotImagesStatus: boolean = false; //status pentru a vedea daca imaginile au fost cautate
  //necasar pentru a nu afisa mesajul cu There are no images for the selected event daca acestea nu au fost inca cautate

  constructor(private eventsService: EventsService, private imagesService: ImagesService) { }

  ngOnInit() {
    this.getEvents();
    this.getAllImages();
  }

   //se iau toate evenimentele din colectia Events
   private getEvents() {
    this.eventsService.getEvents().subscribe(
      events => {
        this.events = [{label:'All Events', value: 'All Events'}];
        for (let event of events) {
          this.events.push({
            label: (<any>event.payload.doc.data()).name,
            value: event.payload.doc.id,
            //proprietatea value va fi trimisa catre selectedEventId cand e ales un eveniment din dropdown
          })
        }

        //proprietatile le gasesc la event.payload.doc.data() --> event.payload.doc.data().name
        //id-ul e la event.payload.doc.id
      });
  }

  //se iau toate imaginile pentru toate evenimentele
  private getAllImages() {
    this.base64Encodings = [];
    this.imagesService.getImages().subscribe(
      images => {
        this.gotImagesStatus = true; //imaginile au fost cautate
        for (let image of images) {
          this.base64Encodings.push((<any>image.payload.doc.data()).base64string);
          //proprietatile le gasesc la image.payload.doc.data() --> image.payload.doc.data().base64string
        }
      }
    )
  }

  //se iau doar imaginile pentru unul dintre evenimente, se apeleaza cand schimb valoarea din dropdown
  private getAllImagesByEventId(selectedEventId) {
    if (selectedEventId === 'All Events')
      this.getAllImages(); //in cazul in care se aleg toate imaginile
    else {
      //in cazul in care se aleg doar imaginile pentru evenimentul selectat
      //se goleste intai array-ul base64Encodings
      this.base64Encodings = [];
      //Pentru a lua documentele din colectia filtrata dupa evenimentul selectat:
      this.imagesService.getImagesByEventId(selectedEventId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.base64Encodings.push(doc.data().base64string);
           //proprietatile le gasesc doc.data() --> doc.data().base64string
           //querySnapshot = rezultatul interogarii bazei de date, se iau si parcurg toate imaginile pentru un event id si se pun in vectorul de base64E
        });
      });

    }
  }

}

