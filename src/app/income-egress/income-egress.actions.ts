import { Action } from '@ngrx/store';
import { IncomeEgress } from './income-egress.models';

export const SET_ITEMS = '[IncomeEgress] Set Items';
export const UNSET_ITEMS = '[IncomeEgress] Unset Items';
export const DELETE_ITEM = '[IncomeEgress] Delete Item';

export class SetItemsActions implements Action {
    readonly type = SET_ITEMS;
    constructor(public items: IncomeEgress[]) { }
}


export class UnsetItemsActions implements Action {
    readonly type = UNSET_ITEMS;
}

export class DeleteItemActions implements Action {
    readonly type = DELETE_ITEM;
    constructor(public uid: string) { }
}

export type actions = SetItemsActions | UnsetItemsActions | DeleteItemActions;
