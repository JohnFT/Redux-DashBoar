import * as fromItems from './income-egress.actions';
import { IncomeEgress } from './income-egress.models';
import { AppState } from '../app.reducer';
export interface IncomeEgressState {
    items: IncomeEgress[];
}
export interface AppState extends AppState {
    incomeEgress: IncomeEgressState;
}

const initState: IncomeEgressState = {
    items: []
};

export function IncomeEgressReducer(state = initState, actions: fromItems.actions): IncomeEgressState {
    switch (actions.type) {
        case fromItems.SET_ITEMS:
            return {
                items: actions.items.map(item => {
                    return { ...item };
                })
            };
        case fromItems.UNSET_ITEMS:
            return { items: [] };
        default:
            return state;
    }
}



