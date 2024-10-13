import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-leo',
  templateUrl: './leo.component.html',
  styleUrls: ['./leo.component.less'],
})
export class LeoComponent implements OnInit {
  constructor() {}
  init():void{
    // Wait until the DOM content is fully loaded before executing the script
    document.addEventListener("DOMContentLoaded", function() {
      // Get the fundraiser ID in the query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const fundraiserId = urlParams.get('id');
      let fundraiserDetails:any = {};
      // Get fundraising details from API
      fetch(`http://localhost:3000/api/fundraiser/${fundraiserId}`)
        .then(response => response.json())
        .then(fundraiser => {
          const detailsContainer = document.getElementById('fundraiser-details');
          fundraiserDetails = fundraiser; // Save fundraising details
          console.log(fundraiserDetails);
          detailsContainer!.innerHTML = `
                        <h3 class="fundraiser-title">${fundraiser.CAPTION}</h3>
                        <div class="fundraiser-info">
                            <p><strong>Fundraiser ID:</strong> ${fundraiser.FUNDRAISER_ID}</p>
                            <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                            <p><strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING.toLocaleString()}</p>
                            <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING.toLocaleString()}</p>
                            <p><strong>City:</strong> ${fundraiser.CITY}</p>
                            <p><strong>Active:</strong> ${fundraiser.ACTIVE ? '<span class="status-active">Yes</span>' : '<span class="status-inactive">No</span>'}</p>
                            <p><strong>Category:</strong> ${fundraiser.name}</p>
                            <p><strong>CategoryId:</strong> ${fundraiser.CATEGORY_ID}</p>
                        </div>
                    `;
          if(fundraiser.TARGET_FUNDING <= fundraiser.CURRENT_FUNDING)
          {
            document.getElementById('donate-button')!.style.display = 'none';
            document.getElementById('funding-message')!.style.display='block';
          }
        })
        .catch(error => console.error('Error fetching fundraiser details:', error));

// Obtain and display donation records
      fetch(`http://localhost:3000/api/donations/${fundraiserId}`)
        .then(response => response.json())
        .then(donations => {
          const donationTableBody = document.querySelector('#donation-table tbody');
          console.log(donations);
          // Clear the table
          donationTableBody!.innerHTML = '';

          if (donations.length === 0) {
            // If there is no donation record, the prompt message is displayed
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `
                <td colspan="3" style="text-align: center;">No donations found</td>
            `;
            donationTableBody!.appendChild(noDataRow);
          } else {
            // If there is a donation record, the cycle shows
            donations.forEach((donation:any) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                    <td>${donation.date}</td>
                    <td>$${donation.amount.toLocaleString()}</td>
                    <td>${donation.giver}</td>
                `;
              donationTableBody!.appendChild(row);
            });
          }
        })
        .catch(error => console.error('Error fetching donation records:', error));

      // Add a click event for the "Donate" button to go to the donation page and pass on the fundraising information
      const donateButton = document.getElementById('donate-button');
      if (donateButton) {
        donateButton.addEventListener('click', function () {
          const donationUrl = `/Donation?id=${fundraiserDetails.FUNDRAISER_ID}&caption=${encodeURIComponent(fundraiserDetails.CAPTION)}&target=${fundraiserDetails.TARGET_FUNDING}&current=${fundraiserDetails.CURRENT_FUNDING}&organizer=${encodeURIComponent(fundraiserDetails.ORGANIZER)}&city=${encodeURIComponent(fundraiserDetails.CITY)}&name=${encodeURIComponent(fundraiserDetails.name)}`;
          window.location.href = donationUrl;
        });
      }
    });
  }
  ngOnInit(): void {
    this.init()
  }
}
