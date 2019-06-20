export interface FitbitGalleryListResponseDataCollectionPagedAppsAppPreviewImage {
    uri: string;
    __typename: string;
}

export interface FitbitGalleryListResponseDataCollectionPagedAppsAppIcon {
    uri: string;
    __typename: string;
}

export interface FitbitGalleryListResponseDataCollectionPagedAppsAppDeveloper {
    name: string;
    __typename: string;
}

export interface FitbitGalleryListResponseDataCollectionPagedAppsApp {
    id: string;
    previewImage: FitbitGalleryListResponseDataCollectionPagedAppsAppPreviewImage;
    icon: FitbitGalleryListResponseDataCollectionPagedAppsAppIcon;
    description: string;
    developer: FitbitGalleryListResponseDataCollectionPagedAppsAppDeveloper;
    name: string;
    type: string;
    __typename: string;
}

export interface FitbitGalleryListResponseDataCollectionPagedApps {
    apps: FitbitGalleryListResponseDataCollectionPagedAppsApp[];
    nextPages: string[];
    prevPages: string[];
    offset: number;
    __typename: string;
}

export interface FitbitGalleryListResponseDataCollection {
    id: string;
    name: string;
    pagedApps: FitbitGalleryListResponseDataCollectionPagedApps;
    appType: string;
}

export interface FitbitGalleryListResponseData {
    collection: FitbitGalleryListResponseDataCollection;
}

export interface FitbitGalleryListResponseRoot {
    data: FitbitGalleryListResponseData;
}
