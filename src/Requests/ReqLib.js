import Base from '../Lib/Base';
export default {
    async fetchUser(context,token){
        fetch(Base.getBaseUrl()+'user/getuser?token='+token)
        .then(res => res.json())
        .then(response => {
            if(response.isError){
                console.log(response.message);
                return false;
            }else if(response.isFound){
                context.setState({'user' : response.user});
                return true;
            }else {
                console.log(response.message);
                return false;
            }
        });
    }
}