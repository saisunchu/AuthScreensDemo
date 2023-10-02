import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { fs, hp, wp } from "../../helpers/ResponsiveFonts";
import { Colors } from "../../helpers/colors";


const styles = StyleSheet.create({
    container: {
        flex: 1,
         paddingVertical: hp(15),
            paddingHorizontal: wp(15),
    },
    SafeAreaView: { flex: 1 },
    renderPreview: {
        // borderWidth: 1,
        flex: 1,
        width: Dimensions.get('window').width-wp(30),
        paddingVertical: hp(10),
        paddingHorizontal: wp(10),
        
    },
    skipView: {
        justifyContent: 'space-between', flexDirection: 'row', height: '5%',
        // borderWidth:1, 
    },
    nextView: {
        justifyContent: 'space-between', flexDirection: 'row', height: '100%',
        // borderWidth: 1,
        alignItems: 'center',
        // alignSelf: 'flex-end'
    },
    paginationView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:1,
        position: 'absolute',
        alignSelf: 'center',
        height: '100%'
    },
    nextViewContainor: {
        height: '10%',
        // borderWidth: 1,
        // marginTop: hp(20),
    },
    renderPreviewMiddleCont: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        height: '90%',
    },
    renderPreviewImage: {
        height:hp(300), width:wp(300),
    },
    headingText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: fs(24),
        marginBottom: hp(5),
    },
    bodyText: {
        fontFamily: 'Montserrat-Regular',
        color: Colors.PreviewBodyText,
        width: wp(340),
        textAlign: 'center',
        lineHeight: fs(20),
        fontSize: fs(14),
    },
    pageCount: {
        fontFamily: 'Montserrat-Regular',
        fontSize: fs(18),
        fontWeight: '600',
    },
    dotStyle: {
        width: wp(40),
        height: hp(12),
        borderRadius: 15,
        backgroundColor: '#17223B',
    },
     inactiveDotStyle: {
        backgroundColor: 'black',
        width: wp(12),
        height: hp(12),
    },
});
export default styles;
