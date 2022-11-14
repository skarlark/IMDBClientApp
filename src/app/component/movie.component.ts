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

    public movieName: string = "";
    movieColumns: string[] = ['id', 'title', 'year'];
    movies: Movie[] = [];
    dataSource: MatTableDataSource<Movie> = new MatTableDataSource(this.movies);

    constructor(private httpClient: HttpClient) {
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;


    ngOnInit(): void {
        this.getMovies();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    public getMovies(): void {
        this.httpClient.get<Movie[]>("http://localhost:8080/movies").subscribe(response => {
            this.movies = response;
            this.dataSource = new MatTableDataSource(this.movies);
            this.dataSource.paginator = this.paginator;
        });
    }


    nextPage(event: PageEvent) {
        this.httpClient.get<Movie[]>("http://localhost:8080/movies" + "?page=" + event.pageIndex.toString() + "&size=" + (event.pageSize).toString()).subscribe(data => {
            this.movies = this.movies.concat(data);
            this.dataSource = new MatTableDataSource(this.movies);
            this.dataSource.paginator = this.paginator;
        });
    }

    public searchMovieById(id: string): void {
        this.httpClient.get<Movie>("http://localhost:8080/movies" + "/" + id).subscribe(data => {
            this.movies = [];
            this.movies.push(data);
            this.dataSource = new MatTableDataSource(this.movies);
            this.dataSource.paginator = this.paginator;
        });
    }

    public searchMovieByNameWildCard(nameWildCard: string): void {
        this.httpClient.get<Movie[]>("http://localhost:8080/movies" + "?name=" + encodeURIComponent(nameWildCard)).subscribe(data => {
            this.movies = [];
            this.movies = this.movies.concat(data);
            this.dataSource = new MatTableDataSource(this.movies);
            this.dataSource.paginator = this.paginator;
        });
    }

    public searchMovieByActorId(actorId: string): void {
        this.httpClient.get<Movie[]>("http://localhost:8080/actors/" + actorId + "/appearances").subscribe(data => {
            this.movies = [];
            this.movies = this.movies.concat(data);
            this.dataSource = new MatTableDataSource(this.movies);
            this.dataSource.paginator = this.paginator;
        });
    }
}
