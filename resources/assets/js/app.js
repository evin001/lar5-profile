
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#app',
    data: {
        userName: '',
        userEmail: '',
        userPhone: '',
        userPassword: '',
        messages: [],
    },
    methods: {
        getProfile() {
            var self = this;

            window.axios.get('/user/profile')
                .then(function (response) {
                    if ('data' in response) {
                        self.userName = response.data.name;
                        self.userEmail = response.data.email;
                        self.userPhone = response.data.phone;
                    }
                })
                .catch(function (error) {
                    alert(error.data);
                });
        },
        save() {
            let self = this;

            if (!self.userEmail && !self.userName) {
                return;
            }

            self.messages = [];

            window.axios.post('/user/profile', {
                name: self.userName,
                email: self.userEmail,
                phone: self.userPhone,
                password: self.userPassword
            })
                .then(response => {
                    self.messages.push(response.data['message']);
                })
                .catch(error => {
                    let errors = error.response.data;

                    for (let errorsField in errors) {
                        errors[errorsField].forEach(function (item) {
                            self.messages.push(item);
                        });
                    }
                });
        }
    }
});

app.getProfile();
