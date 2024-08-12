class AjaxCaller {
    constructor() {

    }

    async performCall(method, url, content, dataType = 'json', contentType = 'application/json') {
        try {
            console.log('running ajax call for url: ', url);
            const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    type: method,
                    data: JSON.stringify(content),
                    dataType: dataType,
                    contentType: contentType,
                    success: resolve,
                    error: reject
                })
            })

            return data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}