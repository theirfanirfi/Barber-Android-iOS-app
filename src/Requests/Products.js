const BASE_URL = 'http://192.168.10.7/Ecommerce/public/api/';

export default {
    async fetchProducts(){
    try {
    let response = await fetch(BASE_URL+'getproducts');
    let responseJson = await response.json();
    return responseJson;
    }catch(error){
        console.log(error + "get products error");
    }
    },


    };