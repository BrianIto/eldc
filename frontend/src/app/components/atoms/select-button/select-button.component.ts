import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { ChevronDownIcon, LucideAngularModule, XIcon } from 'lucide-angular';
@Component({
  selector: 'app-select-button',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.css',
})
export class SelectButtonComponent {
  readonly ChevronDownIcon = ChevronDownIcon;
  readonly XIcon = XIcon;
  @Input() open = false;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() label?: string;

  @Output() change = new EventEmitter<{ open: boolean }>();
  @Output() clear = new EventEmitter<void>();

  @ViewChild('buttonRef') buttonRef!: ElementRef<HTMLButtonElement>;

  onChangeOpen(val: boolean) {
    this.change.emit({ open: val });
  }

  clearValue(e: MouseEvent) {
    e.stopPropagation();
    this.clear.emit();
  }
}
