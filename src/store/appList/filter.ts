import { AppListState, App } from './types';

export interface AppListFilter {
    isPaid?: boolean;
}

export function areAppListFiltersEqual(f1: AppListFilter, f2: AppListFilter) {
    let areEqual = true;
    areEqual = f1.isPaid === f2.isPaid;
    return areEqual;
}

export function filterAppList(
    state: AppListState,
    filter: AppListFilter,
): App[] {
    const filteredApps = state.apps.filter((app) => {
        return compareAgainstFilter(app, filter);
    });
    return filteredApps;
}

function compareAgainstFilter(app: App, filter: AppListFilter): boolean {
    let validAgainstFilter = true;
    if (filter.isPaid !== undefined) {
        validAgainstFilter = app.isPaid === filter.isPaid;
    }
    return validAgainstFilter;
}
