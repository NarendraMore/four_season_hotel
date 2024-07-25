import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor() { }

  ngOnInit(): void {
    this.createChart();
    this.createChartBar();
  }

   createChart(): void {
    const chartData = {
        labels: ["S", "M", "T", "W", "T", "F", "S"],
        datasets: [{
            data: [589, 445, 483, 503, 689, 692, 634],
            borderColor: '#ea801d', // Color for the first line
            backgroundColor: '#ea801d', // Optional: color for the area under the first line
            borderWidth: 2, // Width of the line
            tension: 0.1 // Smoothness of the line
            
        },
        {
            data: [639, 465, 493, 478, 589, 632, 674],
            borderColor: '#1dc7ea', // Color for the second line
            backgroundColor: '#1dc7ea', // Optional: color for the area under the second line
            borderWidth: 2, // Width of the line
            tension: 0.1 // Smoothness of the line
        }]
    };

    const chLine = document.getElementById('chLine') as HTMLCanvasElement;
    if (chLine) {
        new Chart(chLine, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: {
                        display: true // Set to true if you want to show the legend
                    }
                }
            }
        });
    }
}
createChartBar(): void {
    const colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];

    const chBar = document.getElementById('chBar') as HTMLCanvasElement;
    const chartData = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          data: [589, 445, 483, 503, 689, 692, 634],
          backgroundColor: colors[0],
          barPercentage: 0.4,
          categoryPercentage: 0.5
        },
        {
          data: [209, 245, 383, 403, 589, 692, 580],
          backgroundColor: colors[1],
          barPercentage: 0.4,
          categoryPercentage: 0.5
        },
        // {
        //   data: [489, 135, 483, 290, 189, 603, 600],
        //   backgroundColor: colors[2],
        //   barPercentage: 0.4,
        //   categoryPercentage: 0.5
        // },
        // {
        //   data: [639, 465, 493, 478, 589, 632, 674],
        //   backgroundColor: colors[4],
        //   barPercentage: 0.4,
        //   categoryPercentage: 0.5
        // }
      ]
    };

    if (chBar) {
      new Chart(chBar, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            x: {
              beginAtZero: false
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

}
