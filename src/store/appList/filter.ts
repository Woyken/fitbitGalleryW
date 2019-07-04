import { AppHeadsListState, AppHead, AppHeadsList } from './types';

export enum AppType {
    App = 'APP',
    WatchFace = 'CLOCK',
}

export interface AppListFilter {
    isPaid?: boolean;
    type?: AppType;
}

export function areAppListFiltersEqual(f1: AppListFilter, f2: AppListFilter) {
    let areEqual = true;
    areEqual = f1.isPaid === f2.isPaid;
    areEqual = f1.type === f2.type;
    return areEqual;
}

export function filterAppList(
    fullList: AppHeadsList,
    filter: AppListFilter,
): AppHead[] {
    const filteredApps = fullList.apps.filter((app) => {
        return compareAgainstFilter(app, filter);
    });
    return filteredApps;
}

function compareAgainstFilter(app: AppHead, filter: AppListFilter): boolean {
    let validAgainstFilter = true;
    if (filter.isPaid !== undefined) {
        validAgainstFilter = validAgainstFilter && app.isPaid === filter.isPaid;
    }
    if (filter.type !== undefined) {
        validAgainstFilter = validAgainstFilter && app.type === filter.type;
    }
    return validAgainstFilter;
}
