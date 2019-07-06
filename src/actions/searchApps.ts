import { FitbitGallerySearchListResponseRoot } from '../types/fitbitGalleryTypes';
import gql from 'graphql-tag';

export class SearchApps {
    public static async searchApps(
        accessToken: string,
        apiUrl: string,
        searchText: string,
    ): Promise<FitbitGallerySearchListResponseRoot> {
        const querySearch = gql`
            query searchApps($text: String!) {
                appResults: searchApps(criteria: { type: APP, text: $text }) {
                    ...pagedApps
                }
                clockResults: searchApps(
                    criteria: { type: CLOCK, text: $text }
                ) {
                    ...pagedApps
                }
            }

            fragment pagedApps on PagedApps {
                apps {
                    ...appSummary
                }
                nextPages
                prevPages
                offset
            }

            fragment appSummary on App {
                id
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
                }
                name
                type
                isPaid
            }
        `;
        const bdy = {
            query: querySearch,
            operationName: 'searchApps',
            variables: { text: searchText },
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(bdy),
        });
        const result = (await response.json()) as FitbitGallerySearchListResponseRoot;
        return result;
    }
}
