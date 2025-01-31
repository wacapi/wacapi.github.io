class WacapiWeb {
    constructor() {
        this.ctas = document.querySelectorAll('.wacapi-cta');
        this.capiurl = 'https://app.wacapi.com/web-events';
        this.init();
    }

    init() {
        if (!this.ctas) return;
        console.log('WacapiWeb initialized');
        this.ctas.forEach(cta => {
            cta.addEventListener('click', this.ctaClick.bind(this));
        });
    }

    ctaClick(e) {
        if (!e.target.href) {
            return;
        }
        e.preventDefault();
        const target = e.target;
        const fbp = this.getCookie('_fbp');
        const fbc = this.getCookie('_fbc');
        if (!fbp || !fbc) {
            return;
        }
        
        this.sendEvent(fbp, fbc, target);
    }

    sendEvent(fbp, fbc, targer) {
        const data = {
            fbp: fbp,
            fbc: fbc,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        const url = new URL(this.capiurl);
        url.search = new URLSearchParams(data).toString();
        fetch(url).then(response => {
            if (response.ok) {
                const body = response.json();
                body.then(data => {
                    if(data.creationTime) {
                        if (targer.href) {
                            const url = targer.href.replace('{{CODE}}', data.creationTime);
                            window.location.href = url;
                        }
                    }
                });
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
}

document.addEventListener('DOMContentLoaded', () => {
    new WacapiWeb();
});