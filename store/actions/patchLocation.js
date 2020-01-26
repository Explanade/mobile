import axios from 'axios'

export const updateLocation = (payload) => {
    return (dispatch) => {
        axios({
            method: 'patch',
            url: "http://localhost:3000/user/",
            data: {
                latitude: payload.latitude,
                longitude: payload.longitude,
            },
            headers: {
                token: payload.token
            }
        })
            .then(({ data }) => {
            })
            .catch(err => {
                console.log(err);
                console.log(err, '?????');
            })
    }
}
