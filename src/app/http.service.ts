import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService extends BaseApi {

	options: HttpHeaders;

	constructor(public http: HttpClient) {
		super(http);
		this.options = new HttpHeaders();
		this.options = this.options.set('Content-Type', 'application/json');
	}
//Получаю сами контакты, чтобы вывелись циклы на главный экран
	async getContacts() {
		return this.get('users', this.options).toPromise();
	}
	
// получаю человека по айди, нужно чтобы удалить или изменить его данные
	async getContactById(id) {
		return this.get('users/' + id, this.options).toPromise();
	}
	//добавление нового контакта
	async postContact(data) {
		return this.post('users', data, this.options).toPromise();
	}
//обновление данных
	async putContactById(id, data) {
		return this.put('users/' + id, data, this.options).toPromise();
	}
//удаляю контакт по его айди
	async deleteContactById(id) {
		return this.delete('users/' + id, this.options).toPromise();
	}
	// сохранение поля поиска и сортировки
	async getSort() {
		return this.get('sort', this.options).toPromise();
	}
	async putSort(data) {
		return this.put('sort/0', data, this.options).toPromise();
	}

	async getFilter() {
		return this.get('filter', this.options).toPromise();
	}
	async putFilter(data) {
		return this.put('filter/0', data, this.options).toPromise();
	}
}