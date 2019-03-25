import { Injectable } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import {ExcelData} from './excel-data';
@Injectable({
  providedIn: 'root'
})
export class SampleService {
  url = 'http://localhost:54480/api/values'; 
  constructor(private http: HttpClient) { }
  getExcelData(): Observable<ExcelData[]> {  
    return this.http.get<ExcelData[]>(this.url + '/GetValues');  
  }  
  createExcelData(excelData: ExcelData[]) {  
    console.log(excelData);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + '/InsertValues', excelData);  
  }  

}
