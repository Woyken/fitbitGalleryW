import { FitbitGalleryAppDetailsResponseRoot } from '../types/fitbitGalleryTypes';
import gql from 'graphql-tag';

export class AppDetails {
    public static async fetchAppDetails(
        accessToken: string,
        apiUrl: string,
        appId: string,
    ): Promise<FitbitGalleryAppDetailsResponseRoot> {
        const getAppDetails = gql`
query app($id: ID!) {
    app(id: $id) {
        ...AppDetails
    }
}

fragment AppDetails on App {
    id
    name
    availability {
        deviceTypes {
            type
            productName
        }
    }
    previewImage(scale: 1.0) {
        uri
    }
    icon(width: 120, height: 120) {
        uri
    }
    developer {
        name
        website
    }
    description
    contactUrl
    screenshots {
        uri
        width
        height
    }
    type
    categories {
        id
        name
    }
    isPaid
}
`;
        const bdy = {
            operationName: 'app',
            variables: {
                id: appId,
            },
            query: getAppDetails,
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(bdy),
        });
        const result = await response.json() as FitbitGalleryAppDetailsResponseRoot;
        return result;
    }
}
