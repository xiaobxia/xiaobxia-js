var ajaxSettings = {
    url: ajaxLocation,
    type: "GET",
    isLocal: rlocalProtocol.test(ajaxLocParts[1]),
    global: true,
    processData: true,
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    /*
     timeout: 0,
     data: null,
     dataType: null,
     username: null,
     password: null,
     cache: null,
     throws: false,
     traditional: false,
     headers: {},
     */

    accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
    },

    contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
    },

    responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
    },

    // Data converters
    // Keys separate source (or catchall "*") and destination types with a single space
    converters: {

        // Convert anything to text
        "* text": String,

        // Text to html (true = no transformation)
        "text html": true,

        // Evaluate text as a json expression
        "text json": jQuery.parseJSON,

        // Parse text as xml
        "text xml": jQuery.parseXML
    },

    // For options that shouldn't be deep extended:
    // you can add your own custom options here if
    // and when you create one that shouldn't be
    // deep extended (see ajaxExtend)
    flatOptions: {
        url: true,
        context: true
    }
};