import { createApp } from 'vue'
import { Button, Form, Field, Cell, NavBar, Popup, Picker, SubmitBar, Loading, Toast, Search, CellGroup, Tabbar, TabbarItem, Collapse, CollapseItem, Switch, Tab, Tabs, Uploader,Tag,Icon } from 'vant'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import 'vant/lib/index.css'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(Button)
    .use(Form)
    .use(Field)
    .use(Cell)
    .use(NavBar)
    .use(Popup)
    .use(Picker)
    .use(SubmitBar)
    .use(Loading)
    .use(Toast)
    .use(Search)
    .use(CellGroup)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Collapse)
    .use(CollapseItem)
    .use(Switch)
    .use(Tab)
    .use(Tabs)
    .use(Uploader)
    .use(Tag)
    .use(Icon)


app.mount('#app')
