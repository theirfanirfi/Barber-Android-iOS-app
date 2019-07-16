import React, { Component } from 'react'
import MainToolbar from '../Toolbar/MainToolbar';
import LoadProduct from './LoadProduct';
import ProductNotFound from '../NotFound/ProductNotFound';
import {View,Platform} from 'react-native';
import Base from '../../Lib/Base';
import Button from 'apsl-react-native-button'



export default class Product extends Component {
    state = {
        product_name: 'Product',
        product: {
            // product_id: '',
            // product_name: '',
            // product_price: '',
            // product_image: {uri: ''},
        }
    }

    static navigationOptions = {
        headerTitle: 'Product',
        // headerRight: (
        //   <Button
        //     onPress={() => alert('This is a button!')}
        //     title="Info"
        //     color="#000"
        //   >working</Button>
        // ),
      }

    async componentDidMount(){
        let BASE_URL = Base.getBaseUrl();
        let id = this.props.navigation.getParam('product_id');
        console.log(id)
        return fetch(BASE_URL+'product/'+id).then(response => response.json()).then((res) => {
            if(res.isError){
                alert(res.message);
            }else if(res.isFound){
                this.setState({product: res});
            }else {
                alert(res.message);
            }

            console.log(res);
            console.log("Product: "+this.state.product);
        });
    }


    render() {
        const osBasedToolbar = Platform.OS === 'android' ? <MainToolbar title="Product" /> : <MainToolbar title="Product" />;
        const loadProduct = this.state.product.isFound == true ? <LoadProduct product={this.state.product.product} /> : <ProductNotFound />;
        return (

            <View>
                {/* {osBasedToolbar} */}
                {loadProduct}
            </View>
        )
    }
}



