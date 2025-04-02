import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, Loader2Icon } from 'lucide-angular';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [LucideAngularModule],
})
export class ButtonComponent {

  readonly Loader2Icon = Loader2Icon;

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' =
    'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() rounded = false;
  @Input() className = ""
  //Icons
  @Input() leadingIcon?: any; // Should be LucideIconData -> FIX PR OPEN HERE: https://github.com/lucide-icons/lucide/pull/2820
  @Input() trailingIcon?: any; // Should be LucideIconData -> FIX PR OPEN HERE: https://github.com/lucide-icons/lucide/pull/2820

  @Input() iconSize = 16;
  @Input() iconClass = '';

  @Output() clicked = new EventEmitter<Event>();

  get buttonClasses(): string {
    return [
      'inline-flex items-center text-[13px] lg:text-base justify-center gap-2 rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.rounded ? 'rounded-full' : '',
      this.getVariantClasses(),
      this.getSizeClasses(),
      this.className,
      !!this.fullWidth ? 'w-full ' : '',
    ].join(' ');
  }

  private getVariantClasses(): string {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      danger:
        'bg-destructive text-primary-foreground hover:bg-destructive/90',
      outline:
        'border border-input hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-primary/20 text-secondary/60 hover:text-secondary/90',
    };
    return variants[this.variant];
  }

  private getSizeClasses(): string {
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-lg',
    };
    return sizes[this.size];
  }

  onClick(event: Event) {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
