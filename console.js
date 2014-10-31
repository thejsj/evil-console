var getFunction = function startEvilConsole() {
    (function () {
        // Plugin by Jorge Silva :)
        // http://thejsj.com
        var EvilConsole = function () {
            var self = this,
                __self = {};

            __self.styles = [
                '', // normal
                'color: blue;',
                'color: red; background: pink; font-size: 16px;',
                'color: red; background: teal; font-size: 24px; ',
                'color: red; background: blue; font-size: 36px; font-weight: bold;',
                'color: blue; background: green; font-size: 56px; font-weight: bold; font-family: georgia, serif;',
                'color: purple; background: green; font-size: 100px; font-weight: bold; font-style: italic; font-family: "Lucida Casual", "Comic Sans MS";',
                'color: purple; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ffff00), to(#ff00ff)); font-size: 200px; font-weight: bold; font-style: italic; font-family: "Lucida Casual", "Comic Sans MS"; text-shadow: 0.1em 0.1em #333',
                'color: white; background: white;'
            ];

            __self.count = 0;
            __self.current_style = 0;

            __self.init = function () {
                window.log = window.console.log.bind(console);
                window.console.log = function (message) {
                    window.log('%c' + message, __self.styles[__self.current_style]);
                };
                var duration = __self.setNewDuration();
                setInterval(__self.update, duration);
            };

            __self.setNewDuration = function () {
                var duration = __self.readCookie('evil-console-duration');
                if (!duration || duration < 0) {
                    duration = 2020;
                }
                duration = duration - 5;
                window.__duration__ = duration;
                __self.createCookie('evil-console-duration', duration, 7);
                return duration;
            };

            __self.update = function () {
                __self.count += 1;
                if (__self.count % 3 === 0) {
                    if (__self.current_style < __self.styles.length - 1) {
                        __self.current_style += 1;
                    }
                }
            };

            __self.createCookie = function (name, value, days) {
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                } else {
                    expires = "";
                }
                document.cookie = name + "=" + value + expires + "; path=/";
            };

            __self.readCookie = function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            };

            __self.eraseCookie = function (name) {
                __self.createCookie(name, "", -1);
            };

            __self.init();
            return self;
        };
        // Don't re-initialize this
        window.__e__ = new EvilConsole();
    }());
};
var elt = document.createElement("script");
elt.innerHTML = getFunction.toString() + '; startEvilConsole();';
document.head.appendChild(elt);