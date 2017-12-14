import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpModule
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as selectedManufacturer as 'FERRARI'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.selectedManufacturer).toEqual('ex:manufacturer/FERRARI');
  }));

  it(`should have 2 drivers after load for 'FERRARI'`, ((done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    setTimeout(() => {
      expect(app.drivers.length).toEqual(2);
      done();
    }, 3000);
  }));

  it(`should render 2 drivers after load for 'FERRARI'`, ((done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('table.table.table-striped tbody tr').length).toEqual(2);
      done();
    }, 3000);
  }));

  it('should have 10 manufacturers after load', ((done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    setTimeout(() => {
      expect(app.manufacturers.length).toEqual(10);
      done();
    }, 3000);
  }));

  it('should render 10 manufacturers after load', ((done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('ul.nav.nav-tabs li').length).toEqual(10);
      done();
    }, 3000);
  }));

  it(`should have 'FERRARI' selected by default`, ((done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('ul.nav.nav-tabs li.active').textContent.trim()).toEqual('Ferrari');
      done();
    }, 3000);
  }));
});
