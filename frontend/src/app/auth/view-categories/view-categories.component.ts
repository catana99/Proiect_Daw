import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  @Input() categories: any[];
  @Output() isLoaded:  EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.isLoaded.emit(true);
  }

}
