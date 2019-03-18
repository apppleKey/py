// 全局设置
(function () {
    if (moment) {
        // moment 设置语言
        moment.locale('zh-cn');

        // 重写calendar方法
        moment.calendarFormat = function (currentMoment, nowMoment) {
            var newCurrentMoment = moment({
                year: currentMoment.year(),
                month: currentMoment.month(),
                date: currentMoment.date(),
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            });
            var newNowMoment = moment({
                year: nowMoment.year(),
                month: nowMoment.month(),
                date: nowMoment.date(),
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            });

            var currentWeek = currentMoment.week();
            var nowWeek = nowMoment.week();
            var diffWeek = currentWeek - nowWeek;

            var diffDay = newCurrentMoment.diff(newNowMoment, 'days', true);
            if (diffDay === -1) {
                return 'lastDay';
            } else if (diffDay === 0) {
                return 'sameDay';
            } else if (diffDay === 1) {
                return 'nextDay';
            }

            if (diffWeek === -1) {
                return 'lastWeek';
            } else if (diffWeek === 0) {
                return 'thisWeek';
            } else if (diffWeek === 1) {
                return 'nextWeek';
            }

            return 'sameElse';
        };
    }

    // js-cookie
    if (Cookies) {
        Cookies.defaults = {
            expires: 300, // 过期时间为300天
        }
    }
})();

(function () {
    // 获取并判断一些userAgent
    var userAgent = {};
    (function () {
        var userAgentInfo = window.navigator.userAgent;

        userAgent.userAgentInfo = userAgentInfo;
        userAgent.isAndroid = /Android/i.test(userAgentInfo) || /Adr/i.test(userAgentInfo);
        userAgent.isIos = /\(i[^;]+;( U;)?(.+?)CPU.+Mac OS/i.test(userAgentInfo);
        userAgent.isWechat = /MicroMessenger/i.test(userAgentInfo) && /mobile/i.test(userAgentInfo);

        // Android
        if (userAgent.isAndroid) {
            userAgentInfo.match(/Android(\s?)+([\d.]+)/i);
            userAgent.version = RegExp.$2;
        }

        // Ios
        if (
            userAgent.isIos &&
            (/cpu iphone os (.*?) like mac os/i.test(userAgentInfo) || /cpu os (.*?) like mac os/i.test(userAgentInfo))
        ) {
            var regStrSaf = /os [\d._]*/gi;
            var verinfo = userAgentInfo.match(regStrSaf);
            userAgent.version = (verinfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
        }
    })()

    window.global = {
        userAgent: userAgent,
    };
})();

// 判断是不是在安卓app里面
function isAndroid(device) {
    var userDevice = device;
    console.log(userDevice);
    if (userDevice == 'android') {
        $('.mtg-comment-item_more').remove();
    }
}

// 自定义alert
function live_alert(content) {
    var msgModal = new jBox('Modal');
    msgModal.setContent('<div style="font-size:18px;margin:12px;text-align:center">' + content + '</div>').open({
        autoClose: 2000,
        minWidth: 200,
    });
}

// 加载 延时的图片
function loadDelayImg() {
    $("img.delay").each(function () {
        var self = $(this);
        self.attr('src', self.data('original'));
    })
}
// 5秒钟之后 如果没调用，那么自行调用
setTimeout(loadDelayImg, 5000);
window.vjsCreate = function () {
    loadDelayImg();
}

// 把时间戳替换成日期
function formatTime() {
    $(".formatTime").each(function () {
        var timestamp = $(this).text().trim();
        var format = $(this).attr("data-format") || 'M-D';

        if (/^\+?[1-9][0-9]{9,9}$/.test(timestamp)) {
            $(this).text(moment(timestamp * 1000).format(format));
        }
    });
}
formatTime();

// 把时间戳替换成星期
function formatWeek() {
    $(".formatWeek").each(function (index, element) {
        var $self = $(this);
        var timestamp = $self.text().trim();
        var format = $self.attr("data-format") || 'M月D日';

        if (/^\+?[1-9][0-9]{9,9}$/.test(timestamp)) {
            $self.text(
                moment(timestamp * 1000).calendar(null, {
                    sameDay: '今天',
                    thisWeek: '本ddd',
                    lastDay: '昨天',
                    lastWeek: formatOther,
                    nextDay: '明天',
                    nextWeek: '下ddd',
                    sameElse: formatOther
                })
            );
        }

        function formatOther() {
            // 如果显示日期，则去掉首播前的日期
            $self.siblings('.txt').find('.formatTime').remove();

            return format;
        }
    });
}
formatWeek();

$('.addtohomescreen').on('click', function () {
    $('.addtohomescreen').hide();
})

function episodesAnimate(partIndex) {
    $(".mtg-video-play-episodes_animate .partInfo").animate({
        scrollLeft: ($('.partInfo .selectPart').eq(partIndex).outerWidth(true) * (partIndex)) - 72
    }, 300);
}

// 设置resize时执行的函数
function setResize(cb) {
    if (window._.isFunction(cb)) {
        cb();

        window.addEventListener('resize', cb);
    } else {
        throw Error('cb is not a function!');
    }
}

/**
 * 合并对象，数组采用同名覆盖的形式
 * @param {Object} *
 * @returns {Object} 合并后对象
 */
function deepMerge() {
    return window.lodash.mergeWith.apply(undefined, Array.prototype.slice.apply(arguments).concat([function (curr, next) {
        if (window.lodash.isArray(curr)) {
            return next;
        }
    }]));
}

/**
 * 筛选出距离今天最近日期的序列号，diff值为小时
 * @param {Array} array 需要检索的对象
 * @returns {Function} forEach 格式化函数
 * 
 * ['20170813', '20180812', '20180813', '20180814', '20190813']
 * now = '20180813' return 2 当天
 * ['20170813', '20180812', '20180814', '20190813']
 * now = '20180814' return 2 如果没有当天，那么往后检索
 * ['20170813', '20180812']
 * now = '20180812' return 1 如果没有当天，并且没有大于当天的日期，那么往前检索

  var recentIndex = recent(infoList.dateList, function (curr, i) {
    return {
      diffHour: moment(curr.date, 'YYYY-MM-DD').diff(moment(), 'hours'),
      index: i,
    };
  })
  infoList.dateList[recentIndex].active = true;
  
*/

function recent(array, forEach) {
    var recentObj = null;

    var tDiffHourList = array.map(forEach)

    var After = window.lodash.filter(tDiffHourList, function (curr) {
        return curr.diffHour > -24;
    })
    if (After.length) {
        recentObj = window.lodash.minBy(After, function (curr) {
            return curr.diffHour;
        })
    }

    if (!recentObj) {
        var before = window.lodash.filter(tDiffHourList, function (curr) {
            return curr.diffHour <= -24;
        })
        if (before.length) {
            recentObj = window.lodash.maxBy(before, function (curr) {
                return curr.diffHour;
            })
        }
    }

    return recentObj.index;
}

/**
 * 获取时区的偏移值
 * @return {Number} 时区的偏移值 单位：秒
 */
function getUtcOffset() {
    return moment().utcOffset() * 60;
}

/**
 * 隔多久调用一次函数
 * 指定不重复的名称 和 时间，按照时间间隔执行回调函数
 * @params {String} name 不重复的名称，用来判断时间是否允许调用
 * @params {String} time 间隔时间  1d  24h  60m
 * @params {Boolean} isWrite 是否更新时间戳  默认：true
 * @params {Function} cb(Boolean) 回调函数
 * 
  onceInTime({
    name: 'test',
    time: '1m',
    isWrite: true,
    cb: function (onOff) {
      console.log(onOff)
    }
  })
 */
function onceInTime(args) {
    var name = args.name;
    var time = args.time;
    var isWrite = window.lodash.isBoolean(args.isWrite) ? args.isWrite : true;
    var cb = args.cb;

    // ['day', 'hour', 'minute']
    if (!window.lodash.isString(args.name)) throw new Error('name is not a string!');
    if (!window.lodash.isString(args.time)) throw new Error('time is not a string!');
    if (!window.lodash.isFunction(args.cb)) throw new Error('cb is not a function!');

    var onceInTimeStorege = localforage.createInstance({
        name: 'timestamps',
        storeName: 'onceInTime',
    })

    var dayReg = /^(\d+)d$/;
    var hourReg = /^(\d+)h$/;
    var minuteReg = /^(\d+)m$/;
    if (dayReg.test(time)) {
        time = parseFloat(time.match(dayReg)[1]) * 24 * 60 * 60 * 1000;
    } else if (hourReg.test(time)) {
        time = parseFloat(time.match(hourReg)[1]) * 60 * 60 * 1000;
    } else if (minuteReg.test(time)) {
        time = parseFloat(time.match(minuteReg)[1]) * 60 * 1000;
    } else {
        throw new Error('time value does not meet the specification!');
    }

    function setCache() {
        if (isWrite) {
            onceInTimeStorege.setItem(name, lodash.now(), function (err, val) {
                if (err) {
                    console.error(err);
                }
            })
        }
    }

    var onOff = false;
    onceInTimeStorege.getItem(name, function (err, val) {
        if (err) {
            console.error(err);
        } else {
            val = parseInt(val);

            if (val) {
                if (val < lodash.now() - time) {
                    onOff = true;
                    setCache()
                }
            } else {
                onOff = true;
                setCache()
            }
        }

        cb(onOff);
    })
} 
    // 生成二维码
    new QRCode(document.getElementById("live-qrcode"), {
        text: window.location.href,
        width: 100,
        height: 100,
        colorDark: "#1f93ea",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });


    if ($(".kan-left-tools").length != 0) {
        var tools_offsetTop_left = $(".kan-left-tools").offset().top;
        $(".kan-left-tools").css("top", tools_offsetTop_left);
    }
if ($(".kan-right-tools").length != 0) {
    var tools_offsetTop_right = $(".kan-right-tools").offset().top;
    $(".kan-right-tools").css("top", tools_offsetTop_right);
}

$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $(".kan-left-tools").addClass("kan-left-tools-fixed");
        $(".kan-right-tools").addClass("kan-right-tools-fixed");
    } else {
        $(".kan-left-tools").removeClass("kan-left-tools-fixed");
        $(".kan-right-tools").removeClass("kan-right-tools-fixed");
    }
}); 

    // 设置content的高度
    setResize(function () {
        var header = window.innerHeight || document.documentElement.clientHeight;

        $('.index-sports__content').height(header - $('#live-header').outerHeight(true) - 15);
    })

// 滚动body的时候，滚动content
$('body').on('mousewheel', function (event) {
    var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

    $('.index-sports__team').scrollTop($('.index-sports__team').scrollTop() - delta);
})

// 点击body的时间触发焦点
$('body').on('click', function (event) {
    $('.index-sports__team').focus()
})

// 设置team 球队列表的高度
setResize(function () {
    $('.index-sports__team').height($('.index-sports__wrapper').outerHeight(true) - $('#live-calendar').outerHeight(
        true) - $('.index__row-prompt').outerHeight(true));
})

// 禁止侧边栏传递滚动信息
$('#live-aside').on('mousewheel', function (event) {
    event.stopPropagation();
})

// 侧边栏的点击不激活列表焦点
$('#live-aside').on('click', function (event) {
    event.stopPropagation();
})


// 数据存放点
var pageInfo = {
    "sportsclass": [{
        "tid": 0,
        "name": "\u70ed\u95e8",
        "photo": "",
        "url": ""
    }, {
        "tid": 10417,
        "name": "\u6210\u4eba\u76f4\u64ad",
        "photo": "https:\/\/image.huaren.tv\/2019\/tv\/20190117\/6750156a40c83997d8653bb24edfb3a2.jpg",
        "url": "http:\/\/kantv.p67z.com"
    }, {
        "tid": 10241,
        "name": "NBA",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/0329694fe65805d30d6408ab5b2b8325.jpg",
        "url": ""
    }, {
        "tid": 10278,
        "name": "FIBA",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180611\/91e47c42d67776571ec3d76871c97e82.jpg",
        "url": ""
    }, {
        "tid": 10242,
        "name": "CBA",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/b032663e17723f73b889480ba15606a7.jpg",
        "url": ""
    }, {
        "tid": 10247,
        "name": "\u82f1\u8d85",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/c5a6915492eaa32b497cc80b929ce598.jpg",
        "url": ""
    }, {
        "tid": 10276,
        "name": "\u6b27\u51a0",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/ec83b257bef2d9021159aec4a17e4c79.jpg",
        "url": ""
    }, {
        "tid": 10252,
        "name": "\u897f\u7532",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/a83826e1a0d8994ebc55dfe785e3992d.jpg",
        "url": ""
    }, {
        "tid": 10251,
        "name": "\u610f\u7532",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/0880cea3366ed7a2653ac39759472162.jpg",
        "url": ""
    }, {
        "tid": 10250,
        "name": "\u5fb7\u7532",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/3e35b8bf7e5cff093c16791b779b11a1.jpg",
        "url": ""
    }, {
        "tid": 10266,
        "name": "\u6cd5\u7532",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/6c66d464771767a898b58f09e421100f.jpg",
        "url": ""
    }, {
        "tid": 10397,
        "name": "\u6b27\u8054",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20181019\/3fc98a8c7a07f2b086b08a1a0f40f31b.jpg",
        "url": ""
    }, {
        "tid": 10352,
        "name": "\u8db3\u7403\u5176\u4ed6",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180719\/37700b9b7e6b7fcccd596d77a1a38c6f.jpg",
        "url": ""
    }, {
        "tid": 10351,
        "name": "\u7bee\u7403\u5176\u4ed6",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180719\/f8b12e06b674ee07238c7a969ece9ebf.jpg",
        "url": ""
    }, {
        "tid": 10265,
        "name": "\u7efc\u5408",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/8774fb2d50f4d93894c9f1893b5abed6.jpg",
        "url": ""
    }, {
        "tid": 10248,
        "name": "\u4e2d\u8d85",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/d4bc7d3051ac89af1707d7662c65d981.jpg",
        "url": ""
    }, {
        "tid": 10263,
        "name": "\u7f51\u7403",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180602\/e8b487611a4f2b185f48790bf97b4f13.jpg",
        "url": ""
    }, {
        "tid": 10411,
        "name": "\u7535\u7ade",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20181208\/078025b69dbb5b8b6f1c476c342796a8.jpg",
        "url": ""
    }, {
        "tid": 10255,
        "name": "\u6392\u7403",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180602\/cd2a537216f45d47d78348b3bcd35283.jpg",
        "url": ""
    }, {
        "tid": 10253,
        "name": "\u7fbd\u6bdb\u7403",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180602\/a65c6ac8bc370afb696ee85168670f77.jpg",
        "url": ""
    }, {
        "tid": 10254,
        "name": "\u5175\u4e53\u7403",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180602\/bbeedb7305de7e78aa4652a178cf7009.jpg",
        "url": ""
    }, {
        "tid": 10277,
        "name": "NHL",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/ed24474591e043613054333f1f1eee25.jpg",
        "url": ""
    }, {
        "tid": 10249,
        "name": "NFL",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/c1103e4d6aec1a200556efa8ab444eee.jpg",
        "url": ""
    }, {
        "tid": 10275,
        "name": "\u4e9a\u51a0",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180530\/046697f1009c9edc369c6f1819e40288.jpg",
        "url": ""
    }, {
        "tid": 10264,
        "name": "\u68d2\u7403",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180602\/572fe896a63d5844f8bf3234710b7ad1.jpg",
        "url": ""
    }, {
        "tid": 10323,
        "name": "\u4e16\u754c\u676f",
        "photo": "https:\/\/image.huaren.tv\/2018\/tv\/20180611\/c505968156b8b4adce9209b47f983aab.jpg",
        "url": ""
    }],
    "live_enter": {
        "0": [{
            "url": "\/sportvs\/221905705643016",
            "leftGoal": "75",
            "rightGoal": "50",
            "rightBadge": "https:\/\/mat1.gtimg.com\/sports\/nba\/logo\/1602\/1.png",
            "leftBadge": "https:\/\/mat1.gtimg.com\/sports\/nba\/logo\/1602\/19.png",
            "play_status": 2,
            "alias": [],
            "livId": 101906678317002,
            "cate": "NBA\u5e38\u89c4\u8d5b",
            "time": 1549845300,
            "team": ["\u9b54\u672f ", " \u8001\u9e70"],
            "type": 1
        }, {
            "url": "\/sportvs\/221905705643017",
            "leftGoal": "29",
            "rightGoal": "16",
            "rightBadge": "https:\/\/mat1.gtimg.com\/sports\/nba\/logo\/1602\/9.png",
            "leftBadge": "https:\/\/img1.gtimg.com\/sports\/pics\/hv1\/212\/15\/2292\/149041337.png",
            "play_status": 2,
            "alias": [],
            "livId": 101906678323003,
            "cate": "NBA\u5e38\u89c4\u8d5b",
            "time": 1549848900,
            "team": ["\u70ed\u706b ", " \u52c7\u58eb"],
            "type": 1
        }, {
            "url": "",
            "leftGoal": "",
            "rightGoal": "",
            "rightBadge": "",
            "leftBadge": "",
            "play_status": 1,
            "alias": [],
            "livId": 101906678329004,
            "cate": "\u89e3\u8bf4\u5458\uff1a\u8a79\u4fca",
            "time": 1549882800,
            "team": ["\u300a\u82f1\u8d85\u7cbe\u534e\u2022\u89c2\u8a79\u300b"],
            "type": 1
        }],
        "10241": [{
            "url": "\/sportvs\/221905705643016",
            "leftGoal": "75",
            "rightGoal": "50",
            "rightBadge": "https:\/\/mat1.gtimg.com\/sports\/nba\/logo\/1602\/1.png",
            "leftBadge": "https:\/\/mat1.gtimg.com\/sports\/nba\/logo\/1602\/19.png",
            "play_status": 2,
            "alias": [],
            "livId": 101906678317002,
            "cate": "NBA\u5e38\u89c4\u8d5b",
            "time": 1549845300,
            "team": ["\u9b54\u672f ", " \u8001\u9e70"],
            "type": 1
        }, {
            "url": "\/sportvs\/221905705643017",
            "leftGoal": "29",
            "rightGoal": "16",
            "rightBadge": "https:\/\/mat1.gtimg.com\/sports\/nba\/logo\/1602\/9.png",
            "leftBadge": "https:\/\/img1.gtimg.com\/sports\/pics\/hv1\/212\/15\/2292\/149041337.png",
            "play_status": 2,
            "alias": [],
            "livId": 101906678323003,
            "cate": "NBA\u5e38\u89c4\u8d5b",
            "time": 1549848900,
            "team": ["\u70ed\u706b ", " \u52c7\u58eb"],
            "type": 1
        }],
        "10247": [{
            "url": "",
            "leftGoal": "",
            "rightGoal": "",
            "rightBadge": "",
            "leftBadge": "",
            "play_status": 1,
            "alias": [],
            "livId": 101906678329004,
            "cate": "\u89e3\u8bf4\u5458\uff1a\u8a79\u4fca",
            "time": 1549882800,
            "team": ["\u300a\u82f1\u8d85\u7cbe\u534e\u2022\u89c2\u8a79\u300b"],
            "type": 1
        }]
    }
};


deepMerge(pageInfo, {
    currentSelectedSportClass: null,
    database: {},
    dateList: [],
    offsetGrid: 0,
    watchOffsetGrid: true,
    currentDataIndex: null,
    watchCurrentDataIndex: true,
    loading: false,
    transitionTime: 500,
    advertising: {
        'pageLeft': [],
        'pageRight': []
    }
})

pageInfo.sportsclass.forEach(function (current) {
    pageInfo.database[current.tid] = {}
})

for (var key in pageInfo.live_enter) {
    if (!pageInfo.database[key]) continue;

    pageInfo.live_enter[key].forEach(function (currentInfo) {
        var dayTimestamp = moment(currentInfo.time * 1000).startOf('day').unix();

        if (!pageInfo.database[key][dayTimestamp]) {
            pageInfo.database[key][dayTimestamp] = []
        }

        pageInfo.database[key][dayTimestamp].push(currentInfo);
        pageInfo.database[key][dayTimestamp].sort(function (a, b) {
            return a.time - b.time;
        })
    });
}

// 循环生成左边列表
new Vue({
    name: 'nav',
    el: '#live-aside__nav',
    data: {
        pageInfo: pageInfo,
        live_enter: pageInfo.live_enter,
    },
    mounted: function () {
        this.selection(0);
    },
    methods: {
        selection: function (info) {
            if (info.url) {
                window.open(info.url)
            } else {
                pageInfo.sportsclass = pageInfo.sportsclass.map(function (curr) {
                    if (curr.tid === info.tid) {
                        curr.selection = true;
                    } else {
                        curr.selection = false;
                    }

                    return curr;
                })

                this.$set(pageInfo, 'currentSelectedSportClass', info.tid);
            }
        },
    },
})

// 循环生成日期
new Vue({
    name: 'calendar',
    el: '#live-calendar',
    data: {
        pageInfo: pageInfo,
        minGrid: 0,
        oneGridOffset: 0,
        transition: false,
        clickTime: null,
        more: true,
    },
    computed: {
        maxGrid: function () {
            return Math.max(0, this.pageInfo.dateList.length - 7)
        },
    },
    watch: {
        'pageInfo.currentSelectedSportClass': {
            handler: function (newVal) {
                if (window.lodash.isNumber(newVal)) {
                    var self = this;

                    this.$set(this, 'more', true);
                    this.$set(this.pageInfo, 'currentDataIndex', null);

                    this.transform();
                    this.$nextTick(function () {
                        self.initSelection();
                        self.loadDate(15);
                    })
                }
            },
            immediate: true,
        },
    },
    mounted: function () {
        this.$set(this, 'clickTime', new Date().getTime());
        this.$set(this, 'oneGridOffset', this.$refs.dateBox.getBoundingClientRect().width / 7);
    },
    methods: {
        moment: window.moment,
        transform: function () {
            this.$set(this, 'transition', false);
            var dateList = [];
            var obj = this.pageInfo.database[this.pageInfo.currentSelectedSportClass];

            for (var key in obj) {
                var date = moment(key * 1000);
                var dayTimestamp = date.startOf('day').unix();

                dateList.push({
                    selection: false,
                    date: key,
                    formatTime: date.format('MM-DD'),
                    week: date.calendar(null, {
                        sameDay: '今天',
                        thisWeek: 'ddd',
                        nextDay: '明天',
                        nextWeek: 'ddd',
                        lastDay: '昨天',
                        lastWeek: 'ddd',
                        sameElse: 'ddd'
                    }),
                });
            }

            this.$set(this.pageInfo, 'dateList', dateList);
        },
        initSelection: function () {
            if (!this.pageInfo.dateList.length) return;

            var self = this;

            var recentIndex = recent(this.pageInfo.dateList, function (curr, i) {
                return {
                    diffHour: moment(curr.date * 1000).diff(moment(), 'hours'),
                    index: i,
                };
            })
            this.selection(recentIndex);

            this.$nextTick(function () {
                self.reset(self.checkIndex(recentIndex - 3));
            })
        },
        reset: function (index) {
            var self = this;

            this.$set(this, 'transition', false);
            this.$nextTick(function () {
                // reset的时候需要强制执行offsetGrid的watch
                if (self.pageInfo.offsetGrid === index) {
                    self.$set(self.pageInfo, 'watchOffsetGrid', !self.pageInfo.watchOffsetGrid);
                } else {
                    self.$set(self.pageInfo, 'offsetGrid', index);
                }
                setTimeout(function () {
                    self.$set(self, 'transition', true);
                }, self.pageInfo.transitionTime)
            })
        },
        scroll: function (isAnimate) {
            if (!this.pageInfo.dateList.length) return;

            var self = this;
            this.$nextTick(function () {
                var time = moment(self.pageInfo.dateList[self.pageInfo.currentDataIndex].date * 1000).format('MM-DD');
                var $teamBox = $('.index-sports__team');
                var $timeList = $('.live-index-time[data-formatted-time="' + time + '"]');
                if ($timeList.length) {
                    $teamBox.animate({
                        scrollTop: $teamBox.scrollTop() + $timeList.eq(0).position().top
                    }, 200);
                }
            })
        },
        selection: function (index) {
            for (var i = 0; i < this.pageInfo.dateList.length; i++) {
                if (i === index) {
                    this.$set(this.pageInfo.dateList[i], 'selection', true);
                    // 点击需要触发watch回调，为防止index相同导致无法触发，再次使用watchCurrentDataIndex变量
                    if (this.pageInfo.currentDataIndex === i) {
                        this.$set(this.pageInfo, 'watchCurrentDataIndex', !this.pageInfo.watchCurrentDataIndex);
                    } else {
                        this.$set(this.pageInfo, 'currentDataIndex', i);
                    }
                } else {
                    this.$set(this.pageInfo.dateList[i], 'selection', false);
                }
            }
        },
        checkIndex: function (index) {
            if (index < 0) index = 0;
            if (index > this.maxGrid) index = this.maxGrid;
            return index;
        },
        slide: function (gridNum, cb) {
            if (this.clickTime + this.pageInfo.transitionTime + this.pageInfo.transitionTime > new Date().getTime()) return;
            this.$set(this, 'clickTime', new Date().getTime());

            this.$set(this.pageInfo, 'loading', true);
            var index = this.checkIndex(this.pageInfo.offsetGrid + gridNum);
            this.$set(this.pageInfo, 'offsetGrid', index);
            this.selection(index);
            this.$nextTick(function () {
                cb && cb();
            })
        },
        prev: function () {
            var self = this;

            this.slide(-7, function () {
                if (self.pageInfo.offsetGrid <= 7) {
                    self.loadDate(7);
                }
            });
        },
        next: function () {
            var self = this;

            this.slide(7);
        },
        loadDate: function (num) {
            if (!this.more) return;

            var self = this;
            var endTime = null;
            var currentSelectedSportClass = this.pageInfo.currentSelectedSportClass;

            if (this.pageInfo.dateList.length) {
                // 如果有未开始的比赛，或者历史纪录，那么使用第一个的日期做偏移值
                endTime = moment(this.pageInfo.dateList[0].date * 1000);

                // 直播存在跨天
                // 如果列表中最早的日期为三天内，那么偏移日期为明天凌晨
                if (moment().add(-3, 'day').startOf('day').isBefore(endTime)) {
                    endTime = moment().add(1, 'day').startOf('day');
                }
            } else {
                // 如果没有未开始的比赛，那么时间的默认值为第二天凌晨
                endTime = moment().add(1, 'day').startOf('day');
            }

            $.ajax({
                url: '/',
                data: {
                    num: num,
                    timeOffset: getUtcOffset(), // 偏移值，秒
                    timestamp_end: endTime.unix(),
                    formatTimestampEnd: endTime.format('YYYY-MM-DD HH:mm'),
                    sportsclass: currentSelectedSportClass,
                },
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    console.log(data)

                    if (data.status === 200) {
                        // 动画结束之后在处理数据
                        setTimeout(function () {
                            var dataListLength = data.data.data.date.length;

                            // 数据量为0时，表示没有更多了
                            if (!dataListLength) {
                                self.$set(self, 'more', false);
                                return;
                            }

                            var time = {};
                            var oldDateList = lodash.cloneDeep(self.pageInfo.dateList);

                            // 为 database 添加内容
                            data.data.data.date.forEach(function (info) {
                                var earliest = moment(info.earliest * 1000).startOf('day');
                                var latest = moment(info.latest * 1000).startOf('day');

                                var startTimestamp = earliest.unix();
                                var endTimestamp = latest.unix();

                                if (!pageInfo.database[currentSelectedSportClass][startTimestamp]) {
                                    pageInfo.database[currentSelectedSportClass][startTimestamp] = []
                                }
                                if (!pageInfo.database[currentSelectedSportClass][endTimestamp]) {
                                    pageInfo.database[currentSelectedSportClass][endTimestamp] = []
                                }

                                time[earliest.format('YYYY-MM-DD HH:mm:ss')] = true;
                                time[latest.format('YYYY-MM-DD HH:mm:ss')] = true;
                            })

                            console.log('dateList', time)

                            self.transform();
                            
                            if (self.pageInfo.currentDataIndex) {
                                // 去重
                                oldDateList.forEach(function (currentDate) {
                                    var currentFormatDate = moment(currentDate.date * 1000).format('YYYY-MM-DD HH:mm:ss');
                                    if (time[currentFormatDate]) delete time[currentFormatDate];
                                })
                                // 判断需要增加的长度
                                var addDataLength = lodash.keys(time).length;

                                self.selection(self.pageInfo.currentDataIndex + addDataLength);
                                self.reset(self.checkIndex(self.pageInfo.offsetGrid + addDataLength));
                            } else {
                                // 进入页面时没有内容 currentDataIndex 为 null，选择离当前最近的一天
                                var recentIndex = recent(self.pageInfo.dateList, function (curr, i) {
                                    return {
                                        diffHour: moment(curr.date * 1000).diff(moment(), 'hours'),
                                        index: i,
                                    };
                                })
                                self.selection(recentIndex);
                                self.reset(self.checkIndex(recentIndex - 3));
                            }
                        }, self.pageInfo.transitionTime)
                    }
                },
                error: function (error) {
                    console.log(error)
                    live_alert('获取数据失败，请刷新重试!');
                }
            })
        },
    }
});

// 循环生成当前球队信息
new Vue({
    name: 'team',
    el: '.index-sports__team',
    data: {
        pageInfo: pageInfo,
        dataList: {},
        loadingDataList: false,
    },
    watch: {
        'pageInfo.currentSelectedSportClass': function () {
            this.$nextTick(function () {
                $('.index-sports__team').scrollTop(0)
            })
        },
        'pageInfo.offsetGrid': function (newOffsetGrid) {
            this.loadData(
                this.pageInfo.dateList.slice(newOffsetGrid, newOffsetGrid + 7),
                this.handleDataList
            );
        },
        // watchOffsetGrid 变动，表示currentSelectedSportClass变动但是offsetGrid未变动，此时也需要调用loadData加载数据
        'pageInfo.watchOffsetGrid': function () {
            this.loadData(
                this.pageInfo.dateList.slice(this.pageInfo.offsetGrid, this.pageInfo.offsetGrid + 7),
                this.handleDataList
            );
        },
        'pageInfo.currentDataIndex': function () {
            this.scrollToCurrent();
        },
        // watchCurrentDataIndex 变动，表示需要执行currentDataIndex回调
        'pageInfo.watchCurrentDataIndex': function () {
            this.scrollToCurrent();
        },
        'pageInfo.loading': function (newVal) {
            if (newVal) this.scrollToTop();
        }
    },
    methods: {
        moment: window.moment,
        /**
         * 用来判断需要的数据列表是否存在，如果全部存在，那么return false，不执行ajax。
         */
        hasNeedData: function (dateList) {
            for (var i = 0; i < dateList.length; i++) {
                if (!this.pageInfo.database[this.pageInfo.currentSelectedSportClass][dateList[i].date].length) return true;
            }

            return false;
        },
        loadData: function (dateList, cb) {
            var startTime = moment(dateList[0].date * 1000);
            var endTime = moment(dateList[dateList.length - 1].date * 1000).add('day', 1);

            // 如果所有数据都已存在
            if (!this.hasNeedData(dateList)) {
                cb && cb();
                return false;
            }

            if (this.loadingDataList) return;
            this.$set(this, 'loadingDataList', true);

            var self = this;
            var currentSelectedSportClass = this.pageInfo.currentSelectedSportClass;

            var options = {
                timeOffset: getUtcOffset(),
                timestamp_start: startTime.unix(),
                formatTimestampEndStart: startTime.format('YYYY-MM-DD HH:mm'),
                timestamp_end: endTime.unix(),
                formatTimestampEnd: endTime.format('YYYY-MM-DD HH:mm'),
                sportsclass: currentSelectedSportClass,
            }

            $.ajax({
                url: '/',
                data: options,
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    console.log(data)

                    if (data.status === 200) {
                        var time2 = {};
                        var time3 = {};

                        for (var key in data.data.data.live_enter) {
                            var isContinue = true;

                            data.data.data.live_enter[key].forEach(function (currentAddInfo) {
                                var dayTimestamp = moment(currentAddInfo.time * 1000).startOf('day').unix();
                                var currentDataList = self.pageInfo.database[currentSelectedSportClass][dayTimestamp];

                                if (currentDataList) {
                                    var isExist = false;

                                    if (currentDataList.length) {
                                        isExist = lodash.find(currentDataList, function (currentOldInfo) {
                                            return currentOldInfo.time == currentAddInfo.time &&
                                                currentOldInfo.team[0] === currentAddInfo.team[0] &&
                                                currentOldInfo.team[1] === currentAddInfo.team[1];
                                        })
                                    }

                                    if (isExist) {
                                        isContinue = false;
                                    } else {
                                        currentDataList.push(currentAddInfo);
                                        currentDataList.sort(function (a, b) {
                                            return a.time - b.time;
                                        })
                                    }
                                }

                                time2[moment(dayTimestamp * 1000).format('YYYY-MM-DD HH:mm:ss')] = true;
                                time3[moment(currentAddInfo.time * 1000).format('YYYY-MM-DD HH:mm:ss')] = true;
                            })
                        }

                        // for (var i = 0; i < dateList.length; i++) {
                        //   if (!self.pageInfo.database[currentSelectedSportClass][dateList[i].date].length) {
                        //     self.pageInfo.database[currentSelectedSportClass][dateList[i].date].push({
                        //       "url": "/sportvs/221842227294055",
                        //       "leftGoal": "",
                        //       "rightGoal": "",
                        //       "rightBadge": "http://mat1.gtimg.com/sports/CBAlogo/shanghai.png",
                        //       "leftBadge": "http://mat1.gtimg.com/sports/CBAlogo/guangsha.png",
                        //       "play_status": 1,
                        //       "alias": [],
                        //       "cate": "CBA\u5e38\u89c4\u8d5b",
                        //       "time": dateList[i].date,
                        //       "team": ["\u5e7f\u53a6 ", " \u4e0a\u6d77"],
                        //       "type": 1
                        //     })
                        //   }
                        // }

                        console.log(time2);
                        console.log(time3);
                    }
                },
                error: function (error) {
                    console.log(error);
                    live_alert('获取数据失败!');
                },
                complete: function () {
                    self.$set(self, 'loadingDataList', false);
                    self.$nextTick(function () {
                        cb && cb();
                    });
                },
            })
        },
        handleDataList: function () {
            var self = this;
            var totalData = this.pageInfo.database[this.pageInfo.currentSelectedSportClass];
            var dataList = {};

            for (var i = 0; i < 7; i++) {
                var data = this.pageInfo.dateList[this.pageInfo.offsetGrid + i];

                if (data && data.date && totalData[data.date].length) {
                    dataList[data.date] = totalData[data.date]
                }
            }

            this.$set(this, 'dataList', dataList);
            this.$nextTick(function () {
                setTimeout(function () {
                    self.$set(self.pageInfo, 'loading', false);

                    self.$nextTick(function () {
                        self.scrollToCurrent();
                    })
                }, self.pageInfo.transitionTime)
            })
        },
        scrollToCurrent: function () {
            if (!this.pageInfo.dateList || !this.pageInfo.dateList.length || !this.pageInfo.currentDataIndex) return false;

            var time = moment(this.pageInfo.dateList[this.pageInfo.currentDataIndex].date * 1000).format('MM-DD');
            var $teamBox = $('.index-sports__team');
            var $timeList = $('.live-index-time[data-formatted-time="' + time + '"]');
            if ($timeList.length) {
                $teamBox.animate({
                    scrollTop: $teamBox.scrollTop() + $timeList.eq(0).position().top
                }, 200);
            }
        },
        scrollToTop: function () {
            var $teamBox = $('.index-sports__team');
            $teamBox.scrollTop(0);
        },
        getStatus: function (status) {
            switch (parseInt(status)) {
                case 1:
                    return {
                        text: '未开始',
                        class: 'notstart'
                    }
                case 2:
                    return {
                        text: '比赛中',
                        class: 'play'
                    }
                default:
                    return {
                        text: '已结束',
                        class: ''
                    }
            }
        },
    },
})

// 广告
new Vue({
    name: 'advertising',
    el: '.live-client__fixed',
    data: {
        advertising: pageInfo.advertising,
    },
})

// 刷新保留当前选中状态
var id_array = [];
for (var id in pageInfo.sportsclass) {
    id_array.push(id);
}
var url_hash = window.location.hash.replace('#', '');
if (url_hash != '' && window.lodash.includes(id_array, url_hash)) {
    $('#live-aside__nav .live-aside__nav-item[data-id=' + url_hash + ']').click();
} else {
    $('#live-aside__nav .live-aside__nav-item').eq(0).click();
}

// 广告 .s
var ad_pop = [];
var cookiesName = 'adPoptemp';

if (bowser.osname == 'iOS' || bowser.osname == 'macOS') {
    if (ad_pop.mac_iphone != undefined) {
        cookiesName = String(ad_pop.mac_iphone._id);
    }
} else if (bowser.osname == 'Android') {
    if (ad_pop.android != undefined) {
        cookiesName = String(ad_pop.android._id);
    }
} else {
    if (ad_pop.windows != undefined) {
        cookiesName = String(ad_pop.windows._id);
    }
}

function setAd_pop() {
    if (bowser.osname == 'iOS' || bowser.osname == 'macOS') {
        // iOS,macOS   TV
        if (ad_pop.mac_iphone == undefined) {
            $('#modal-layer').remove();
        } else {
            $('#modal-layer a').attr('href', ad_pop.mac_iphone.url);
            $('#modal-layer .layer-box-img').attr('src', ad_pop.mac_iphone.photo);
            if (ad_pop.mac_iphone.butn != '') {
                $('#modal-layer .layer-box-action-close').html('<span>' + ad_pop.mac_iphone.butn + '</span>');
            }
        }
    } else if (bowser.osname == 'Android') {
        //andriod  TV
        if (ad_pop.android == undefined) {
            $('#modal-layer').remove();
        } else {
            $('#modal-layer a').attr('href', ad_pop.android.url);
            $('#modal-layer .layer-box-img').attr('src', ad_pop.android.photo);
            if (ad_pop.android.butn != '') {
                $('#modal-layer .layer-box-action-close').html('<span>' + ad_pop.android.butn + '</span>');
            }
        }
    } else {
        // windows  APP
        if (ad_pop.windows == undefined) {
            $('#modal-layer').remove();
        } else {
            $('#modal-layer a').attr('href', ad_pop.windows.url);
            $('#modal-layer .layer-box-img').attr('src', ad_pop.windows.photo);
            if (ad_pop.windows.butn != '') {
                $('#modal-layer .layer-box-action-close').html('<span>' + ad_pop.windows.butn + '</span>');
            }
        }
    }
}

if (Cookies.get(cookiesName) != 'true') {
    onceInTime({
        name: 'indexLayer',
        time: '12h',
        cb: function (onOff) {
            if (onOff) {
                $('#modal-layer img').ready(function () {
                    $('#modal-layer').fadeIn();
                });
                setAd_pop();
            } else {
                $('#modal-layer').remove();
            }
        }
    })
}

$('#modal-layer').on('click touchend', '.layer-box-close', function () {
    $('#modal-layer').fadeOut();
});

$('#modal-layer').on('click touchend', '.layer-box-action-close', function () {
    Cookies.set(cookiesName, true);
    $('#modal-layer').fadeOut();
});
// 广告 .e