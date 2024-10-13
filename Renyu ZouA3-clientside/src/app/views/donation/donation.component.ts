import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.less'],
})
export class DonationComponent implements OnInit {
  constructor() {}

  init():void{
    // Get the query parameters in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');
    const caption = urlParams.get('caption');
    let target = parseInt( urlParams.get('target')!,10);
    let current = parseInt(urlParams.get('current')!,10);
    const organizer = urlParams.get('organizer');
    const city = urlParams.get('city');
    const NAME = urlParams.get('name');
    console.log(fundraiserId, caption, target, current, organizer, city, NAME);
    // Donation information is displayed on the page
    const donationDetailsContainer = document.getElementById('donation-details');
    donationDetailsContainer!.innerHTML = `
            <h3><strong>Donate to:</strong> ${caption}</h3>
            <p><strong>Fundraiser ID:</strong> ${fundraiserId}</p>
            <p><strong>Organizer:</strong> ${organizer}</p>
            <p><strong>Category:</strong> ${name}</p>
            <p><strong>Target Funding:</strong> $${target}</p>
            <p id="current-funding"><strong>Current Funding:</strong> $${current}</p>
            <p><strong>City:</strong> ${city}</p>
            <form id="donation-form">
                <label for="amount">Donation Amount:</label>
                <input style="margtin-top: 10px;" type="number" id="amount" name="amount" min="1" placeholder="Enter amount" required>
                <label for="amount">Please leave your name: </label>
                <input style="margin-top: 10px;" type="text" id="name" name="name" placeholder="Enter your name" required>
                <button id="donate-button" type="submit" style="margin-top: 10px;">Donate</button>
            </form>
        `;
    // Check if the target has been reached and hide the button
    function checkTargetReached() {
      const currentFundingElement = document.getElementById('donation-form');
      if (current >= target) {
        currentFundingElement!.style.display = 'none';  // Hide the donation button
        alert('The target funding has been reached. Thank you for your support!');
        window.location.href ='/Leo?id='+fundraiserId;
      }
    }

    // Check whether the goal has been reached when the page loads for the first time
    checkTargetReached();
    (document.getElementById('donation-form') as any).addEventListener('submit', function (event :any) {
      event.preventDefault();
      let amount = parseInt(((document.getElementById('amount') as HTMLInputElement).value),10);
      let name = (document.getElementById('name') as HTMLInputElement).value;
      if (amount && amount > 0) {
        console.log(amount+current,target)
        if(amount<5){
          alert(`the minimum of donation is 5 AUD.`);
        }else if((amount+current)>target){
          alert(`it's too many ,the fundraieser only need ${target-current} AUD.`);
        } else{
          // Build a request body with fundraiserId and donation amount
          const data = {
            fundraiserId: fundraiserId,
            donationAmount: amount ,
            giver: name
          };
          // Send a POST request to the back-end
          fetch('http://localhost:3000/api/donate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Convert the data to JSON format
          })
            .then(response => response.json())
            .then(data => {
              if (data.state==1) {
                const currentFundingElement = document.getElementById('current-funding');
                current+=amount;
                currentFundingElement!.innerHTML = `<strong>Current Funding:</strong> $${current}`;
                alert(`Thank you for donating $${amount} to ${caption}!`);
                checkTargetReached();
                window.location.href ='/Leo?id='+fundraiserId;
              } else {
                alert('Donation failed, please try again.');
              }
            })
            .catch(error => {
              console.log('Error:', error);
            });
        }
      } else {
        alert('Please enter a valid donation amount.');
      }
    });
  }

  ngOnInit(): void {
    this.init()
  }
}
