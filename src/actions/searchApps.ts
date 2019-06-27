const query = `
query searchApps($text: String!) {
    appResults: searchApps(criteria: {type: APP, text: $text}) {
        ...pagedApps
    }
    clockResults: searchApps(criteria: {type: CLOCK, text: $text}) {
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
    previewImage(scale: 1.0) {
        uri
    }
    icon(width: 120, height: 120) {
        uri
    }
    description
    developer {
        name
    }
    name
    type
}
`;

export const t = {
    query,
    operationName: 'searchApps',
    variables: { text: 'Some search text' },
};
