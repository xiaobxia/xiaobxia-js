/**
 * Created by Xbx on 2017/5/5.
 */
const R = {
    boolean(truePercent = 50) {
        return Math.ceil(Math.random() * 100) <= truePercent
    },
    time(aDate, bDate) {
        //如果一个参数也不传就返回随机时间
        if (aDate) {

        } else {
            let date = new Date().getTime()
            return new Date(this.number(date))
        }
    },
    item(items) {
        let num = Math.ceil(Math.random() * 100)
        let len = items.length
        return items[num % len]
    },
    number(end, start = 0) {
        let size = end - start;
        return Math.round((Math.random() * size) + start)
    },
    listBase(total, page, size) {
        let totalPage = Math.ceil(total / size)
        let resNum = page >= totalPage ? (total - (page - 1) * size) : size
        return {
            'resNum': resNum,
            'startIndex': (page - 1) * size,
            data: {
                'success': true,
                'page': page,
                'rowCount': resNum,
                'size': resNum,
                'totalNum': total,
                'totalPage': totalPage
            }
        }
    }
}
export default R
