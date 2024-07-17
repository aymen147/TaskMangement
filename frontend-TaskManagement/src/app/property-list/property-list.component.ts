import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties = [
    {
      image: 'bg.jpg',
      title: 'Beautiful Family House',
      price: '$1,200,000',
      location: 'Los Angeles, CA'
    },
    {
      image: 'bg.jpg',
      title: 'Modern Apartment',
      price: '$850,000',
      location: 'New York, NY'
    },
    // Add more properties here
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
