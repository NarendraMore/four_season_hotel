import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import { saveAs } from 'file-saver';
export interface personCount {
  H_ID: String;
  cam_ip: string;
  Location: String;
  cameraname: String;
  date: String;
  in_count: String;
  time: String;
  out_count: string;
  timestamp: string;
  status?: string;
}
@Component({
  selector: 'app-person-count',
  templateUrl: './person-count.component.html',
  styleUrls: ['./person-count.component.css']
})

export class PersonCountComponent {
  searchText: string = '';
  page: number = 1;
  CountArrayIn: any;
  CountArrayOut: any;
  currentDate: any
  totalItems: number = 0;
  first: any = 1;
  currentPage: any = 1;
  itemsPerPage: any = 5;
  PersoncountArray: personCount[] = [];
  inTime!: string;
  outTime!: string;
  selectedOption!: string;
  constructor(private service: ServiceService) { }
  ngOnInit() {
    this.getPersonAllData();
    this.getPersonCount();
    this.getPersonCount2();



  }
  private formatDate(date: string): string {
    const localDate = new Date(date); // Create a Date object from the local date string
  
    // Convert to UTC
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    return utcDate.toISOString(); // Format as ISO string with 'Z' for UTC
  }

  downloadData(form: NgForm) {
    const inTimeFormatted = this.formatDate(this.inTime);
    const outTimeFormatted = this.formatDate(this.outTime);
  
    console.log('In Time:', inTimeFormatted);
    console.log('Out Time:', outTimeFormatted);
    console.log('IP:', this.selectedOption);
  
    this.service.downloadPersonData(inTimeFormatted, outTimeFormatted, this.selectedOption).subscribe(
      (response: Blob) => {
        // Handle successful response
        console.log('Response Data:', response);
  
        try {
          const newBlob = new Blob([response], { type: 'application/pdf' });
          saveAs(newBlob, 'Person Report.pdf');
          console.log('File Downloaded');
        } catch (error) {
          console.error('Error creating or downloading file:', error);
        }
  
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        // Handle error response
        console.error('Full Error Response:', error);
  
        // If error contains file data
        if (error.error instanceof Blob) {
          const errorBlob = error.error;
          const fileName = 'ErrorReport.pdf'; // Adjust the filename as needed
  
          try {
            saveAs(errorBlob, fileName);
            console.log('Error file downloaded');
          } catch (err) {
            console.error('Error downloading file:', err);
          }
        } else {
          const errorMessage = error.error?.message || error.message;
          alert('Error downloading data: ' + errorMessage);
        }
      }
    );
    this.resetForm(form);
  }
  resetForm(form: NgForm) {
    form.reset();
  }
  getPersonAllData(): void {
    this.service.getPersonAllData(this.currentPage, this.itemsPerPage).subscribe((AllData: any) => {
      console.log('PersonallData', AllData);
      this.PersoncountArray = AllData.data;
      // this.options = AllData.data.cam_ip;
      // console.log('this.option', this.options);
      this.totalItems = AllData.totalItems

      this.proecessData(AllData);
    })
  }
  proecessData(allData: any): void {
    this.PersoncountArray = allData.data.map((item: any) => {
      if ('in_count' in item) {
        return { ...item, status: 'IN' };
      } else if ('out_count' in item) {
        return { ...item, status: 'OUT' };
      }
      else { return { ...item, status: 'UNKNOWN' }; }
    });
  }
  getPersonCount() {
    this.service.getPersonCount().subscribe((CountData: any) => {
      this.CountArrayIn = CountData.totalInCount
      this.currentDate = CountData.date

    })
  }
  getPersonCount2() {
    this.service.getPersonCount().subscribe((CountData: any) => {
      this.CountArrayOut = CountData.totalOutCount
      this.currentDate = CountData.date

    })
  }
  filteredData() {
    if (!this.searchText) {
      return this.PersoncountArray;
    }
    return this.PersoncountArray.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
}
