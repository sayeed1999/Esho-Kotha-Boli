import { Component, OnInit } from '@angular/core';
import { UserForPoepleBoxVm } from 'src/app/core/models/userForPeopleBoxVm';
import { ChatBoxService } from '../../services/chat-box/chat-box.service';
import { PeopleBoxService } from '../../services/people-box/people-box.service';

@Component({
  selector: 'people-box',
  templateUrl: './people-box.component.html',
  styleUrls: ['./people-box.component.css']
})
export class PeopleBoxComponent implements OnInit {

  userList!: UserForPoepleBoxVm[];

  constructor(
    private peopleBoxService: PeopleBoxService,
    private chatBoxService: ChatBoxService,
  ) { }

  ngOnInit(): void {
    this.peopleBoxService.getPeopleBoxListAsync().subscribe(
      (res: any) => {
        this.userList = res;
      }
    );
  }

  selectUser(user: any) {
    this.chatBoxService.chatWith.next(user);
  }

}
