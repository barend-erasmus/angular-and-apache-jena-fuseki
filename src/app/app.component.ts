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

  public selectedManufaturer: string = 'MERCEDES';

  public results: any[];

  constructor(private http: Http, private el: ElementRef) {

  }

  public ngOnInit(): void {
    this.onClick_Manufaturer(this.selectedManufaturer);
  }

  public onClick_Manufaturer(manufaturer): void {
    this.selectedManufaturer = manufaturer;

    this.post(`/formula-1/sparql`, `
          SELECT ?s
          WHERE
          {
            ?s <http://example.com/drives> <ex:manufacturer/${this.selectedManufaturer}> .
          }
      `).map((r) => r.json()).subscribe((json1) => {

        ///

        this.post(`/formula-1/sparql`, `
          SELECT ?o
          WHERE
          {
            ?s <http://example.com/title> ?o .
            FILTER (?s IN (${json1.results.bindings.map((x) => `<${x.s.value}>`).join(', ')}))
          }
        `).map((r) => r.json()).subscribe((json2) => {
            this.results = json2.results.bindings.map((x) => x.o.value);
          });

        ///
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
