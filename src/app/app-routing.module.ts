import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "signin", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "signin", loadChildren: "./signin/signin.module#SigninPageModule" },
  { path: "room", loadChildren: "./room/room.module#RoomPageModule" },
  {
    path: "add-room",
    loadChildren: "./add-room/add-room.module#AddRoomPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
