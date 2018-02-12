// Import basic libs.
import 'babel-polyfill';

// Add all components. Note that there must be at least on js file else this
// will produce errors. Also, for glob-imports we need to adjust linting.
// eslint-disable-next-line import/no-unresolved, import/extensions
import '../components/**/*.main.js';

// # Vue example usage:
// import Vue from 'vue';
// Vue.component('example', require('./Example.vue'));
// const app = new Vue({
//  el: '#vue-app'
// });
