/* eslint-disable */
declare module 'vue-cal' {
  import { DefineComponent } from 'vue';
  const VueCal: DefineComponent<{}, {}, any>;
  export default VueCal;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
