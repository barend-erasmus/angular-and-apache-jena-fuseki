import { Component, OnInit, ElementRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { encode } from 'punycode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private baseUri: string = 'http://192.168.46.189:3030';

  public selectedManufacturer: string = 'ex:manufacturer/FERRARI';

  public manufacturers: any[] = [];

  public drivers: any[];

  constructor(private http: Http, private el: ElementRef) {

  }

  public ngOnInit(): void {
    this.loadManufacturers();
    this.onClick_Manufacturer(this.selectedManufacturer);
  }

  public onClick_Manufacturer(Manufacturer: string): void {
    this.selectedManufacturer = Manufacturer;
    this.loadDrivers();
  }

  private loadManufacturers(): void {
    this.post(`/formula-1/sparql`, `
    SELECT ?s ?o
    WHERE
    {
      ?s <http://example.com/title> ?o .
      ?s <http://example.com/type> <ex:manufacturer> .
    } ORDER BY ?o`).map((r) => r.json()).subscribe((json) => {
        this.manufacturers = json.results.bindings.map((x) => {
          return {
            id: x.s.value,
            title: x.o.value,
          };
        })
      });
  }

  private loadDrivers(): void {
    this.post(`/formula-1/sparql`, `
    SELECT ?s ?o
    WHERE
    {
      ?s <http://example.com/title> ?o .
      ?s <http://example.com/type> <ex:driver> .
      ?s <http://example.com/drives> <${this.selectedManufacturer}>
    } ORDER BY ?o`).map((r) => r.json()).subscribe((json) => {
        this.drivers = json.results.bindings.map((x) => x.o.value);
      });
  }

  protected post(uri: string, obj: any): Observable<Response> {
    const headers = new Headers();
    headers.set('content-type', ' application/sparql-query');
    headers.set('accept', 'application/sparql-results+json');
    return this.http.post(`${this.baseUri}${uri}`, obj, {
      headers,
    });
  }
}
