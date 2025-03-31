import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button, Form, Field, Cell, NavBar, Popup,Picker, SubmitBar } from 'vant'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
    .use(Form)
    .use(Field)
    .use(Cell)
    .use(NavBar)
    .use(Popup)
    .use(Picker)
    .use(SubmitBar)
    

app.mount('#app')
