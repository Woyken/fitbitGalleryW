import { AppHeadsListState, AppHead, AppHeadsList } from './types';

export enum DeviceType {
    Ionic = 'HIGGS',
    Versa = 'MESON',
    Versa_Lite = 'GEMINI',
}

export enum AppType {
    App = 'APP',
    WatchFace = 'CLOCK',
}

export interface AppListFilter {
    isPaid?: boolean;
    appType?: AppType;
    deviceType?: DeviceType;
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
    if (filter.appType !== undefined) {
        validAgainstFilter = validAgainstFilter && app.type === filter.appType;
    }
    if (filter.deviceType !== undefined) {
        validAgainstFilter =
            validAgainstFilter &&
            app.deviceTypes.findIndex((v) => v === filter.deviceType) >= 0;
    }
    return validAgainstFilter;
}
