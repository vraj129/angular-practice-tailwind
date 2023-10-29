import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_API } from '../shared/url';

import { UserModel } from './model/res_user_model';
import { ReqUserModel } from './model/req_user_model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<UserModel> {
    return this.http.get<UserModel>(USER_API);
  }

  addUser(userModel: ReqUserModel): Observable<any> {
    return this.http.post<any>(USER_API, userModel);
  }

  updateUserStatus(status: boolean, userId: string): Observable<any> {
    var sts = status ? 'active' : 'inactive';
    return this.http.put<any>(`${USER_API}/${userId}`, {
      status: sts,
    });
  }
}
