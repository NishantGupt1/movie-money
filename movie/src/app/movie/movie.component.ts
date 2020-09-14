import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  chart: Chart
  productionCosts: number = 0
  earnings: number = 0
  revenue: string = ''
  title: string = ''
  isEmptyRevenue = true
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
            labels: ['Production Costs', 'Earnings'],
            datasets: [{
                label: 'Movie Production Cost vs Earnings',
                data: [this.productionCosts, this.earnings],
                backgroundColor: [
                    'skyblue',
                    'skyblue',
                ],
                borderColor: [
                    'black',
                    'black',
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return '$' + value;
                        }
                    },
                }]
            }
        }
    });
    this.searchService.movie$.subscribe(movieData => {
        this.title = movieData.title
        this.productionCosts = movieData.budget
        this.earnings = movieData.revenue
        this.revenue = (movieData.revenue - movieData.budget).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        this.chart.data.datasets[0].data[0] = this.productionCosts
        this.chart.data.datasets[0].data[1] = this.earnings
        this.chart.update()
    })
    
  }
  
  }

