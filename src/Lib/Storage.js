import AsyncStorage from '@react-native-community/async-storage';
export default {

    //check for key
   async isLoggedIn(context){
      let isLoggedIn = await AsyncStorage.getItem('@user').then(item => {
          if(item !== null){
               let user = JSON.parse(item);
               console.log(JSON.stringify(user));
            //   return user;
            context.setState({'isLoggedIn': true}, () => {
               context.setState({'user': user});
            });
            return true;
          }else {
              console.log('does not exists');
              return false;
          }
      });  
    },

    async logout(context){
        try{
            await AsyncStorage.removeItem('@user');
            context.setState({'isLoggedOut': true});
            context.props.navigation.navigate('Auth');
            return true;
        }catch(e){
            context.setState({'isLoggedOut': false});
            alert(e);
            console.log(e);
            return false;
        }
    },

    async updateUser(context,user){
        try{
            await AsyncStorage.setItem('@user',JSON.stringify(user));
            await AsyncStorage.setItem('@username', user.name);
            console.log('From storage file: '+user.name);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },

    async returnCart(context){
        try {
            await AsyncStorage.getItem('@cart').then(item => {
                if(item != null){
                    console.log('not null');
                    context.setState({
                        'products': JSON.parse(item),
                    });
                }else {
                    console.log(' null');

                }
            
            });
            
        } catch (error) {
            console.log(error);

        }
    }


}