function makeParam(param, val) {
    return `${param}=${val}`;
}

function formatParams(params) {
    if (Object.keys(params).length === 0) {
        return '';
    }
    let keys = Object.keys(params);
    let paramString = '?';
    paramString += makeParam(keys[0], params[keys[0]]);
    keys = keys.slice(1);
    keys.forEach((param) => {
        paramString += `&${makeParam(param, params[param])}`;
    });
    return paramString;
}

export const makeUrl = (url, params = {}) => {
    return url + formatParams(params)
};

function getParams(url) {
    let params = {};
    const qMark = url.lastIndexOf('?');
    if(qMark !== -1){
        const paramString = url.slice(qMark+1);
        const paramArr = paramString.split('&');
        for(const param of paramArr) {
            const splitParam = param.split('=');
            params[splitParam[0]] = splitParam[1];
        }
    }
    return params;
}

function extractUrl(url) {
    const qMark = url.lastIndexOf('?');
    if(qMark !== -1) {
        return url.slice(0, qMark);
    }
    return url;
}


export function parseUrl(url) {
    let parsedUrl = {};
    parsedUrl.url = extractUrl(url);
    parsedUrl.params = getParams(url);
    return parsedUrl;
}

export function formatHeaders(authState, otherHeaders = {}) {
    let headers = {};
    if (authState.token) {
        headers['Authorization'] = authState.token;
    }
    headers = Object.assign({}, otherHeaders, headers);
    return headers;
}