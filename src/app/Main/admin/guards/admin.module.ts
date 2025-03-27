import { NgModule } from '@angular/core'; // <-- Add this import
import { AdminGuard } from '../guards/admin.guard';

@NgModule({
  // ... existing imports
  providers: [AdminGuard],
})
export class AdminModule {}
