const ip = '192.168.0.101';

export const getAddress = async(coords) => {
    try {
       let response = await fetch('http://'+ip+':8000/api/address', 
        {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({coords}),
            
       });
       console.log(JSON.stringify(coords));
        let responseJson = await response.json();
        return responseJson;
        console.log(responseJson)
    }catch (error) {
        console.error(error);
    }
};

export const signUp = async(data) => {
    try {
       let response = await fetch('http://'+ip+':8000/api/register',

       {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
       });
        let responseJson = await response.json();
        console.log(JSON.stringify(data));
        console.log(responseJson);
        return responseJson;
       
    }catch (error) {
        console.error(error);
    }
};

export const signIn = async(data) => {
    try {
        let response = await fetch('http://'+ip+':8000/api/login',
        {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
        });
         let responseJson = await response.json();
         console.log(JSON.stringify(data));
        console.log(responseJson);
         return responseJson;        
    }catch (error) {
        console.error(error);
    }
};

export const getUserAddressList = async(userId) => {
    try {
       let response = await fetch('http://'+ip+':8000/api/user/address/' + userId);
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    }catch (error) {
        console.error(error);
    }
};

export const getSparqlLocation = async(location) => {
    try {
       let response = await fetch('http://'+ip+':8000/api/sparql/' + location);
        let responseJson = await response;
        responseJson = responseJson.replace('php', '');
        responseJson = responseJson.json();
        console.log(responseJson);
        return responseJson;
    }catch (error) {
        console.error(error);
    }
};

export const getSearchAddress = async(digital_address) => {
    try {
       let response = await fetch('http://'+ip+':8000/api/address/' + digital_address);
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson;
    }catch (error) {
        console.error(error);
    }
};

export const getUser = async(userId) => {
    try {
       let response = await fetch('http://'+ip+':8000/api/user/' + userId);
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson;
    }catch (error) {
        console.error(error);
    }
};

export const logout = async(userId) => {
    try {
       let response = await fetch('http://'+ip+':8000/api/logout/'+userId);
        let responseJson = await response.json();
        return responseJson[0].status;
    }catch (error) {
        console.error(error);
    }
};