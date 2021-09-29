import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { theme } from '@douglas-serena/utils';
import { colors } from 'src/theme/colors';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ef-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    theme(colors).createStyle();

    this.matIconRegistry.addSvgIcon(
      `facebook`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `/assets/svgs/fecebook.svg`
      )
    );
  }
}
