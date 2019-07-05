export interface FitbitGalleryListResponseDataCollectionPagedAppsAppPreviewImage {
    uri: string;
}

export interface FitbitGalleryListResponseDataCollectionPagedAppsAppIcon {
    uri: string;
}

export interface FitbitGalleryListResponseDataCollectionPagedAppsAppDeveloper {
    name: string;
}

export interface FitbitGalleryListResponseDataCollectionPagedAppsApp {
    id: string;
    previewImage: FitbitGalleryListResponseDataCollectionPagedAppsAppPreviewImage;
    icon: FitbitGalleryListResponseDataCollectionPagedAppsAppIcon;
    developer: FitbitGalleryListResponseDataCollectionPagedAppsAppDeveloper;
    name: string;
    type: string;
    isPaid: boolean;
    availability: FitbitGalleryAppDetailsResponseAvailability;
}

export interface FitbitGalleryListResponseDataCollectionPagedApps {
    apps: FitbitGalleryListResponseDataCollectionPagedAppsApp[];
    nextPages: string[];
    prevPages: string[];
    offset: number;
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

// ---------------------------------------------------------------------------------

export interface FitbitConfigurationResponseApiConfigAuthToken {
    accessToken: string;
    expiresAt: number;
}

export interface FitbitConfigurationResponseApiConfig {
    galleryApiUrl: string;
    authToken: FitbitConfigurationResponseApiConfigAuthToken;
}

export interface FitbitConfigurationResponseRoot {
    apiConfig: FitbitConfigurationResponseApiConfig;
}

// ---------------------------------------------------------------------------------

export interface FitbitGalleryAppDetailsResponseDeviceType {
    type: string;
    productName: string;
}

export interface FitbitGalleryAppDetailsResponseAvailability {
    deviceTypes: FitbitGalleryAppDetailsResponseDeviceType[];
}

export interface FitbitGalleryAppDetailsResponsePreviewImage {
    uri: string;
}

export interface FitbitGalleryAppDetailsResponseIcon {
    uri: string;
}

export interface FitbitGalleryAppDetailsResponseDeveloper {
    name: string;
    website: string;
}

export interface FitbitGalleryAppDetailsResponseScreenshot {
    uri: string;
    width: number;
    height: number;
}

export interface FitbitGalleryAppDetailsResponseCategory {
    id: string;
    name: string;
}

export interface FitbitGalleryAppDetailsResponseApp {
    id: string;
    name: string;
    availability: FitbitGalleryAppDetailsResponseAvailability;
    previewImage: FitbitGalleryAppDetailsResponsePreviewImage;
    icon: FitbitGalleryAppDetailsResponseIcon;
    developer: FitbitGalleryAppDetailsResponseDeveloper;
    description: string;
    contactUrl: string;
    screenshots: FitbitGalleryAppDetailsResponseScreenshot[];
    type: string;
    categories: FitbitGalleryAppDetailsResponseCategory[];
    isPaid: boolean;
}

export interface FitbitGalleryAppDetailsResponseData {
    app: FitbitGalleryAppDetailsResponseApp;
}

export interface FitbitGalleryAppDetailsResponseRoot {
    data: FitbitGalleryAppDetailsResponseData;
}
