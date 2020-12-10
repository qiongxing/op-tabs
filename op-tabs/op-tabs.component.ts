import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { timer } from 'rxjs';
import { TabComponent } from './tab/tab.component';

interface TabChangeEvent {
  index: number,
  tab: TabComponent
}

@Component({
  selector: 'op-tabs',
  templateUrl: './op-tabs.component.html',
  styleUrls: ['./op-tabs.component.scss'],
})
export class OpTabsComponent implements OnInit, AfterContentInit {

  @Input() align: string = 'left';
  @Output() selectedTabChange = new EventEmitter<TabChangeEvent>();
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  private _index = 0;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this.tabs.length > 0) {
      let config: boolean = false;
      this.tabs.forEach(tab => {
        if (tab.active) {
          config = true;
        }
      });
      //如果没有默认设置active的tab页，那么默认取第一页
      if (!config) {
        timer().subscribe(() => { this.tabs.first.active = true; });
        this._index = 0;
        this.selectedTabChangeEmit({ index: 0, tab: this.tabs.first });
      }
    }
  }

  active(tab, index) {
    if (index !== this._index) {
      this.tabs.forEach(item => {
        if (tab !== item) {
          item.active = false;
        }
      });
      tab.active = true;
      this._index = index;
      this.selectedTabChangeEmit({ index, tab });
    }
  }

  private selectedTabChangeEmit(tab: TabChangeEvent) {
    this.selectedTabChange.emit(tab);
  }
}
