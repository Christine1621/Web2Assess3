import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-one',
  templateUrl: './addFundraisers.component.html',
  styleUrls: ['./addFundraisers.component.less'],
})
export class AddFundraisersComponent implements OnInit {
  constructor() {}
  init():void{
    // Load the logic for the category options
    fetch('http://localhost:3000/api/categories')
      .then(response => response.json())
      .then(categories => {
        const categorySelect = document.getElementById('category');
        categories.forEach((category:any) => {
          const option = document.createElement('option');
          option.value = category.CATEGORY_ID; // Select the correct ID
          option.textContent = category.NAME; // Display the category name
          categorySelect!.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching categories:', error));

    // Determines the logic of editing mode
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');
    if (fundraiserId) {
      // Edit mode to load existing fundraiser data from the API
      fetch(`http://localhost:3000/api/fundraiser/${fundraiserId}`)
        .then(response => response.json())
        .then(fundraiser => {
          (document.getElementById('page-title') as HTMLInputElement).textContent = 'Edit Fundraiser';
          (document.getElementById('caption') as HTMLInputElement).value = fundraiser.CAPTION;
          (document.getElementById('organizer') as HTMLInputElement).value = fundraiser.ORGANIZER;
          (document.getElementById('target-funding')as HTMLInputElement).value = fundraiser.TARGET_FUNDING;
          (document.getElementById('current-funding-display') as HTMLInputElement).textContent = `$${fundraiser.CURRENT_FUNDING.toLocaleString()}`;
          (document.getElementById('current-funding') as HTMLInputElement).value = fundraiser.CURRENT_FUNDING; // Enter current fundraising when editing
          (document.getElementById('city') as HTMLInputElement).value = fundraiser.CITY;
          (document.getElementById('category') as HTMLInputElement).value = fundraiser.CATEGORY_ID;
          document.getElementById('current-funding')!.style.display='none'
        })
        .catch(error => console.error('Error fetching fundraiser details:', error));
    } else {
      // Add mode to clear the current fundraising field
      document.getElementById('current-funding-display')!.textContent = '';
    }

    document.getElementById('save-button')!.addEventListener('click', function () {
      // Clear the previous error message
      document.getElementById('caption-error')!.style.display = 'none';
      document.getElementById('organizer-error')!.style.display = 'none';
      document.getElementById('target-funding-error')!.style.display = 'none';
      document.getElementById('current-funding-error')!.style.display = 'none';
      document.getElementById('city-error')!.style.display = 'none';
      document.getElementById('category-error')!.style.display = 'none';

      // Form validation
      const caption = (document.getElementById('caption') as HTMLInputElement).value.trim();
      const organizer = (document.getElementById('organizer') as HTMLInputElement).value.trim();
      const targetFunding = parseFloat((document.getElementById('target-funding') as HTMLInputElement).value);
      const currentFunding = parseFloat((document.getElementById('current-funding') as HTMLInputElement).value);
      const city = (document.getElementById('city') as HTMLInputElement).value.trim();
      const category = (document.getElementById('category') as HTMLInputElement).value;

      let valid = true;

      if (!caption) {
        document.getElementById('caption-error')!.style.display = 'block';
        valid = false;
      }
      if (!organizer) {
        document.getElementById('organizer-error')!.style.display = 'block';
        valid = false;
      }
      if (targetFunding <= 0) {
        document.getElementById('target-funding-error')!.style.display = 'block';
        valid = false;
      }
      if (currentFunding > targetFunding) {
        document.getElementById('current-funding-error')!.style.display = 'block';
        valid = false;
      }
      if (!city) {
        document.getElementById('city-error')!.style.display = 'block';
        valid = false;
      }
      if (!category) {
        document.getElementById('category-error')!.style.display = 'block';
        valid = false;
      }

      if (!valid) {
        return; // If the authentication fails, stop the execution
      }

      const formData = {
        id: fundraiserId,
        caption: caption,
        organizer: organizer,
        targetFunding: targetFunding,
        currentFunding: currentFunding,
        city: city,
        category: category
      };

      // Determine whether to add or modify
      const method = fundraiserId ? 'PUT' : 'POST';
      const url = fundraiserId ? `http://localhost:3000/api/edit/fundraiser` : `http://localhost:3000/api/add/fundraiser`;

      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (response.ok) {
            alert('Success!');
            window.location.href = '/admin'; // Jump to the fundraiser list
          } else {
            throw new Error('Error saving fundraiser');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while saving the fundraiser.');
        });
    });
  }
  ngOnInit(): void {
    this.init()
  }
}
