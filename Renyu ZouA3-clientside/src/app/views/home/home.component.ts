import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup} from '@angular/forms'; //1.

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  init():void{
    // Get the statistics
    fetch('http://localhost:3000/api/statistics').then(
      response => response.json()
    ).then(data=>{
        console.log(data)
        document.getElementById('amount')!.innerText = "$"+data.amount;
        document.getElementById('donations')!.innerText = data.donations;
        document.getElementById('count')!.innerText = data.count;
      }

    )

    // Get the number of all the types
    fetch('http://localhost:3000/api/categoryCount').then(
      response => response.json()
    ).then(data=>{
      console.log(data)
      document.getElementById('categoryCount')!.innerHTML = ``;
      data.forEach((item:any)=>{
        document.getElementById('categoryCount')!.innerHTML += `<p>${item.name}: ${item.count}</p>`;
      })

    })
    fetch('http://localhost:3000/api/fundraisers')
      // Convert the response from the server to JSON format
      .then(response => response.json())
      // Once the JSON data is successfully parsed, process the list of fundraisers
      .then(fundraisers => {
        // Get the container element where the fundraisers will be displayed
        const container = document.getElementById('fundraisers');
        // Iterate over each fundraiser in the retrieved list
        fundraisers.forEach((fundraiser: any) => {
          const fundraiserElement = document.createElement('div');// Create a new div element for each fundraiser
          fundraiserElement.innerHTML = `
                  <h3 style="margin-bottom: 5px;">${fundraiser.CAPTION}</h3>
                  <p>Fundraiser ID: ${fundraiser.FUNDRAISER_ID}</p>
                  <p>Organizer: ${fundraiser.ORGANIZER}</p>
                  <p>Target Funding: $${fundraiser.TARGET_FUNDING}</p>
                  <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
                  <p>City: ${fundraiser.CITY}</p>
                  <p>Active: ${fundraiser.ACTIVE ? 'Yes' : 'No'}</p>
                  <p>Category:${fundraiser.name}</p>
                  <p>Category: ${fundraiser.CATEGORY_ID}</p>
                  <div class="centered-link" onclick="window.location.href='/Leo?id=${fundraiser.FUNDRAISER_ID}'">
                      <p>View Details</p>
                  </div>
              `;
          container!.appendChild(fundraiserElement);//Attach each constructed element to the container
        });
      })
      .catch(error => console.error('Error fetching fundraisers:', error));// Handle any errors that occur during the fetch operation
  }

  ngOnInit(): void {
    this.init()
  }
}
