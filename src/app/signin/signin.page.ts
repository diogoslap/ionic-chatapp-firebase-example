import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"]
})
export class SigninPage implements OnInit {
  data = { nickname: "" };
  constructor(private router: Router, private storage: Storage) {
    this.storage.get("nickname").then(val => {
      if (val) {
        this.data.nickname = val;
      }
    });
  }

  ngOnInit() {}

  enterNickname() {
    if (this.data.nickname) {
      this.storage.set("nickname", this.data.nickname);
      this.router.navigate(["/room", { nickname: this.data.nickname }]);
    }
  }
}
