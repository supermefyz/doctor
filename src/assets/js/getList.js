import axios from 'axios'
import config from '@/assets/json/config.json'

const url = `${config.url}/api/give_id`
const getList =async (id, page) => {
    console.log(id)
    return axios({
        url: url,
        method: "post",
        data: {
            id: id,
            page_now: page
        },
    }).then(res => {
        console.log(res);
        return res.data
    }).catch(err => {
        console.log(err)
    })
}
export default getList 