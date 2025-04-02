import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
})
export class PopupComponent {
  @Input() floating: boolean = true;
  @Input() open: boolean = false;
}
