import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthJwtService, FormTemplate } from '@douglas-serena/ng-utils';
import { contains, Global } from '@douglas-serena/utils';
import dayjs from 'dayjs';
import { ICategory } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'ef-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent extends FormTemplate implements OnInit {
  loading = true;
  isUpdate = false;
  categories: ICategory[] = [];

  get isMobile() {
    return Global.isMobile;
  }

  constructor(
    private eventService: EventService,
    private snackbarService: MatSnackBar,
    private authJwtService: AuthJwtService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) private eventId?: string
  ) {
    super();
  }

  async ngOnInit() {
    this.formBuild({
      userId: [this.authJwtService.tokenDecode.id],
      name: ['', [Validators.required]],
      description: [''],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      images: [[]],
      helperTags: [[]],
      value: [0],
      isPay: [false],
      email: [''],
      maps: [''],
      latitude: [0, [Validators.required]],
      longitude: [0, [Validators.required]],
      whatsapp: [''],
      categoriesId: [[], [Validators.required]],
    });

    await this.getCategories();
    this.controls.maps.valueChanges.subscribe(this.onLocation.bind(this));

    if (this.eventId) {
      this.isUpdate = true;
      const [data] = await this.handleHttp(
        this.eventService.getById(this.eventId)
      );
      if (data) {
        const event = data.data;
        this.form.patchValue({
          ...event,
          time: event.date,
          maps: [event.longitude, event.latitude],
        });
      }
    }

    this.loading = false;
  }

  async getCategories() {
    const [data] = await this.handleHttp(this.categoryService.get());
    if (data) {
      this.categories = data.data;
    }
  }

  onLocation(center: number[]) {
    this.controls.longitude.setValue(center[0]);
    this.controls.latitude.setValue(center[1]);
  }

  async save() {
    if (this.form.valid) {
      const value = this.form.value;

      value.date = dayjs(value.date).format('YYYY-MM-DD');
      value.time = dayjs(value.time).format('HH:mm:ss');
      value.date = `${value.date}T${value.time}`;

      const imagesUpload = (value.images as string[]).filter((image) =>
        contains(image, 'data:image/png;base64')
      );
      value.images = (value.images as string[]).filter(
        (image) => !contains(image, 'data:image/png;base64')
      );
      if (imagesUpload.length) {
        const [images] = await this.handleHttp(
          this.eventService.upload(imagesUpload)
        );

        if (images) {
          value.images.push(...images.data.map(({ url }) => url));
        }
      }

      const [_, error] = await this.handleHttp(
        this.eventService.save(value, this.eventId)
      );
      if (!error) {
        this.dialogRef.close();
      } else {
        this.snackbarService.open('Não foi possivel cadastrar o evento', 'OK', {
          panelClass: 'mat-danger',
        });
      }
      this.loading = false;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
