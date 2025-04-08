import { createApp } from 'vue'
import { Button, Form, Field, Cell, NavBar, Popup, Picker, SubmitBar, Loading, Toast, Search, CellGroup, Tabbar, TabbarItem, Collapse, CollapseItem, Switch } from 'vant'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'vant/lib/index.css'
const app = createApp(App)
const pinia = createPinia()
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


app.mount('#app')
