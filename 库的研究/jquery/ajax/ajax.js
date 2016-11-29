// Main method
var ajax= function (url, options) {

    //如果参数直接是object，说明url在对象中
    if (typeof url === "object") {
        options = url;
        url = undefined;
    }

    //促使options是一个对象
    options = options || {};

    var

        // Cross-domain detection vars
        parts,

        // Loop variable
        i,

        // URL without anti-cache param
        cacheURL,

        // Response headers as string
        responseHeadersString,

        // timeout handle
        timeoutTimer,

        // To know if global events are to be dispatched
        fireGlobals,

        transport,

        // Response headers
        responseHeaders,

        //产生一个最终的请求的信息
        s = jQuery.ajaxSetup({}, options),

        // Callbacks context
        //保存着正则表达式，用于分析文件类型
        callbackContext = s.context || s,

        // Context for global events is callbackContext if it is a DOM node or jQuery collection
        globalEventContext = s.context &&
        (callbackContext.nodeType || callbackContext.jquery) ?
            jQuery(callbackContext) :
            jQuery.event,

        // Deferreds
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),

        // Status-dependent callbacks
        statusCode = s.statusCode || {},

        // Headers (they are sent all at once)
        requestHeaders = {},
        requestHeadersNames = {},

        // The jqXHR state
        state = 0,

        // Default abort message
        strAbort = "canceled",

        // Fake xhr
        jqXHR = {
            readyState: 0,

            // Builds headers hashtable if needed
            getResponseHeader: function (key) {
                var match;
                if (state === 2) {
                    if (!responseHeaders) {
                        responseHeaders = {};
                        while ((match = rheaders.exec(responseHeadersString))) {
                            responseHeaders[match[1].toLowerCase()] = match[2];
                        }
                    }
                    match = responseHeaders[key.toLowerCase()];
                }
                return match == null ? null : match;
            },

            // Raw string
            getAllResponseHeaders: function () {
                return state === 2 ? responseHeadersString : null;
            },

            // Caches the header
            setRequestHeader: function (name, value) {
                var lname = name.toLowerCase();
                if (!state) {
                    name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                    requestHeaders[name] = value;
                }
                return this;
            },

            // Overrides response content-type header
            overrideMimeType: function (type) {
                if (!state) {
                    s.mimeType = type;
                }
                return this;
            },

            // Status-dependent callbacks
            statusCode: function (map) {
                var code;
                if (map) {
                    if (state < 2) {
                        for (code in map) {

                            // Lazy-add the new callback in a way that preserves old ones
                            statusCode[code] = [statusCode[code], map[code]];
                        }
                    } else {

                        // Execute the appropriate callbacks
                        jqXHR.always(map[jqXHR.status]);
                    }
                }
                return this;
            },

            // Cancel the request
            abort: function (statusText) {
                var finalText = statusText || strAbort;
                if (transport) {
                    transport.abort(finalText);
                }
                done(0, finalText);
                return this;
            }
        };

    // Attach deferreds
    deferred.promise(jqXHR).complete = completeDeferred.add;
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;

    // Remove hash character (#7531: and string promotion)
    // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
    // Handle falsy url in the settings object (#10093: consistency with old signature)
    // We also use the url parameter if available
    s.url = ((url || s.url || ajaxLocation) + "")
        .replace(rhash, "")
        .replace(rprotocol, ajaxLocParts[1] + "//");

    // Alias method option to type as per ticket #12004
    s.type = options.method || options.type || s.method || s.type;

    // Extract dataTypes list
    s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

    // A cross-domain request is in order when we have a protocol:host:port mismatch
    if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts &&
            (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
            (parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
            (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
        );
    }

    // Convert data if not already a string
    if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
    }

    // Apply prefilters
    inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

    // If request was aborted inside a prefilter, stop there
    if (state === 2) {
        return jqXHR;
    }

    // We can fire global events as of now if asked to
    // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
    fireGlobals = jQuery.event && s.global;

    // Watch for a new set of requests
    if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
    }

    // Uppercase the type
    s.type = s.type.toUpperCase();

    // Determine if request has content
    s.hasContent = !rnoContent.test(s.type);

    // Save the URL in case we're toying with the If-Modified-Since
    // and/or If-None-Match header later on
    cacheURL = s.url;

    // More options handling for requests with no content
    if (!s.hasContent) {

        // If data is available, append data to url
        if (s.data) {
            cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);

            // #9682: remove data so that it's not used in an eventual retry
            delete s.data;
        }

        // Add anti-cache in url if needed
        if (s.cache === false) {
            s.url = rts.test(cacheURL) ?

                // If there is already a '_' parameter, set its value
                cacheURL.replace(rts, "$1_=" + nonce++) :

                // Otherwise add one to the end
            cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
    }

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
    }

    // Set the correct header, if data is being sent
    if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
    }

    // Set the Accepts header for the server, depending on the dataType
    jqXHR.setRequestHeader(
        "Accept",
        s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
        s.accepts[s.dataTypes[0]] +
        (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
            s.accepts["*"]
    );

    // Check for headers option
    for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
    }

    // Allow custom headers/mimetypes and early abort
    if (s.beforeSend &&
        (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

        // Abort if not done already and return
        return jqXHR.abort();
    }

    // aborting is no longer a cancellation
    strAbort = "abort";

    // Install callbacks on deferreds
    for (i in {
        success: 1,
        error: 1,
        complete: 1
    }) {
        jqXHR[i](s[i]);
    }

    // Get transport
    transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

    // If no transport, we auto-abort
    if (!transport) {
        done(-1, "No Transport");
    } else {
        jqXHR.readyState = 1;

        // Send global event
        if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }

        // If request was aborted inside ajaxSend, stop there
        if (state === 2) {
            return jqXHR;
        }

        // Timeout
        if (s.async && s.timeout > 0) {
            timeoutTimer = window.setTimeout(function () {
                jqXHR.abort("timeout");
            }, s.timeout);
        }

        try {
            state = 1;
            transport.send(requestHeaders, done);
        } catch (e) {

            // Propagate exception as error if not done
            if (state < 2) {
                done(-1, e);

                // Simply rethrow otherwise
            } else {
                throw e;
            }
        }
    }

    // Callback for when everything is done
    function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified,
            statusText = nativeStatusText;

        // Called once
        if (state === 2) {
            return;
        }

        // State is "done" now
        state = 2;

        // Clear timeout if it exists
        if (timeoutTimer) {
            window.clearTimeout(timeoutTimer);
        }

        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined;

        // Cache response headers
        responseHeadersString = headers || "";

        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0;

        // Determine if successful
        isSuccess = status >= 200 && status < 300 || status === 304;

        // Get response data
        if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
        }

        // Convert no matter what (that way responseXXX fields are always set)
        response = ajaxConvert(s, response, jqXHR, isSuccess);

        // If successful, handle type chaining
        if (isSuccess) {

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                modified = jqXHR.getResponseHeader("Last-Modified");
                if (modified) {
                    jQuery.lastModified[cacheURL] = modified;
                }
                modified = jqXHR.getResponseHeader("etag");
                if (modified) {
                    jQuery.etag[cacheURL] = modified;
                }
            }

            // if no content
            if (status === 204 || s.type === "HEAD") {
                statusText = "nocontent";

                // if not modified
            } else if (status === 304) {
                statusText = "notmodified";

                // If we have data, let's convert it
            } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                isSuccess = !error;
            }
        } else {

            // We extract error from statusText
            // then normalize statusText and status for non-aborts
            error = statusText;
            if (status || !statusText) {
                statusText = "error";
                if (status < 0) {
                    status = 0;
                }
            }
        }

        // Set data for the fake xhr object
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";

        // Success/Error
        if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }

        // Status-dependent callbacks
        jqXHR.statusCode(statusCode);
        statusCode = undefined;

        if (fireGlobals) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }

        // Complete
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

        if (fireGlobals) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

            // Handle the global AJAX counter
            if (!(--jQuery.active)) {
                jQuery.event.trigger("ajaxStop");
            }
        }
    }

    return jqXHR;
};