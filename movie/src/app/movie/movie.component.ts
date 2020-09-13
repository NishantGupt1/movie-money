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
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
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
        console.log('movieData.budget')
        console.log(movieData.budget)
        this.productionCosts = movieData.budget
        this.earnings = movieData.revenue
        this.chart.data.datasets[0].data[0] = this.productionCosts
        this.chart.data.datasets[0].data[1] = this.earnings
        this.chart.update()
    })
    
  }
  
  }

