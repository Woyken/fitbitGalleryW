export interface App {
    name: string;
    type: string;
    developerName: string;
    previewImage: string;
    icon: string;
    id: string;
    description: string;
    isPaid: boolean;
}

export interface AppListState {
    apps: App[];
    isNextRequestOngoing: boolean;
    doesMoreItemsExist: boolean;
    nextPageId: string;
}

export const FETCH_APPLIST_NEXT_PAGE = 'FETCH_APPLIST_NEXT_PAGE';

interface FetchAppListNextPage {
    type: typeof FETCH_APPLIST_NEXT_PAGE;
    payload: {
        apps: App[];
        isNextRequestOngoing: boolean;
        doesMoreItemsExist: boolean;
        nextPageId: string;
    };
}

export type AppListActionTypes = FetchAppListNextPage;

// export interface Message {
//     user: string;
//     message: string;
//     timestamp: number;
// }

// export interface ChatState {
//     messages: Message[];
// }

// export const SEND_MESSAGE = 'SEND_MESSAGE';
// export const DELETE_MESSAGE = 'DELETE_MESSAGE';

// interface SendMessageAction {
//     type: typeof SEND_MESSAGE;
//     payload: Message;
// }

// interface DeleteMessageAction {
//     type: typeof DELETE_MESSAGE;
//     meta: {
//         timestamp: number;
//     };
// }

// export type ChatActionTypes = SendMessageAction | DeleteMessageAction;
