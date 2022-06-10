export default class Form {
    form : any;
    submitBtn: any ;
    config = {
        selector: '', // should be class name
        message: {
            selector: '', // should be id
            onSuccess:'',  // message to show after form submission
            onFail:''
        }
    }

    constructor(init: any) {
        Object.assign(this.config, init);
    }

    initialize() {
        if(this.config && this.config.selector) {
            this.form = document.querySelector(`.${this.config.selector}`);
            this.submitBtn = this.form.querySelector('[type="submit"]');
            this.createEventListener();
        } else {
            console.log("please pass config as agr while initialize the class ")
        }
    }


    createEventListener() {
        this.form.addEventListener('submit', (event: any) => {
            event.preventDefault();
            this.submitForm();
        });
    }

    fetchOrResetFormFieldsValue(fetch = true) {
        let formData:any = {};
        for (let i = 0; i < this.form.length; i++) {
            let element = this.form[i];
            if (element.name !== "" && fetch) {
                formData[element.name] = element.value;
            } else {
                element.value = '';
            }
        }
        return formData
    }

    submitForm() {
        this.submitBtn.innerHTML = 'Please Wait...';
        let data:any = this.fetchOrResetFormFieldsValue(true);
        this.sendData('POST', data);
    }

    showMessageOther(value: string) {
        let temp:any;
        if(this.config.message.selector) {
            temp = document.getElementById(this.config.message.selector);
            temp.innerHTML = value;
        } else {
            temp = document.createElement('div');
            temp.style.color = 'red';
            temp.innerText = value;
            this.form.insertAdjacentElement("afterend", temp);
        }
        this.submitBtn.innerHTML='SEND EMAIL';
        this.fadeOutEffect(temp);
    }

    sendData(method='get', data: object) {
        let prepareAPi: any = {
            headers: {'Content-Type': 'application/json'},
            method: method
        }
        if(method !== 'get' && data) {
            prepareAPi.body = JSON.stringify(data);
        }
        fetch(this.form.action, prepareAPi)
            .then()
            .then(() => {
                this.showMessageOther(this.config.message.onSuccess);
                this.fetchOrResetFormFieldsValue(false);
                this.submitBtn.innerHTML = 'SUBMITTED';
                setTimeout(() => {
                    this.submitBtn.innerHTML = 'SEND EMAIL';
                }, 5000);
            }).catch(() => {
            this.submitBtn.innerHTML = 'SEND EMAIL';
            this.showMessageOther(this.config.message.onFail);
        });

    }

    fadeOutEffect(temp: any) {
            let fadeTarget = temp;
            let fadeEffect = setInterval(function () {
                if (!fadeTarget.style.opacity) {
                    fadeTarget.style.opacity = "1";
                }
                if (fadeTarget.style.opacity > "0") {
                    fadeTarget.style.opacity -= 0.1;
                } else {
                    clearInterval(fadeEffect);
                    fadeTarget.remove();
                }
            }, 300);
    }
}

