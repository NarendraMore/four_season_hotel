import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicle-count',
  templateUrl: './vehicle-count.component.html',
  styleUrls: ['./vehicle-count.component.css']
})
export class VehicleCountComponent {
  searchText: string = '';
  page: number = 1;
  data = [
    { hotelId: 1, date: '2023-07-25', time: '12:00', location: 'New York', status: 'In',number:'MH02FG6941',classification:'car',cameraname:'76-Honeywell'},
    { hotelId: 2, date: '2023-08-25', time: '13:00', location: 'New York', status: 'Out',number:'MH02FG6941',classification:'car',cameraname:'76-Honeywell'},
    { hotelId: 3, date: '2023-09-25', time: '14:00', location: 'New York', status: 'In',number:'MH02FG6941',classification:'car',cameraname:'76-Honeywell'},
    { hotelId: 4, date: '2023-10-25', time: '15:00', location: 'New York', status: 'Out',number:'MH02FG6941',classification:'car',cameraname:'76-Honeywell'},
    { hotelId: 5, date: '2023-11-25', time: '16:00', location: 'New York', status: 'Out',number:'MH02FG6941',classification:'car',cameraname:'76-Honeywell'},



    // Add more data as needed
  ];
  constructor() { }
  ngOnInit() {
  }
  filteredvehicleData() {
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
