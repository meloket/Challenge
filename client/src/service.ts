import axios from 'axios';

export const getAll = async () => {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/',
      headers: { }
    };

    try {
        const res = await axios(config);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const add = async (data:any) => {
    var config = {
      method: 'post',
      url: 'http://localhost:8080/add',
      headers: { },
      data: data
    };

    try {
        const res = await axios(config);
        // const res = await axios.post('http://localhost:8080/add')
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const remove = async (id:any) => {
    var config = {
      method: 'post',
      url: 'http://localhost:8080/remove',
      headers: { },
      data: {id}
    };

    try {
        const res = await axios(config);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}