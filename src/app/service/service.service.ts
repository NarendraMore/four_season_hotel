import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http :HttpClient) { }

  getPersonAllData(page:any,limit:any){
    return this.http.get(`${environment.url}/allData?page=${page}&limit=${limit}`)
  }
  getPersonCount(){
    return this.http.get(`${environment.url}/totals/current`)
  }
  getLuggageallData(){
    return this.http.get(`${environment.url}/allLuggageData`)
  }
  getcameraRegion(){
    return this.http.get(`${environment.url}/Luggage_camera_region`)
  }
  getAllANPRData(page:any,limit:any){
    return this.http.get(`${environment.url}/allANPRData?page=${page}&limit=${limit}`)
  }
  getcurrentCount(){
    return this.http.get(`${environment.url}/ANPRCount`)
  }

  getLocationbyLuggage(){
    return this.http.get(`${environment.url}/api/Luggage_locations`)
  }
  getRegionByLocation(location:any){
    return this.http.get(`${environment.url}/luggage/${location}`)
  }

  getImageforRegion(region:any){
    return this.http.get(`${environment.url}/imageArray/${region}`)
  }
  getLuggeageCount(){
    return this.http.get(`${environment.url}/luggage-count`)
  }

  downloadPersonData(inTime: string, outTime: string, selectedOption: string){
    const params = new HttpParams()
    .set('intimestamp', inTime)
    .set('outtimestamp', outTime)
    .set('cam_ip', selectedOption);

  return this.http.get('http://192.168.1.12:4000/person-pdf', { params, responseType: 'blob' });
  }
  downloadLuggageData(inTime: string, outTime: string, selectedOption: string) {
    const params = new HttpParams()
      .set('intimestamp', inTime)
      .set('outtimestamp', outTime)
      .set('cam_ip', selectedOption);

    return this.http.get('http://192.168.1.12:4000/luggage-pdf', { params, responseType: 'blob' });
  }
  downloadANPRData(inTime: string, outTime: string, selectedOption: string) {
    const params = new HttpParams()
      .set('intimestamp', inTime)
      .set('outtimestamp', outTime)
      .set('cam_ip', selectedOption);

    return this.http.get('http://192.168.1.12:4000/ANPR-pdf', { params, responseType: 'blob' });
  }
  
}
