import { Component, OnInit } from '@angular/core';
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'docs-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
  imports: [NgIf,NgFor],
  standalone: true
})
export class AdminComponent implements OnInit {

  fundraisers: any[] = []
  constructor() {}


  editFundraiser(id:any) {
    window.location.href = `/addFundraisers?id=${id}`;
  }

  deleteFundraiser(id:any) {
    if (confirm(`Are you sure you want to delete fundraiser with ID: ${id}?`)) {
      fetch(`http://localhost:3000/api/fundraisers/delete/${id}`,{
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          alert(data.message);
          location.reload();
        })
        .catch(error => {
          console.error('Error deleting fundraiser:', error);
        });
    }
  }

  init():void{
    // Fetch the fundraisers data from the API and populate the table
    fetch('http://localhost:3000/api/fundraisers')
      .then(response => response.json())
      .then((fundraisers:any) => {
        this.fundraisers = fundraisers
        // const tableBody = document.querySelector('#fundraiser-table tbody');
        // fundraisers.forEach((fundraiser:any) => {
        //   const row = document.createElement('tr');
        //   row.innerHTML = `
        //     <td>${fundraiser.FUNDRAISER_ID}</td>
        //     <td>${fundraiser.ORGANIZER}</td>
        //     <td>${fundraiser.CAPTION}</td>
        //     <td>$${fundraiser.TARGET_FUNDING}</td>
        //     <td>$${fundraiser.CURRENT_FUNDING}</td>
        //     <td>${fundraiser.ACTIVE ? 'Active' : 'Inactive'}</td>
        //     <td>${fundraiser.CITY}</td>
        //     <td>
        //       <button class="edit-btn" onclick="editFundraiser(${fundraiser.FUNDRAISER_ID})">Edit</button>
        //       <button class="delete-btn" onclick="deleteFundraiser(${fundraiser.FUNDRAISER_ID})">Delete</button>
        //     </td>
        //   `;
        //   tableBody!.appendChild(row);
        // });
      })
      .catch(error => console.error('Error fetching fundraisers:', error));
  }

  ngOnInit(): void {
    this.init()
  }
}
