import {Dimensions, StyleSheet} from 'react-native';
import GlobalColors from './GlobalColors';

const {width, height} = Dimensions.get('window');
const myWidth = width; //width >= height ? height : width;
const myHeight = height; //width >= height ? width : height;

const GlobalStyles = {
    smart: myWidth < 450 ? true : false,
    width: myWidth,
    height: myHeight,
    mainContainer: {
        flex: 1,
        backgroundColor: GlobalColors.light,
        paddingHorizontal: 10
    },
    listSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: GlobalColors.accentColor
    },
    textStyle: {
        color: GlobalColors.light,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flex2: {
        flex: 2
    },
    flex3: {flex: 3},
    flex1: {flex: 1},
    justifyAlignCenter: {
        // justifyContent: 'center',
        alignItems: 'center'
    },
    rowSpaceAround: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    safeAreView: {flex: 1, backgroundColor: GlobalColors.light},
    header: {
        backgroundColor: GlobalColors.mainColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        zIndex: 1
    },
    headerLeftButton: {
        backgroundColor: GlobalColors.lightGrey,
        borderRadius: 20
    },
    headerRightButton: {
        backgroundColor: GlobalColors.accentColor,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerRightButtonIcon: {
        color: GlobalColors.lightGrey
    },
    overviewListItem: {
        backgroundColor: GlobalColors.light,
        marginLeft: 0
    }
};

export default GlobalStyles;
