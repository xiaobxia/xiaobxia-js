var getButton = function (event) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) {
        return event.button;
    } else {
        /*0：没有被按下，
        * 1：左键被按下，‘
        * 2：右键被按下，
        * 3：左键右键同时按下，
        * 4：中间键被按下，
        * 5：左键和中间键被按下，
        * 6：右键和中间键被按下，
        * 7：三个键同时按下*/
        switch (event.button) {
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
                return 0;
            case 2:
            case 6:
                return 2;
            case 4:
                return 1;
        }
    }
};