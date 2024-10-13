import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-fundraisers',
  templateUrl: './fundraisers.component.html',
  styleUrls: ['./fundraisers.component.less'],
})
export class FundraisersComponent implements OnInit {
  
  private searchInput: any;

  constructor() {
    this.searchInput = document.getElementById("searchInput") as HTMLInputElement;
  }
  clearCheckboxes():void   {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox:any) => {
      checkbox.checked = false;
    });
    document.getElementById('error-message')!.textContent = ''; // Clear the error message
    document.getElementById('results')!.innerHTML  = '' ; // Clear the search results
  }

  async searchFundraisers() {
    const selectedCities = Array.from(document.querySelectorAll('#CityForm input[name="city"]:checked')).map((cb:any) => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('#CategoryForm input[name="category"]:checked')).map((cb:any) => cb.value);
    const selectedInput = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase(); // Get the search input and convert to lowercase

    const resultsDiv = document.getElementById('results')!;
    const errorMessage = document.getElementById('error-message')!;

    // Clear previous search results and error messages
    resultsDiv.innerHTML = '';
    errorMessage.textContent = '';

    // Check that at least one filter is selected
    if (selectedCities.length === 0 && selectedCategories.length === 0 && !selectedInput.trim()) {
      errorMessage.textContent = 'Please select at least one criterion.';
      errorMessage.style.display = 'block';
      return;
    }

    // Get a list of fundraisers
    const fundraisers:any = await this.getList();
    console.log(fundraisers)
    // Filter fundraisers based on the criteria you select
    const filtered = fundraisers.filter((fundraiser:any) => {
      return (
        (selectedCities.length === 0 || selectedCities.includes(fundraiser.CITY)) &&
        (selectedCategories.length === 0 || selectedCategories.includes(String(fundraiser.CATEGORY_ID))) &&
        (selectedInput.length === 0 || fundraiser.CAPTION.toLowerCase().includes(selectedInput) || fundraiser.CITY.toLowerCase().includes(selectedInput)) // Filter by search input
      );
    });

    // Check to see if there is an eligible fundraiser
    if (filtered.length > 0) {
      filtered.forEach((fundraiser:any) => { // Go through all eligible fundraisers
        const element = this.genSearchResultElementList([fundraiser]); // Generate and get search result elements
        resultsDiv.innerHTML += element; // Append to results area
      });
    } else {
      // If it doesn't find an eligible fundraiser, you'll see a tooltip
      resultsDiv.innerHTML = '<strong style="color: red;">No eligible fundraisers were found.</strong>';
    }
  }

  getList() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/fundraisers') // Use the fetch API to request data from a specified URL
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Convert the response data to JSON format
        })
        .then(fundraisers => {
          resolve(fundraisers);
        })
        .catch(error => {
          console.error('Fetch error:', error);
          reject(error);
        });
    });
  }

  // Define a function that handles search click events asynchronously
  async  searchClickHandler(e:any) {
    e.preventDefault(); // Block default events
    const value = this.searchInput.value.toLowerCase();
    if (!value.trim()) {
      return;
    }

    // Call the getList function to get a list of fundraisers
    const fundraisers:any = await this.getList();

    // Filter the list based on the search input
    const filterData = fundraisers.filter((item:any) => {
      return Object.values(item).some(e => {
        return String(e).toLowerCase().includes(value);
      });
    });

    // Generate a list of elements that represent the search results
    const element: any = this.genSearchResultElementList(filterData);
    document.getElementById('results')!.innerHTML = element;
  }

  genSearchResultElementList(data:any) {
    if (!Array.isArray(data)) {
      return null;
    }

    // Generate a corresponding HTML element string for each fundraiser
    return data.map((fundraiser:any) => {
      return `
      <div>
        <h3 style="margin-bottom: 5px;">${fundraiser.CAPTION}</h3>
        <p>Fundraiser ID: ${fundraiser.FUNDRAISER_ID}</p>
        <p>Organizer: ${fundraiser.ORGANIZER}</p>
        <p>Target Funding: $${fundraiser.TARGET_FUNDING}</p>
        <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
        <p>City: ${fundraiser.CITY}</p>
        <p>Active: ${fundraiser.ACTIVE ? 'Yes' : 'No'}</p>
        <p>Category: ${fundraiser.name}</p>
        <p>CategoryId: ${fundraiser.CATEGORY_ID}</p>
        <div class="centered-link">
            <a href="/Leo?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
        </div>
      </div>
    `;
    }).join(""); // Convert arrays to strings and concatenate them with empty strings
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      //searchCategories
      fetch('http://localhost:3000/api/categories').then(response => response.json()).then(data => {
        console.log(data);
        const categoryContainer = document.getElementById('CategoryForm');
        categoryContainer!.innerHTML='';
        if(data.length ===0) {categoryContainer!.innerHTML='<p>No Category</p>'}
        else{
          data.forEach((item:any)=>{
            const label = document.createElement('label')
            label.innerHTML=`<input type="checkbox" id="${item.CATEGORY_ID}" name="category" value="${item.CATEGORY_ID}"> ${item.NAME}`;
            categoryContainer!.appendChild(label);
          })
        }
      })

      //searchCity
      fetch('http://localhost:3000/api/cities').then(response => response.json()).then(data => {
        console.log(data);
        const cityContainer = document.getElementById('CityForm');
        cityContainer!.innerHTML='';
        if(data.length===0){
          cityContainer!.innerHTML='<p>No City</p>'
        }else{
          data.forEach((item:any)=>{
            const label = document.createElement('label')
            label.innerHTML=`<input type="checkbox" name="city" value="${item.city}"> ${item.city}`;
            cityContainer!.appendChild(label);
          })
        }
      })

    });
  }

  protected readonly event = event;
}
