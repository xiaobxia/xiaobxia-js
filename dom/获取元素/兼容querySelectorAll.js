//IE7- fallback for missing querySelectorAll support
if (!document.querySelectorAll) {
    var s = document.createStyleSheet();
    document.querySelectorAll = function(r, c, i, j, a) {
        a = document.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
        for (i = r.length; i--;) {
            s.addRule(r[i], 'k:v');
            for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
            s.removeRule(0);
        }
        return c;
    };
}