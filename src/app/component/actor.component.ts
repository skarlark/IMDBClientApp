import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
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


    ngOnInit(): void {
        this.getActors();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    public getActors(): void {
        this.httpClient.get<Actor[]>("http://localhost:8080/actors").subscribe(response => {
            this.actors = response;
            this.dataSource = new MatTableDataSource(this.actors);
            this.dataSource.paginator = this.paginator;
        });
    }


    nextPage(event: PageEvent) {
        this.httpClient.get<Actor[]>("http://localhost:8080/actors" + "?page=" + event.pageIndex.toString() + "&size=" + (event.pageSize).toString()).subscribe(data => {
            this.actors = this.actors.concat(data);
            this.dataSource = new MatTableDataSource(this.actors);
            this.dataSource.paginator = this.paginator;
        });
    }

    public searchActorById(id: string): void {
        this.httpClient.get<Actor>("http://localhost:8080/actors" + "/" + id).subscribe(data => {
            this.actors = [];
            this.actors = this.actors.concat(data);
            this.dataSource = new MatTableDataSource(this.actors);
            this.dataSource.paginator = this.paginator;
        });
    }
}
