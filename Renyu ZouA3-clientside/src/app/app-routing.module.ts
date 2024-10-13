import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { DonationComponent } from './views/donation/donation.component';
import { FundraisersComponent } from './views/fundraisers/fundraisers.component';
import { LeoComponent } from './views/leo/leo.component';


const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
   component: HomeComponent
  },
  {
    path: 'Donation',
    component: DonationComponent
  }, {
    path: 'Fundraisers',
    component: FundraisersComponent
  },
  {
    path: 'Leo',
    component: LeoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
