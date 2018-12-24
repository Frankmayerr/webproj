import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ServerService {
    headersToSend: Headers;
    constructor(private http: Http) {
        this.headersToSend = new Headers({'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'});
    }

    getFile(data) {
        console.log(data);
        console.log(this.headersToSend);
        return this.http.post('http://localhost:8000/getFile', data, {headers: this.headersToSend});
    }

    storeCardPayments(data) {
        console.log(typeof data);
        return this.http.post('http://localhost:8000/storeCardPayments', data, {headers: this.headersToSend});
    }

    storeRequests(data) {
        console.log(typeof data);
        return this.http.post('http://localhost:8000/storeRequests', data, {headers: this.headersToSend});
    }


    getCardPayments(): Observable<any> {
        console.log('card request done');
        return this.http.get('http://localhost:8000/cardPayments', {headers: this.headersToSend})
        .pipe(map(r => r.json()));
    }

    getRequests(): Observable<any> {
        console.log('get requests done');
        return this.http.get('http://localhost:8000/requests', {headers: this.headersToSend})
        .pipe(map(r => r.json()));
    }

    changeSecurityInfo(id) {
        console.log('change security');
        return this.http.patch('http://localhost:8000/changeSecurity', {'id': id}, {headers: this.headersToSend});
    }

    sorttable(field) {
        console.log('sortcard');
        console.log(field);
        return this.http.patch('http://localhost:8000/sortcards', {'name' : field}, {headers: this.headersToSend})
        .pipe(map(r => r.json()));
    }

    sortreq(field) {
        console.log('sortreq');
        console.log(field);
        return this.http.patch('http://localhost:8000/sortreq', {'name' : field}, {headers: this.headersToSend})
        .pipe(map(r => r.json()));
    }

    filtercard(column, value) {
        console.log('filter card!');
        return this.http.patch('http://localhost:8000/filtercard', {'column': column, 'value': value}, {headers: this.headersToSend})
        .pipe(map(r => r.json()));
    }

    filterreq(column, value) {
        console.log('filter req!');
        return this.http.patch('http://localhost:8000/filterreq', {'column': column, 'value': value}, {headers: this.headersToSend})
        .pipe(map(r => r.json()));
    }
}
