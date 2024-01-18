import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Caraouselanimation from '../../../../components/Caraouselanimation';
import MarketPlaceCard from '../../../../components/MarketPlaceCard';
import HomeServiceCard from '../../../../components/HomeServiceCard';
import HomeShowCaseCard from '../../../../components/HomeShowCaseCard';
import CommonHomeList from '../../../../components/CommonHomeList';
import SearchBar from '../../../../components/SearchBar';
import { get_product_list } from '../../../../services/getApi';
import { GET_BANNER, MARKET_PLACE_LIST } from '../../../../services/ApiUrls';
import { useDispatch, useSelector } from 'react-redux';
import { _doGetUserInfo, _doHomeService, _doMarketPlace, _doShowCase } from '../../../../store/home/home.action';
import RoutePaths from '../../../../Navigations/RoutePaths';
import { showSnack } from '../../../../util/snack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../../constants/colors';

const Home = ({navigation}) => {
  const {isLoading, marketPlaceList, homeServiceList, showCaseList} = useSelector(state => state.home);
  const {User_mid} = useSelector(state => state.auth);
  const [bannerData, setBannerDate] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_doMarketPlace());
    dispatch(_doHomeService());
    dispatch(_doShowCase());
    if (User_mid) {
      dispatch(_doGetUserInfo(User_mid));
    }

    getBannerList();
  }, []);

  const _handleButtonClick = (item, routePath) => {
    console.log(item);
    console.log(routePath);
    navigation.navigate(routePath, {item: item});
  };

  const getBannerList = () => {
    get_product_list(GET_BANNER)
      .then(result => {
        if (result?.success) {
          setBannerDate(result?.banners);
        } else {
          showSnack(result?.msg);
        }
      })
      .catch(error => {
        showSnack(error.message);
      });
  };

  const handleSearch = searchTerm => {
    // Replace 'your-api-key' with your actual API key
    const apiKey = 'your-api-key';
    const searchUrl = `http://139.59.236.50:8080/api/search?searchTerm=${searchTerm}`;

    // Make the API call
    axios.get(searchUrl, { headers: { 'api-key': apiKey } })
      .then(response => {
        if (response.data.success) {
          setSearchResults(response.data.lid.concat(response.data.spid, response.data.pid));
        } else {
          setSearchResults([]);
          showSnack('No results found');
        }
      })
      .catch(error => {
        setSearchResults([]);
        showSnack('Error fetching search results');
      });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
          <SearchBar onSearch={handleSearch} />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              // You can implement additional logic here if needed
              console.log('Search button pressed');
            }}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {bannerData.length > 0 && <Caraouselanimation data={bannerData} />}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>MarketPlace</Text>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate(RoutePaths.CategoriesPage)}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        <CommonHomeList
          navigation={navigation}
          routePath={RoutePaths.MarketPlace}
          isHorizontal={true}
          data={marketPlaceList}
          headerTitle={'MarketPlace'}
          renderItem={(item, index) => {
            return (
              <MarketPlaceCard
                data={item.item}
                onPress={() =>
                  _handleButtonClick(item.item, RoutePaths.MarketPlaceDetails)
                }
              />
            );
          }}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Home Service</Text>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate(RoutePaths.Services)}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        <CommonHomeList
          navigation={navigation}
          routePath={RoutePaths.Services}
          isHorizontal={true}
          data={homeServiceList}
          headerTitle={'Home Service'}
          renderItem={(item, index) => {
            return (
              <HomeServiceCard
                data={item.item}
                onPress={() =>
                  _handleButtonClick(item.item, RoutePaths.ShowCaseDetails)
                }
              />
            );
          }}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>ShowCase</Text>
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate(RoutePaths.showCase)}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        </View>

        <CommonHomeList
          navigation={navigation}
          routePath={RoutePaths.showCase}
          isHorizontal={true}
          data={showCaseList}
          headerTitle={'Project ShowCase'}
          renderItem={(item, index) => {
            return (
              <HomeShowCaseCard
                data={item.item}
                onPress={() =>
                  _handleButtonClick(item.item, RoutePaths.ShowCaseDetails)
                }
              />
            );
          }}
        />

        {/* Display search results */}
        {searchResults.length > 0 && (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                if (item.lid) {
                  // Display MarketPlaceCard for items inside lid
                  return (
                    <MarketPlaceCard
                      data={item}
                      onPress={() => _handleButtonClick(item, RoutePaths.MarketPlaceDetails)}
                    />
                  );
                } else if (item.spid) {
                  // Display HomeShowCaseCard for items inside spid
                  return (
                    <HomeShowCaseCard
                      data={item}
                      onPress={() => _handleButtonClick(item, RoutePaths.ShowCaseDetails)}
                    />
                  );
                } else if (item.pid) {
                  // Display HomeServiceCard for items inside pid
                  return (
                    <HomeServiceCard
                      data={item}
                      onPress={() => _handleButtonClick(item, RoutePaths.ServiceDetails)}
                    />
                  );
                }
              }}
            />
          </View>
        )}

      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate(RoutePaths.ChattingScreen)
          console.log('Forum button pressed');
        }}>
        <Icon name="forum" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: 8,
  },
  sectionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
 padding:8
  },
  sectionTitle:{
   fontSize:16
  },
  searchButton: {
    backgroundColor: '#488C20',
    borderRadius: 5,
    marginLeft: 8,
    marginTop:10,
    padding: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.Black,
  },
  viewMoreButton: {
    fontSize: 16,
    fontWeight: '400',
    color: '#488C20',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3c9429',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#488C20',
  },
});

export default Home;