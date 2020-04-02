import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { DatasService } from "./../../services/datas.service";
import { FormGroup, FormControl, Validators} from '@angular/forms';

export type Item = { name: string, values:any };

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements OnInit {

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
  constructor(private http : Http, private firstService : DatasService) { }
  interval: any;
  mySub : any;


  ngOnInit() {
  this.refreshData();
  this.interval = setInterval(() => {
  this.refreshData();
}, 100000);
}

refreshData(){
 this.firstService.getAllItems().subscribe(
   data => {
     this.items = data;
     console.log(this.items);
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
    borderColor: '#66fcf1',
    borderWidth: 1,
    fill: false
  },{
  label: 'deaths',
  data: death,
  borderColor: '#004687',
  borderWidth: 1,
  fill: false
},{
label: 'recovered',
data: recov,
borderColor: '#004687',
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
    console.log('table',datatable);
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
     borderColor: '#66fcf1',
     borderWidth: 1,
     fill: false
   },{
   label: 'deaths',
   data: this.deaths,
   borderColor: '#004687',
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

  barChartColors = this.lineChartColors;





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

  doughnutPieChartColors = [
    {
      backgroundColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    }
  ];


  scatterChartData = [
    {
      label: 'First Dataset',
      data: [{
          x: -10,
          y: 0
        },
        {
          x: 0,
          y: 3
        },
        {
          x: -25,
          y: 5
        },
        {
          x: 40,
          y: 5
        }
      ],
      borderWidth: 1
    },
    {
      label: 'Second Dataset',
      data: [{
          x: 10,
          y: 5
        },
        {
          x: 20,
          y: -30
        },
        {
          x: -25,
          y: 15
        },
        {
          x: -10,
          y: 5
        }
      ],
      borderWidth: 1
    }
  ];

  scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  };

  scatterChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)'      ]
    },
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ]
    }
  ];



}
