import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', {  // 2nd argument allows you to format data (in this case, sort by child value 'name')
      query: {                            // nested object with query: {}
        orderByChild: 'name'
      }
    });
  }

}
