import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-in-dropdown',
  templateUrl: './input-in-dropdown.component.html',
  styleUrls: ['./input-in-dropdown.component.scss'],
})
export class InputInDropdownComponent implements OnInit {
  @Input() listItems: any = [];
  @Input() label: string = '';
  @Output() getSelectedItems = new EventEmitter<any>();

  public form!: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      item: new FormControl('', Validators.required),
    });
  }

  addToList() {
    this.listItems.push({ name: this.form.value.item, selected: true });
    this.getSelectedItems.emit({ items: this.listItems });
    this.form.patchValue({
      item: null,
    });
  }

  onSelect(i: number) {
    this.listItems[i].selected = !this.listItems[i].selected;
    this.getSelectedItems.emit(this.listItems);
  }
}
