import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ef-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
  @Input() selected = false;
  @Input() disabled = false;
  @Input() disabledSelected = false;
  @Output() selectedChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSelected() {
    if (!this.disabled && !this.disabledSelected) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  }
}
