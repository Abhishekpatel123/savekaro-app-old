import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, Picker, StyleSheet } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import Autocomplete from "react-native-autocomplete-input";

import config from "../../config/config";
import person from "../../icons/person.png";
import { cities as citiesData } from "../../data/cities";
import { Colors } from "../../constants/colors";
import CustomButtom from "../../helpers/CustomButtom";

const Profile = () => {
  const state = useSelector((state) => state?.user);
  const [name, setName] = useState(state?.user?.name || state?.name);
  const [phone, setPhone] = useState(
    state?.user?.phone.toString() || state?.phone.toString()
  );
  const [email, setEmail] = useState(state?.user?.email || state?.email);
  console.log(state);
  const [city, setCity] = useState(state?.user?.city || state?.city);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const update = () => {
    setLoading(true);
    axios
      .patch(
        config.updateProfile_url,
        {
          name: name,
          city: city,
          email: email,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        alert(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  // const states = ["Delhi", "UP", "Maharashtra", "Kerala"];
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  useEffect(() => {
    setCities(citiesData);
  }, []);

  const filterData = (query) => {
    setCity(query);
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, "i");
      const data = cities.filter((city) => city.City.search(regex) >= 0);
      console.log(query, filteredCities[0]?.City);
      setFilteredCities(data);
    } else {
      setFilteredCities([]);
    }
  };

  if (loading) {
    return <Spinner textContent="Loading..." visible={loading} />;
  }

  const selectCity = (value) => {
    setCity(value);
    // setValue(value);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image source={person} style={{ width: 170, height: 170 }} />
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            User Name
          </Text>
        </View>
        <View
          style={{
            margin: 20,
            borderWidth: 1,
            padding: 10,
            marginLeft: 10,
            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder="Edit Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={(e) => setName(e)}
          />
        </View>
        <View
          style={{
            margin: 20,
            marginLeft: 10,
            marginTop: -1,
          }}
        >
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            data={filteredCities}
            value={city}
            placeholder="Select city"
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={(text) => filterData(text)}
            flatListProps={{
              keyExtractor: (_, idx) => idx,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    selectCity(item.City);
                    setFilteredCities([]);
                  }}
                >
                  <Text style={styles.listText}>{item.City}</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </View>
        <View
          style={{
            margin: 20,
            borderWidth: 1,
            padding: 10,
            marginLeft: 10,
            borderRadius: 10,
            marginTop: -1,
          }}
        >
          <TextInput
            placeholder="Contact Number"
            placeholderTextColor="black"
            value={phone}
            keyboardType="number-pad"
            onChangeText={(e) => setPhone(e)}
          />
        </View>

        <View
          style={{
            margin: 20,
            borderWidth: 1,
            padding: 10,
            marginLeft: 10,
            borderRadius: 10,
            marginTop: -1,
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 0 }}>
          <CustomButtom name="submit" color={Colors.primary} onPress={update} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: "black",
    height: 400,
  },
  inputContainerStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 3,
    paddingLeft: 10,
    marginBottom: 4,
  },
  listText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
});
