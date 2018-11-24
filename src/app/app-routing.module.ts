import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "login", loadChildren: "./auth/auth.module#AuthPageModule" },
  { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
