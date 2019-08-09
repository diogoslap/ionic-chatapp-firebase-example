import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { snapshotToArray } from "../shared/Utils";
import { Storage } from "@ionic/storage";
import * as firebase from "firebase/app";
import "firebase/database";

@Component({
  selector: "app-room",
  templateUrl: "./room.page.html",
  styleUrls: ["./room.page.scss"]
})
export class RoomPage implements OnInit {
  rooms = [];
  ref = firebase.database().ref("chatrooms/");
  nickname: string;

  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.storage.get("nickname").then(val => {
      if (val) {
        this.nickname = val;
      }
    });
    this.ref.on(
      "value",
      resp => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp);
      },
      error => {
        console.log(error);
      }
    );
  }

  addRoom() {
    this.router.navigate(["/add-room"]);
  }
  joinRoom(key, roomname) {
    this.router.navigate([
      "/home",
      {
        key: key,
        nickname: this.nickname,
        roomname: roomname
      }
    ]);
  }
}
