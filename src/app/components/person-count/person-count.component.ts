import { Component } from '@angular/core';

@Component({
  selector: 'app-person-count',
  templateUrl: './person-count.component.html',
  styleUrls: ['./person-count.component.css']
})
export class PersonCountComponent {
  searchText: string = '';
  page: number = 1;
  data = [
    { hotelId: 1, date: '2023-07-25', time: '12:00', location: 'New York', status: 'In' },
    { hotelId: 2, date: '2023-07-26', time: '14:00', location: 'Los Angeles', status: 'Out' },
    { hotelId: 3, date: '2023-07-27', time: '16:00', location: 'Chicago', status: 'In' },
    { hotelId: 3, date: '2023-07-27', time: '16:00', location: 'Chicago', status: 'Out' },
    { hotelId: 3, date: '2023-07-27', time: '16:00', location: 'Chicago', status: 'Out' },
    { hotelId: 3, date: '2023-07-27', time: '16:00', location: 'Chicago', status: 'In' },
    { hotelId: 3, date: '2023-07-27', time: '16:00', location: 'Chicago', status: 'In' },
    { hotelId: 3, date: '2023-07-27', time: '16:00', location: 'Chicago', status: 'Out' },
    { hotelId: 3, date: '2023-07-27', time: '16:00', location: 'Chicago', status: 'In' },

    // Add more data as needed
  ];
  constructor() { }
  ngOnInit() {
  }
  filteredData() {
    if (!this.searchText) {
      return this.data;
    }
    return this.data.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
}
