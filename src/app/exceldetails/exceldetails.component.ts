import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {ExcelData} from '../excel-data';
import {SampleService} from '../sample.service';
import { Observable } from 'rxjs';  
type AOA = any[][];
@Component({
  selector: 'app-exceldetails',
  templateUrl: './exceldetails.component.html',
  styleUrls: ['./exceldetails.component.less']
})
export class ExceldetailsComponent implements OnInit {

	data: AOA = [ [1, 2], [3, 4] ];
	dataList:AOA = [];
	barChartData =[];
	barChartLabels=[];
  dbData:ExcelData[] = [];
  allExcelData:ExcelData[] = []; 
  barChartType = 'bar';
  barChartLegend = true;
	constructor(private sampleService:SampleService){
		this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
		this.barChartData = [
			{data: [], label: 'Series A'},
			{data: [], label: 'Series B'}
		];
  }
  ngOnInit(){}
	public barChartOptions = {
    scaleShowVerticalLines: false,
		responsive: true,
		scales : {
			yAxes: [{
					ticks: {
					beginAtZero: true,
							steps: 40
					}
			}]
		}
  };



  onFileChange(evt: any) {
    /* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
			this.dataList = this.data;
			let values1 = [];
			let values2 = [];
			let years = [];
			for(let i = 1; i< this.dataList.length;i++){
			//	for (let j = 0; j < this.dataList[i].length; j++) {
					const element = this.dataList[i];
					values1.push(element[2]);
					values2.push(element[2]);
					years.push(element[3].toString());
					this.dbData.push({id:element[0], name: element[1], amount: element[2], year: element[3]});
			//	}
			}
	// this.barChartData = [];
	// 		this.barChartData.push({data:values1, label:'Data 1'});
	// 		this.barChartData.push({data:values2, label:'Data 2'})
	// 		this.barChartLabels = years;
		};
    console.log(this.dbData);
    this.sampleService.createExcelData(this.dbData).subscribe((res)=>{
      console.log(res);
    });
    this.sampleService.getExcelData().subscribe((res)=>{
     console.log(res);
     let value = res.map((x)=> x.amount);
     let value1 = res.map((x)=> x.amount);
     let value2 = res.map((x)=> x.year);
     this.barChartData = [];
     this.barChartData.push({data:value, label:'Data 1'});
     this.barChartData.push({data:value1, label:'Data 2'})
     this.barChartLabels = value2;
});
   
    reader.readAsBinaryString(target.files[0]);
	}
}
