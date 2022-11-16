import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from "@angular/common/http";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Actor } from '../model/actor';

@Component({
    selector: 'actor-component',
    templateUrl: '../template/actor.component.html',
    styleUrls: ['../app.component.css']
})

export class ActorComponent implements AfterViewInit {

    actorColumns: string[] = ['id', 'name'];
    actors: Actor[] = [];
    dataSource: MatTableDataSource<Actor> = new MatTableDataSource(this.actors);

    constructor(private httpClient: HttpClient) {
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;


    getHeaders(): HttpHeaders {
        return new HttpHeaders({ Authorization: 'Basic ' + sessionStorage.getItem('token') });
    }


    ngOnInit(): void {
        this.getActors();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    public getActors(): void {
        this.httpClient.get<Actor[]>("http://localhost:8080/actors", { headers: this.getHeaders() }).subscribe(response => {
            this.actors = response;
            this.dataSource = new MatTableDataSource(this.actors);
            this.dataSource.paginator = this.paginator;
        });
    }


    nextPage(event: PageEvent) {
        if ((event.pageIndex + 1) * event.pageSize > this.actors.length || (event.pageIndex + 1) * event.pageSize > this.actors.length / 2) {
            this.httpClient.get<Actor[]>("http://localhost:8080/actors" + "?page=" + event.pageIndex.toString() + "&size=" + '100', { headers: this.getHeaders() }).subscribe(data => {
                this.actors = this.actors.concat(data);
                this.dataSource = new MatTableDataSource(this.actors);
                this.dataSource.paginator = this.paginator;
            });
        }
    }

    public searchActorById(id: string): void {
        this.httpClient.get<Actor>("http://localhost:8080/actors" + "/" + id, { headers: this.getHeaders() }).subscribe(data => {
            this.actors = [];
            this.actors = this.actors.concat(data);
            this.dataSource = new MatTableDataSource(this.actors);
            this.dataSource.paginator = this.paginator;
        });
    }
}
