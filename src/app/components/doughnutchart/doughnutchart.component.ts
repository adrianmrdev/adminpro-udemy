import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styles: []
})
export class DoughnutchartComponent implements OnInit {

  @Input('labels') doughnutChartLabels: Label[] = [];
  @Input('data') doughnutChartData: MultiDataSet = [];
  @Input('type') doughnutChartType: ChartType = 'doughnut';
  @Input('legend') doughnutLegend: string = '';

  constructor() { }

  ngOnInit() {
  }

}
