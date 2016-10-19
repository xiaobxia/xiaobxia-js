function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&amp;lt;";
            case ">":
                return "&amp;gt;";
            case "&":
                return "&amp;amp;";
            case "\"":
                return "&amp;quot;";
        }
    });
}