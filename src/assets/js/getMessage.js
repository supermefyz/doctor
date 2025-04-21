import axios from 'axios'
import config from '@/assets/json/config.json'
const url = `${config.url}/api/give_history`
const getMessage = async (id) => { 
    return axios({
        url: url,
        method: "post",
        data: {
            id: id
        },
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}
export default getMessage