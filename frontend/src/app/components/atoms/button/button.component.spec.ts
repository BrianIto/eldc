import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { LucideAngularModule } from 'lucide-angular';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, LucideAngularModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with default values', () => {
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.type).toBe('button');
    expect(buttonElement.classList).toContain('bg-primary');
    expect(buttonElement.classList).toContain('h-10');
    expect(buttonElement.disabled).toBeFalse();
  });

  it('should emit click event when clicked', () => {
    const spy = jasmine.createSpy();
    component.clicked.subscribe(spy);

    buttonElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should not emit click when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const spy = jasmine.createSpy();
    component.clicked.subscribe(spy);

    buttonElement.click();
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
    expect(buttonElement.disabled).toBeTrue();
  });

  it('should show loading spinner when loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector(
      'lucide-icon[name="loader-2"]',
    );
    expect(spinner).toBeTruthy();
    expect(spinner.classList).toContain('animate-spin');
  });

  it('should display leading icon when provided', () => {
    component.leadingIcon = 'plus';
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector(
      'lucide-icon[name="plus"]',
    );
    expect(icon).toBeTruthy();
    expect(icon.previousSibling).toBeNull(); // Should be first element
  });

  it('should display trailing icon when provided', () => {
    component.trailingIcon = 'arrow-right';
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector(
      'lucide-icon[name="arrow-right"]',
    );
    expect(icon).toBeTruthy();
    expect(icon.nextSibling).toBeNull(); // Should be last element
  });

  it('should apply correct classes for variant and size', () => {
    component.variant = 'danger';
    component.size = 'lg';
    fixture.detectChanges();

    expect(buttonElement.classList).toContain('bg-destructive');
    expect(buttonElement.classList).toContain('h-11');
  });

  it('should apply custom icon size and classes', () => {
    component.leadingIcon = 'user';
    component.iconSize = 20;
    component.iconClass = 'custom-icon';
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('lucide-icon');
    expect(icon.getAttribute('size')).toBe('20');
    expect(icon.classList).toContain('custom-icon');
  });

  it('should display content between tags', () => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.nativeElement.innerHTML = `
      <app-button>Test Content</app-button>
    `;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('app-button button');
    expect(button.textContent).toContain('Test Content');
  });
});
