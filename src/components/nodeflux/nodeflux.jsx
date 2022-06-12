const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

// post request for getting the authorization key for nodeflux itself
export const nodeflux_auth = async () => {
    return await fetch("https://backend.cloud.nodeflux.io/auth/signatures", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "access_key": ACCESS_KEY,
            "secret_key": SECRET_KEY
        })
    }).then(response => {
        console.log(response.text());
        return response.json();
    }).then(authorization => {
        const DATE = authorization.headers['x-nodeflux-timestamp'].slice(0, 8)
        const TOKEN = authorization.token
        return {
            "auth_key": `NODEFLUX-HMAC-SHA256 Credential=${ACCESS_KEY}/${DATE}/nodeflux.api.v1beta1.ImageAnalytic/StreamImageAnalytic, SignedHeaders=x-nodeflux-timestamp, Signature=${TOKEN}`,
            "timestamp": authorization.headers['x-nodeflux-timestamp']
        }
    })
}


// post request for face matching with 2 images
export const nodefluxFaceMatch = async (authorization = null, register_face, db_face) => {
    let auth;

    if (authorization) {
        auth = {
            "auth_key": authorization.auth_key,
            "timestamp": authorization.timestamp
        }
    } else {
        auth = await nodeflux_auth()
    }

    return fetch("https://api.cloud.nodeflux.io/v1/analytics/face-match", {
        method: "POST",
        headers: {
            "authorization": auth.auth_key,
            "x-nodeflux-timestamp": auth.timestamp,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "additional_params": {
                  "similarity_threshold": 0.85,
                  "auto_orientation": false
              },
            "images": [
              register_face,
              db_face
            ]
          })
    }).then(response => {
        return response.json()
    }).then(result => {
        return { "response": result, "auth_key": auth.auth_key, "timestamp": auth.timestamp }
    }).catch(e => { console.log(e) })
}