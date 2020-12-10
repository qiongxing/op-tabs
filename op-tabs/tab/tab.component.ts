import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'op-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {


  @Input() heading: string = "tab";
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
