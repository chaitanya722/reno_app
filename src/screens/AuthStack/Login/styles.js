import { StyleSheet } from "react-native";
import { moderateScale,scale ,moderateVerticalScale} from "react-native-size-matters";
export default StyleSheet.create({
  container: {
    flex: 1,
   marginTop:25
    // justifyContent:'space-between'
},


bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateVerticalScale(72),
    justifyContent: 'center',
    marginBottom:moderateVerticalScale(40)
},
textstyle :{
    fontSize:25,
    color:'#02B563',
    fontWeight:'700',
    marginLeft:20,
    // fontFamily:'Outfit'
},
inputcontainer : 

{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:30},
undercontainer : {
    width:'25%',borderBottomWidth:1,borderBottomColor:'grey'
},
passwordview : {
    flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderWidth:1,
    borderColor: 'grey',
    marginVertical: 10,
    marginHorizontal:20,
    borderRadius:5,
    height:45,
    paddingLeft:20,
    bottom:8
    
},
errorText : {
    color: 'red',
    fontSize:10,
    margin:3,
    
     bottom:14
    
}

})