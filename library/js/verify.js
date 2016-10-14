/*
var mmmc = {
    strLenght: {
        minlength: 1,
        maxlength: 10
    },
    tel: true,
    eail: true,
    alpAndNum: true,
    alp: true,
    num: true
};
function xVerify(object) {
    var i = true,
        objStr, minlength, maxlength, objTel, objEail, objAlpAndNum, objAlp, objNum,
        ret = {},
        inpValue = this.val();
    if (object && typeof object === "object") {
        objStr = object.strLength;
        objTel = object.tel;
        objEail = object.eail;
        objAlpAndNum = object.alpAndNum;
        objAlp = object.alp;
        objNum = object.num;

        if (objStr && typeof objStr === "object") {
            minlength = objStr.minlength ? objStr.minlength : 1;
            maxlength = objStr.maxlength ? objStr.maxlength : null;
            if (inpValue.length >= minlength) {
                ret.isStrLength = 3;
                if (inpValue.length <= maxlength) {
                    ret.isStrLength = 2;
                }
            } else {
                ret.isStrLength = 1;
            }
        }
        if (objTel && typeof objTel == "boolean") {

        }

    } else {
        i = false;
    }
}*/
