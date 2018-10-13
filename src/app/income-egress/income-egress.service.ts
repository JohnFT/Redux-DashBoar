import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeEgress } from './income-egress.models';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsActions, UnsetItemsActions } from './income-egress.actions';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class IncomeEgressService {

  public incomeEgressSubcription: Subscription = new Subscription();
  public incomeEgressItemsSubcription: Subscription = new Subscription();

  constructor(private _afDB: AngularFirestore, private _authService: AuthService,
    private _store: Store<AppState>) { }

  public initIncomeEgressListener() {
    this.incomeEgressSubcription = this._store.select('auth')
      .pipe(
        filter(auth => !!auth.user)
      )
      .subscribe(auth => {
        this.incomeEgressItems(auth.user.uid);
      });
  }

  private incomeEgressItems(uid: string) {
    this.incomeEgressItemsSubcription = this._afDB.collection(`${uid}/income-egress/items`)
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((incomeEgress: any) => {
        this._store.dispatch(new SetItemsActions(incomeEgress));
      });
  }

  public createIncomeEgress(incomeEgress: IncomeEgress) {
    const user = this._authService.getUser();
    return this._afDB.doc(`${user.uid}/income-egress`)
      .collection('items').add({ ...incomeEgress });
  }
  public delteIncomeEgress(uid: string) {
    const user = this._authService.getUser();
    return this._afDB.doc(`${user.uid}/income-egress/items/${uid}`)
      .delete();
  }

  public unsubscription() {
    this.incomeEgressSubcription.unsubscribe();
    this.incomeEgressItemsSubcription.unsubscribe();
    this._store.dispatch(new UnsetItemsActions());
  }

}
