import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Movie } from '../model/movie';

@Component({
    selector: 'movie-component',
    templateUrl: '../template/movie.component.html',
    styleUrls: ['../app.component.css']
})

export class MovieComponent implements AfterViewInit {

    movieColumns: string[] = ['id', 'title', 'year'];
    movies: Movie[] = [];
    dataSource1: MatTableDataSource<Movie> = new MatTableDataSource(this.movies);

    constructor(private httpClient: HttpClient) {
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;


    ngOnInit(): void {
        
        
        this.getMovies();
        this.dataSource1.paginator = this.paginator;
    }

    ngAfterViewInit() {
        
    }



    public getMovies(): void {
        this.httpClient.get<Movie[]>("http://localhost:8080/movies").subscribe(response => {
            this.movies = response;
            this.dataSource1 = new MatTableDataSource(this.movies);
        });
    }


    nextPage(event: PageEvent) {
        this.httpClient.get<Movie[]>("http://localhost:8080/movies" + "?page=" + event.pageIndex.toString() + "&size=" + event.pageSize.toString()).subscribe(data => {
            this.movies = data;
            this.dataSource1 = new MatTableDataSource(this.movies);
        });
    }
}
