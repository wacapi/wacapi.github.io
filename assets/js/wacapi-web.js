class WacapiWeb {
    constructor() {
        this.ctas = document.querySelectorAll('.wacapi-cta');
        this.capiurl = 'https://app.wacapi.com/web-events';
        this.code = Math.random().toString(36).substring(7);
        this.init();
    }

    init() {
        if (!this.ctas) return;
        if(!this.getCookie('_wacapi_code')) {
            this.setCookie('_wacapi_code');
            this.prepareEvent();
        }

        this.ctas.forEach(cta => {
            const code = this.getCookie('_wacapi_code') || this.code;
            const url = cta.href.replace('{{CODE}}', code);
            cta.href = url;
        });
    }

    prepareEvent() {
        const fbp = this.getCookie('_fbp');
        const fbc = this.getCookie('_fbc');
        if (!fbp || !fbc) {
            return;
        }
        
        this.sendEvent(fbp, fbc);
    }

    sendEvent(fbp, fbc) {
        const data = {
            fbp: fbp,
            fbc: fbc,
            url: window.location.href,
            code: this.code,
            timestamp: new Date().toISOString()
        };
        const url = new URL(this.capiurl);
        url.search = new URLSearchParams(data).toString();
        fetch(url).then(response => {
            if (response.ok) {
            } else {
                console.error('Error sending event to Wacapi', response);
            }
        }).catch(error => {
            console.error('Error sending event to Wacapi', error);
        });
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    setCookie(name) {
        const date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${this.code}; expires=${date.toUTCString()}; path=/`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WacapiWeb();
});
