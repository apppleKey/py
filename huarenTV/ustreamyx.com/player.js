(function (p, a, c, k, e, d) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [function (e) {
            return d[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    console.log(p)
    return p
})('3 o=D;c.8(\'<2>#2j,  15, 16, 17 {J-5: 9 !e; J-b: 9 !e; K-f: -18;K-19: 1a;}</2>\');c.8(\'<2>\'+\'.1b[1c-j] {\'+\'1d-5: \'+k+\'1e !e;\'+\'}\'+\'</2>\');H 1f(m){1g.1h("14 D 1i: [1k + C], 1l 1m 1n 1o d",m)}3 I=\'<a 1p="f.1q.r=\\\'6://1x.w/?1s=1t\\\'" 1u="1v 1w" 2="1j:13; R: N;f: q;Q: q;" ><B 2="b: p;5: p; U: 9;" i="/i/Y-10-T-Z-X-W-V.11?S"></B></a>\';c.8(I);3 4=7;l{4=P(t O(\'n.n\'))}1r(1z){4=(\'22\'!=26 M.27[\'28/x-29-2a\'])}3 G=0;2b(M.2c.2d().1y(\'2f\')>-1){G=1}g.h("4: "+4);3 L="2g l 2i 25 2p, A 2t 2s: <a 2r=\'2k\' r=\'6://2q.2o.w/2n/\'>2m 2l A</a>.";g.h(\'d 2h\');3 j=t 24.d({s:y,1O:{s:y},23:{1B:1C},1D:{},1E:o,1F:"#1G",b:\'1H%\',5:k+\'\',1I:7,1J:\'6://z-u.E.F/i/1K/\',1L:"6://z-u.E.F/1M/1A-1N.1P?v=1Q",1R:L,1S:{1T:"#1U",1V:"#1W"},1X:7,1Y:7});1Z(H(){g.h("20 21");j.2e()},12);', 62, 154, '||style|var|hasFlash|height|https|false|write|none||width|document|Player|important|top|console|log|src|player|win_height_proportoionale|try|text|ShockwaveFlash|stream_pc|30px|3px|href|maxBufferLength|new|||com||30|cdn|Chrome|img||stream|frustasi|org|is_firefox|function|home_link|max|margin|player_error_message|navigator|absolute|ActiveXObject|Boolean|right|position|v2|option|outline|128|table|home|menu|tool|list|png|3000|pointer|Copy|object|embed|video|10px|left|0px|fullscreen|data|min|px|copyToClipboard|window|prompt|link|cursor|Ctrl|Playable|on|Windows|Media|onclick|location|catch|ref|ch_bt|title|Channel|List|ustreamix|indexOf|exception|rtv|debug|true|events|source|parentId|vplayer|100|disableVideoTagContextMenu|baseUrl|clappr|poster|preview|pink|hlsjsConfig|jpg|1550208050|playbackNotSupportedMessage|mediacontrol|seekbar|FF0000|buttons|FFFFFF|autoPlay|useHardwareVideoDecoder|setTimeout|Auto|Play|undefined|playback|Clappr|different|typeof|mimeTypes|application|shockwave|flash|if|userAgent|toLowerCase|play|firefox|Please|rendered|use|video_div|_blank|Google|Install|chrome|google|browser|www|target|recommended|is'.split('|'), 0, {});

// var stream_pc = stream;
// document.write('<style>#video_div,  object, embed, video {max-height: none !important; max-width: none !important; margin-top: -10px;margin-left: 0px;}</style>');
// document.write('<style>' + '.fullscreen[data-player] {' + 'min-height: ' + win_height_proportoionale + 'px !important;' + '}' + '</style>');

// function copyToClipboard(text) {
//     window.prompt("Copy stream link: [Ctrl + C], Playable on Windows Media Player", text)
// }
// var home_link = '<a onclick="top.location.href=\'https://ustreamix.com/?ref=ch_bt\'" title="Channel List" style="cursor:pointer; position: absolute;top: 3px;right: 3px;" ><img style="width: 30px;height: 30px; outline: none;" src="/src/menu-list-option-tool-home-table-128.png?v2"></img></a>';
// document.write(home_link);
// var hasFlash = false;
// try {
//     hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
// } catch (exception) {
//     hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash'])
// }
// var is_firefox = 0;
// if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
//     is_firefox = 1
// }
// console.log("hasFlash: " + hasFlash);
// var player_error_message = "Please try use different browser, Chrome is recommended: <a target='_blank' href='https://www.google.com/chrome/'>Install Google Chrome</a>.";
// console.log('Player rendered');
// var player = new Clappr.Player({
//     maxBufferLength: 30,
//     hlsjsConfig: {
//         maxBufferLength: 30
//     },
//     playback: {
//         debug: true
//     },
//     events: {},
//     source: stream_pc,
//     parentId: "#vplayer",
//     width: '100%',
//     height: win_height_proportoionale + '',
//     disableVideoTagContextMenu: false,
//     baseUrl: 'https://cdn-u.frustasi.org/src/clappr/',
//     poster: "https://cdn-u.frustasi.org/preview/rtv-pink.jpg?v=1550208050",
//     playbackNotSupportedMessage: player_error_message,
//     mediacontrol: {
//         seekbar: "#FF0000",
//         buttons: "#FFFFFF"
//     },
//     autoPlay: false,
//     useHardwareVideoDecoder: false
// });
// setTimeout(function () {
//     console.log("Auto Play");
//     player.play()
// }, 3000);


(function (p, a, c, k, e, d) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [function (e) {
            return d[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    console.log(p)
    return p
})('3 o=D;c.8(\'<2>#2j,  15, 16, 17 {J-5: 9 !e; J-b: 9 !e; K-f: -18;K-19: 1a;}</2>\');c.8(\'<2>\'+\'.1b[1c-j] {\'+\'1d-5: \'+k+\'1e !e;\'+\'}\'+\'</2>\');H 1f(m){1g.1h("14 D 1i: [1k + C], 1l 1m 1n 1o d",m)}3 I=\'<a 1p="f.1q.r=\\\'6://1x.w/?1s=1t\\\'" 1u="1v 1w" 2="1j:13; R: N;f: q;Q: q;" ><B 2="b: p;5: p; U: 9;" i="/i/Y-10-T-Z-X-W-V.11?S"></B></a>\';c.8(I);3 4=7;l{4=P(t O(\'n.n\'))}1r(1z){4=(\'22\'!=26 M.27[\'28/x-29-2a\'])}3 G=0;2b(M.2c.2d().1y(\'2f\')>-1){G=1}g.h("4: "+4);3 L="2g l 2i 25 2p, A 2t 2s: <a 2r=\'2k\' r=\'6://2q.2o.w/2n/\'>2m 2l A</a>.";g.h(\'d 2h\');3 j=t 24.d({s:y,1O:{s:y},23:{1B:1C},1D:{},1E:o,1F:"#1G",b:\'1H%\',5:k+\'\',1I:7,1J:\'6://z-u.E.F/i/1K/\',1L:"6://z-u.E.F/1M/1A-1N.1P?v=1Q",1R:L,1S:{1T:"#1U",1V:"#1W"},1X:7,1Y:7});1Z(H(){g.h("20 21");j.2e()},12);', 62, 154, '||style|var|hasFlash|height|https|false|write|none||width|document|Player|important|top|console|log|src|player|win_height_proportoionale|try|text|ShockwaveFlash|stream_pc|30px|3px|href|maxBufferLength|new|||com||30|cdn|Chrome|img||stream|frustasi|org|is_firefox|function|home_link|max|margin|player_error_message|navigator|absolute|ActiveXObject|Boolean|right|position|v2|option|outline|128|table|home|menu|tool|list|png|3000|pointer|Copy|object|embed|video|10px|left|0px|fullscreen|data|min|px|copyToClipboard|window|prompt|link|cursor|Ctrl|Playable|on|Windows|Media|onclick|location|catch|ref|ch_bt|title|Channel|List|ustreamix|indexOf|exception|rtv|debug|true|events|source|parentId|vplayer|100|disableVideoTagContextMenu|baseUrl|clappr|poster|preview|pink|hlsjsConfig|jpg|1550208050|playbackNotSupportedMessage|mediacontrol|seekbar|FF0000|buttons|FFFFFF|autoPlay|useHardwareVideoDecoder|setTimeout|Auto|Play|undefined|playback|Clappr|different|typeof|mimeTypes|application|shockwave|flash|if|userAgent|toLowerCase|play|firefox|Please|rendered|use|video_div|_blank|Google|Install|chrome|google|browser|www|target|recommended|is'.split('|'), 0, {});


var stream_pc = stream;
document.write('<style>#video_div,  object, embed, video {max-height: none !important; max-width: none !important; margin-top: -10px;margin-left: 0px;}</style>');
document.write('<style>' + '.fullscreen[data-player] {' + 'min-height: ' + win_height_proportoionale + 'px !important;' + '}' + '</style>');

function copyToClipboard(text) {
    window.prompt("Copy stream link: [Ctrl + C], Playable on Windows Media Player", text)
}
var home_link = '<a onclick="top.location.href=\'https://ustreamix.com/?ref=ch_bt\'" title="Channel List" style="cursor:pointer; position: absolute;top: 3px;right: 3px;" ><img style="width: 30px;height: 30px; outline: none;" src="/src/menu-list-option-tool-home-table-128.png?v2"></img></a>';
document.write(home_link);
var hasFlash = false;
try {
    hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
} catch (exception) {
    hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash'])
}
var is_firefox = 0;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    is_firefox = 1
}
console.log("hasFlash: " + hasFlash);
var player_error_message = "Please try use different browser, Chrome is recommended: <a target='_blank' href='https://www.google.com/chrome/'>Install Google Chrome</a>.";
console.log('Player rendered');
var player = new Clappr.Player({
    maxBufferLength: 30,
    hlsjsConfig: {
        maxBufferLength: 30
    },
    playback: {
        debug: true
    },
    events: {},
    source: stream_pc,
    parentId: "#vplayer",
    width: '100%',
    height: win_height_proportoionale + '',
    disableVideoTagContextMenu: false,
    baseUrl: 'https://cdn-u.frustasi.org/src/clappr/',
    poster: "https://cdn-u.frustasi.org/preview/rtv-pink.jpg?v=1550208050",
    playbackNotSupportedMessage: player_error_message,
    mediacontrol: {
        seekbar: "#FF0000",
        buttons: "#FFFFFF"
    },
    autoPlay: false,
    useHardwareVideoDecoder: false
});
setTimeout(function () {
    console.log("Auto Play");
    player.play()
}, 3000);
var stream_pc = stream;
document.write('<style>#video_div,  object, embed, video {max-height: none !important; max-width: none !important; margin-top: -10px;margin-left: 0px;}</style>');
document.write('<style>' + '.fullscreen[data-player] {' + 'min-height: ' + win_height_proportoionale + 'px !important;' + '}' + '</style>');

function copyToClipboard(text) {
    window.prompt("Copy stream link: [Ctrl + C], Playable on Windows Media Player", text)
}
var home_link = '<a onclick="top.location.href=\'https://ustreamix.com/?ref=ch_bt\'" title="Channel List" style="cursor:pointer; position: absolute;top: 3px;right: 3px;" ><img style="width: 30px;height: 30px; outline: none;" src="/src/menu-list-option-tool-home-table-128.png?v2"></img></a>';
document.write(home_link);
var hasFlash = false;
try {
    hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
} catch (exception) {
    hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash'])
}
var is_firefox = 0;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    is_firefox = 1
}
console.log("hasFlash: " + hasFlash);
var player_error_message = "Please try use different browser, Chrome is recommended: <a target='_blank' href='https://www.google.com/chrome/'>Install Google Chrome</a>.";
console.log('Player rendered');
var player = new Clappr.Player({
    maxBufferLength: 30,
    hlsjsConfig: {
        maxBufferLength: 30
    },
    playback: {
        debug: true
    },
    events: {},
    source: stream_pc,
    parentId: "#vplayer",
    width: '100%',
    height: win_height_proportoionale + '',
    disableVideoTagContextMenu: false,
    baseUrl: 'https://cdn-u.frustasi.org/src/clappr/',
    poster: "https://cdn-u.frustasi.org/preview/rtv-pink.jpg?v=1550208050",
    playbackNotSupportedMessage: player_error_message,
    mediacontrol: {
        seekbar: "#FF0000",
        buttons: "#FFFFFF"
    },
    autoPlay: false,
    useHardwareVideoDecoder: false
});
setTimeout(function () {
    console.log("Auto Play");
    player.play()
}, 3000);