import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { environment } from 'src/environment/environment';
import { saveAs } from 'file-saver';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
export interface ANPRData {
  cameraname: string;
  classification: string;
  date: string;
  time: string;
  inflag: string;
  outflag: string;
  location: string;
  number: string;
  timestamp:string;
  status?: string;
  hotelId:string;
  _id:string;
  cam_ip:string
}
@Component({
  selector: 'app-vehicle-count',
  templateUrl: './vehicle-count.component.html',
  styleUrls: ['./vehicle-count.component.css']
})
export class VehicleCountComponent {
  searchText: string = '';
  page: number = 1;
  VehicleImage:boolean = false
  anprImageurl:any
  ANPRdataArray: ANPRData[] = [];
  currentvehicleInCount: any
  currentvwhicleOutCount: any
  currentPage: any = 1;
  itemsPerPage: any = 6;
  totalItems: number = 0;
  first: any = 1;
  inTime!: string;
  outTime!: string;
  selectedOption!: string;
  constructor(private service :ServiceService) { }
  ngOnInit() {
    this.getAllANPRData();
    this.getCurrentCount();
    this.getCurrentCount1();
  }
  getAllANPRData() {
    this.service.getAllANPRData(this.currentPage,this.itemsPerPage).subscribe((ANPRData: any) => {
      // console.log('ANPRData', ANPRData);
      this.ANPRdataArray = ANPRData.data;
      this.totalItems = ANPRData.totalItems
      this.proecessData(ANPRData)
    })
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
  
    this.service.downloadANPRData(inTimeFormatted, outTimeFormatted, this.selectedOption).subscribe(
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
  proecessData(allData: any): void {
    this.ANPRdataArray = allData.data.map((item: any) => {
      if ('inflag' in item) {
        return { ...item, status: 'IN' };
      } else if ('outflag' in item) {
        return { ...item, status: 'OUT' };
      }
      else { return { ...item, status: 'UNKNOWN' }; }
    });
  }
  getCurrentCount() {
    this.service.getcurrentCount().subscribe((currentCount: any) => {
      this.currentvehicleInCount = currentCount.totalInCount;
      // this.currentDate = currentCount.date
     })
  }
  getCurrentCount1() {
    this.service.getcurrentCount().subscribe((currentCount: any) => {
      this.currentvwhicleOutCount =currentCount.totalOutCount;
      // this.currentDate = currentCount.date
     })
  }
  filteredvehicleData() {
    if (!this.searchText) {
      return this.ANPRdataArray;
    }
    return this.ANPRdataArray.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
    
  }
  

  onClickANPRPhoto(id: any) {
    this.VehicleImage = true
    this.anprImageurl = `${environment.url}/anprImage/${id}`
    // console.log('image url',this.anprImageurl);
    
  }
  
}
