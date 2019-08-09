import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import * as firebase from "firebase/app";
import "firebase/database";

@Component({
  selector: "app-add-room",
  templateUrl: "./add-room.page.html",
  styleUrls: ["./add-room.page.scss"]
})
export class AddRoomPage implements OnInit {
  data = { roomname: "" };
  ref = firebase.database().ref("chatrooms/");

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  addRoom() {
    const newData = this.ref.push();
    newData.set({
      roomname: this.data.roomname
    });
    this.navCtrl.navigateBack("/room");
  }
}
