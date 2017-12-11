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

  public selectedManufaturer: string = 'ex:manufacturer/FERRARI';

  public manufacturers: any[] = [];

  public results: any[];

  constructor(private http: Http, private el: ElementRef) {

  }

  public ngOnInit(): void {
    this.loadManufacturers();
    this.onClick_Manufaturer(this.selectedManufaturer);
  }

  public onClick_Manufaturer(manufaturer: string): void {
    this.selectedManufaturer = manufaturer;

    this.loadDrivers();
  }

  private loadManufacturers(): void {
    this.post(`/formula-1/sparql`, `
    SELECT ?s
    WHERE
    {
      ?s <http://example.com/type> <ex:manufacturer> .
    }`).map((r) => r.json()).subscribe((json) => {
        this.loadManufacturerTitles(json.results.bindings.map((x) => x.s.value));
      });
  }

  private loadManufacturerTitles(manufacturerUris: string[]): void {
    this.post(`/formula-1/sparql`, `
    SELECT ?s ?o
    WHERE
    {
      ?s <http://example.com/title> ?o .
      FILTER (?s IN (${manufacturerUris.map((x) => `<${x}>`).join(', ')}))
    }`).map((r) => r.json()).subscribe((json) => {
        this.manufacturers = json.results.bindings.map((x) => {
          return {
            id: x.s.value,
            title: x.o.value,
          };
        });
      });
  }

  private loadDrivers(): void {
    this.post(`/formula-1/sparql`, `
    SELECT ?s
    WHERE
    {
      ?s <http://example.com/drives> <${this.selectedManufaturer}> .
    }`).map((r) => r.json()).subscribe((json) => {
        this.loadDriverTitles(json.results.bindings.map((x) => x.s.value));
      });
  }

  private loadDriverTitles(driverUris: string[]): void {

    this.post(`/formula-1/sparql`, `
    SELECT ?o
    WHERE
    {
      ?s <http://example.com/title> ?o .
      FILTER (?s IN (${driverUris.map((x) => `<${x}>`).join(', ')}))
    }`).map((r) => r.json()).subscribe((json) => {
        this.results = json.results.bindings.map((x) => x.o.value);
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
