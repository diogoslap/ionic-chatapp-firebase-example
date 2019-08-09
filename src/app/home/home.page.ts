import { Component, ViewChild, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IonContent } from "@ionic/angular";
import * as firebase from "firebase/app";
import "firebase/database";
import { snapshotToArray } from "../shared/Utils";
import { Device } from "@ionic-native/device/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  @ViewChild(IonContent, { static: true }) content: IonContent;

  data = { type: "", nickname: "", message: "" };
  chats = [];
  offStatus: boolean = false;
  keyRoom: string;
  roomName: string;
  nickname: string;
  uuid;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private device: Device,
    public zone: NgZone
  ) {
    this.uuid = this.device.uuid != null ? this.device.uuid : "11111";

    this.keyRoom = this.route.snapshot.paramMap.get("key");
    this.roomName = this.route.snapshot.paramMap.get("roomname");
    this.nickname = this.route.snapshot.paramMap.get("nickname");
    this.data.type = "message";
    this.data.nickname = this.nickname;
  }

  ionViewDidEnter() {
    const joinData = firebase
      .database()
      .ref("chatrooms/" + this.keyRoom + "/chats")
      .push();

    joinData.set({
      type: "join",
      user: this.nickname,
      uid: this.uuid,
      message: this.nickname + " entrou na sala.",
      sendDate: Date()
    });
    this.data.message = "";

    firebase
      .database()
      .ref("chatrooms/" + this.keyRoom + "/chats")
      .on("value", resp => {
        this.zone.run(() => {
          this.chats = [];
          this.chats = snapshotToArray(resp);
          setTimeout(() => {
            if (this.offStatus === false) {
              this.content.scrollToBottom(300);
            }
          }, 1000);
        });
      });
  }

  sendMessage() {
    const newData = firebase
      .database()
      .ref("chatrooms/" + this.keyRoom + "/chats")
      .push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      uid: this.uuid,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = "";
  }

  exitChat() {
    const exitData = firebase
      .database()
      .ref("chatrooms/" + this.keyRoom + "/chats")
      .push();
    exitData.set({
      type: "exit",
      user: this.nickname,
      uid: this.uuid,
      message: this.nickname + " saiu da sala.",
      sendDate: Date()
    });

    this.offStatus = true;
    this.router.navigate(["/room", { nickname: this.nickname }]);
  }

  ngOnInit() {}
}
