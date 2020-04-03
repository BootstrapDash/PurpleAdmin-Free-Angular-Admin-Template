import {AfterViewInit, Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { DatasService } from "./../../services/datas.service";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import * as L from 'leaflet';

export type Item = { name: string, values:any };

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements  OnInit {



  ////dropDown list for contry
  form = new FormGroup({
    contry: new FormControl('', Validators.required)
  });
  get f(){
   return this.form.controls;
  }
  submit(){
  console.log(this.form.value);
  }
  changeContry(e) {
  console.log(e.target.value);
  if (e.target.value=="World Wide"){
    this.selected=e.target.value;
    this.setWorldDataLabelForCharts(this.items);
  }else{
  this.selected=e.target.value;
  this.setContryDataLabelForCharts(this.selected);
}
  }
  //////////////


  items: Array<Item>;
  error: string;
  selected : string="World Wide";
  contries =[];
  confirmed = [];
  deaths = [];
  recovered =[];

  lineChartData = [];
  lineChartLabels = [];
  barChartData =[];
  barChartLabels =[];
  doughnutPieChartData =[];
  areaChartData = [];
  areaChartLabels = [];
  mapdata:any;
  constructor(private http : Http, private firstService : DatasService) { }
  interval: any;
  mySub : any;
  t: Array<any>;
///////////////////////////////////////

  ngOnInit() {



  /*  const myMap = L.map('map').setView([33.25492, -8.50602], 3);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              maxZoom: 18,

      }).addTo(myMap);

*/


this.setmapdata();
///////////////
  this.refreshData();
  this.interval = setInterval(() => {
  this.refreshData();
}, 100000);
}
///////
setmapdata(){
  let mymap = L.map('map').setView([0, 0], 1);
  this.firstService.mapdata().subscribe(
    data => { this.t = data ;
              console.log("t",this.t);
      //let mymap = L.map('map').setView([0, 0], 1);
      let datatabl =this.t;

      datatabl.forEach((e) => {
          //console.log('e',e);
          //let pop='<div><p> '+e.countryregion+'</p><p> Confirmed Cases: '+e.confirmed+'</p><p>Deaths: '+e.deaths' </p><p> Recovered:'+  e.recovered+'</p></div>';
          if(!isNaN(e.confirmed)){
          L.circle([e.location.lat, e.location.lng],{
            color: '#F85C50',
            fillColor: '#F85C50',
            fillOpacity: 0.4,
            radius: e.confirmed*5
          }).addTo(mymap).bindPopup(' Contry: '+e.countryregion+' confirmed: '+e.confirmed+' deaths : '+e.deaths);
        }
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
          accessToken: 'pk.eyJ1Ijoibm91aGFpbGE3NSIsImEiOiJjazhnN2JpNHIwNDN2M25vNmlrbTRodnFoIn0.dBGGfkYJbAHubAodluyJNg'
  }).addTo(mymap);
      });

}
onAdressSubmit(form) {
    console.log(form.value.adress);
  }
////////////////////////////
refreshData(){
 this.firstService.getAllItems().subscribe(
   data => {
     this.items = data;
     //console.log(this.items);
     if (this.selected=="World Wide"){
       this.setWorldDataLabelForCharts(this.items);
     }else{
     this.setContryDataLabelForCharts(this.selected);
   }
     },
   error =>
   this.error = error.statusText);
}
setContryDataLabelForCharts(contry){
  let datatable =Object.values(this.items[contry]);
  let labels =[];
  let death =[];
  let confirm = [];
  let recov =[];

  datatable.forEach(element => {
    element.date;
    labels.push(element.date);
    confirm.push(element.confirmed);

    death.push(element.deaths);

    recov.push(element.recovered);

     });

  this.lineChartLabels = this.barChartLabels= this.areaChartLabels = labels;
  this.lineChartData = this.barChartData=this.areaChartData=[{
    label: 'cases',
    data: confirm,
    borderColor: '#F85C50',
    borderWidth: 1,
    fill: false
  },{
  label: 'deaths',
  data: death,
  borderColor: '#231F20',
  borderWidth: 1,
  fill: false
},{
label: 'recovered',
data: recov,
borderColor: '#A7E541',
borderWidth: 1,
fill: false
}];
this.doughnutPieChartData = [
  {
    data: [death[death.length-1], recov[recov.length-1], confirm[confirm.length-1]],
  }
];

}
setWorldDataLabelForCharts(items){
  this.contries = Object.keys(items);
  let datatable = Object.values(items);
  this.confirmed=[];
  this.deaths=[];
  this.recovered=[];
    //console.log('table',datatable);
   datatable.forEach(element => {
     let elem = Object.values(element);
     let e=(elem[elem.length-1]);
   this.deaths.push(e.deaths);
   this.confirmed.push(e.confirmed);
   this.recovered.push(e.recovered);
   });
   let dondatadeath =0;
   let dondatarecover =0;
   let dondataconfirmed=0;
   this.deaths.forEach(element => {
     dondatadeath+=element;
   });
   this.recovered.forEach(element => {
     dondatarecover+=element;
   });
   this.confirmed.forEach(element => {
     dondataconfirmed+=element;
   });
   this.lineChartLabels = this.barChartLabels= this.areaChartLabels = Object.keys(this.items);
   this.lineChartData = this.barChartData=this.areaChartData=[{
     label: 'cases',
     data: this.confirmed,
     borderColor: '#F85C50',
     borderWidth: 1,
     fill: false
   },{
   label: 'deaths',
   data: this.deaths,
   borderColor: '#231F20',
   borderWidth: 1,
   fill: false
 },{
 label: 'recovered',
 data: this.recovered,
 borderColor:'#8EAF0C',
 borderWidth: 1,
 fill: false
 }];
 this.doughnutPieChartData = [
   {
     data: [dondatadeath, dondatarecover, dondataconfirmed],
   }
 ];

}

  //__________




  lineChartOptions = {
    plugins: {
        datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'top',
            formatter: function (value) { return (value); },
            font: { weight: 'bold' }
        }},
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        gridLines: {
            display: false,
        }
        }]
    },
    legend: {
      display: true
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];

  barChartOptions = this.lineChartOptions ;
  doughnutPieChartColors = [
    {
      backgroundColor: [
        '#231F20',
        '#8EAF0C',
        '#F85C50'
      ],
      borderColor: [
        '#231F20',
        '#8EAF0C',
        '#F85C50'
      ]
    }
  ];

  barChartColors = this.doughnutPieChartColors;





  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,.2)'
    }
  ];




  doughnutPieChartLabels = ["deaths", "recovered", "confirmed cases"];

  doughnutPieChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };







}
