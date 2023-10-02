import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {PreviewDataProps, PreviewProps} from '../../helpers/interface';
import {PreviewData} from '../../helpers/appData';
import {Colors} from '../../helpers/colors';
import {useNavigation} from '@react-navigation/native';

const Preview = (props: PreviewProps) => {
  const isCarousel = useRef(null);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const renderPreview = ({item}: {item: PreviewDataProps}) => {
    return (
      <View style={styles.renderPreview}>
        <View style={styles.renderPreviewMiddleCont}>
          <Image source={item.image} style={styles.renderPreviewImage} />
          <Text style={styles.headingText}>{item.headingText}</Text>
          <Text style={styles.bodyText}>{item.bodyText}</Text>
        </View>
      </View>
    );
  };

  const skipPress = () => {
    navigation.navigate('Login');
  };

  const getStartedPress = () => {
    setIndex(index + 1);
    if (index > 1) {
      setIndex(0);
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <View style={styles.skipView}>
          <Text style={styles.pageCount}>
            {index + 1}
            <Text style={[styles.pageCount, {color: Colors.PreviewBodyText}]}>
              /3
            </Text>
          </Text>

          {index < 2 ? (
            <Text style={styles.pageCount} onPress={skipPress}>
              Skip
            </Text>
          ) : null}
        </View>
        <Carousel
          data={PreviewData}
          renderItem={renderPreview}
          layout={'default'} // 'default', 'stack', 'tinder'
          horizontal
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          ref={isCarousel}
          onSnapToItem={index => setIndex(index)}
          firstItem={index}
        />

        <View style={styles.nextViewContainor}>
          <View style={styles.paginationView}>
            <Pagination
              dotsLength={PreviewData.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={styles.dotStyle}
              tappableDots={true}
              inactiveDotStyle={styles.inactiveDotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              containerStyle={{
                alignSelf: 'center',
              }}
            />
          </View>

          <View style={styles.nextView}>
            <Text
              style={[styles.pageCount, {color: Colors.PreviewPrev}]}
              onPress={() => setIndex(index - 1)}>
              {index == 0 ? '' : 'Prev'}
            </Text>
            <Text
              style={[styles.pageCount, {color: Colors.PreviewNext}]}
              onPress={getStartedPress}>
              {index == 2 ? 'Get Started' : 'Next'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Preview;
