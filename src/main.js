import { createApp } from 'vue'
import { Button, Form, Field, Cell, NavBar, Popup, Picker, SubmitBar, Loading, Toast, Search } from 'vant'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
const app = createApp(App)

app.use(router)
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

app.mount('#app')
