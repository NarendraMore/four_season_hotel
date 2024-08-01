import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import { saveAs } from 'file-saver';
export interface location {
  Location: string
}
export interface luggage {
  H_ID: number;
  Location: string;
  cam_ip: string;
  camera_region: number;
  cameraname: string;
  date: string;
  image_path: string;
  luggage_count: number;
  time: string;
  timestamp: string;
  _id: string;

}
@Component({
  selector: 'app-luggage-count',
  templateUrl: './luggage-count.component.html',
  styleUrls: ['./luggage-count.component.css']
})
export class LuggageCountComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  loationsArray: location[] = [];
  luggageArray: luggage[] = [];
  eventValue: any;
  visibleImage: boolean = false;
  imageSources: string[] = [];
  inTime!: string;
  outTime!: string;
  selectedOption!: string;
  constructor(private service: ServiceService) {

  }
  ngOnInit() {
    this.getLocatioByLuggage();
  }
  getLocatioByLuggage() {
    this.service.getLocationbyLuggage().subscribe((locations: any) => {
      this.loationsArray = locations.locations
      // console.log('locations', this.loationsArray);

    })
  }
  selectLocation(event: any) {
    this.eventValue = event.target.value;
    // console.log('this.eventValue', this.eventValue);

    this.service.getRegionByLocation(this.eventValue).subscribe((regionData: any) => {
      this.luggageArray = regionData;
      // console.log('regionData', this.luggageArray);
    });
  }


  luggageImage(region: any) {
    this.visibleImage = !this.visibleImage;

    this.service.getImageforRegion(region).subscribe((images: any) => {
      // console.log('images url', images.imageUrls);
      this.imageSources = images.imageUrls
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
  
    this.service.downloadLuggageData(inTimeFormatted, outTimeFormatted, this.selectedOption).subscribe(
      (response: Blob) => {
        // Handle successful response
        console.log('Response Data:', response);
  
        try {
          const newBlob = new Blob([response], { type: 'application/pdf' });
          saveAs(newBlob, 'Luggage Report.pdf');
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
 
}
