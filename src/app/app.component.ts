import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { theme } from '@douglas-serena/utils';
import { colors } from 'src/theme/colors';

@Component({
  selector: 'ef-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  ngOnInit() {
    theme(colors).createStyle();
  }
}
