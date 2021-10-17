import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit,
  Optional,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlBaseComponent } from '@douglas-serena/ng-inputs-material';
import { fileToBase64, Global } from '@douglas-serena/utils';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EventFormImagesComponent),
  multi: true,
};

@Component({
  selector: 'ef-event-form-images',
  templateUrl: './event-form-images.component.html',
  styleUrls: ['./event-form-images.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class EventFormImagesComponent
  extends ControlBaseComponent
  implements OnInit
{
  loading = false;

  get isMobile() {
    return Global.isMobile;
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(changeDetectorRef, controlContainer);
  }

  ngOnInit() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.control.value,
      event.previousIndex,
      event.currentIndex
    );
  }

  async add(files: FileList | null) {
    if (!files) return;
    this.loading = true;

    for (const file of Array.from(files)) {
      this.control.value.push(await fileToBase64(file));
    }
    this.loading = false;
  }

  remove(index: number) {
    this.control.value.splice(index, 1);
  }
}
