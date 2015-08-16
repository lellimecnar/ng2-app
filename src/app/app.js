import {Component, View, NgFor} from 'angular2/angular2';

@Component({
	selector: 'app'
})
@View({
	templateUrl: '/app/app.html',
	directives: [NgFor]
})
export default class App {
	list = ['A', 'B', 'C', 'D'];

	constructor() {
		this.list.push('E', 'F', 'G', 'H');
	}
}
