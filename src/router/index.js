import Vue from 'vue';
import Router from 'vue-router';
import homepage from 'components/homepage/homepage';
import links from 'components/links/links';
import todos from 'components/todos/todos';
import settings from 'components/settings/settings';

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: '/homepage'
}, {
  path: '/homepage',
  component: homepage
}, {
  path: '/links',
  component: links
}, {
  path: '/todos',
  component: todos
}, {
  path: '/settings',
  component: settings
}];

export default new Router({
  linkActiveClass: 'active',
  routes
});
