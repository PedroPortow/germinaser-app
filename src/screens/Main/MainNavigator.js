import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View,  TouchableOpacity, StyleSheet } from "react-native";
import Home from "./Home/Home";
import Bookings from "./Bookings/Bookings";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import CreateBookingModal from "../../components/CreateBookingModal/CreateBookingModal";
import Account from "./Account/Account";
import { Text } from '@ui-kitten/components';

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Settings Screen</Text>
  </View>
);

const TextsViewer = () => (
  <View style={{padding: 50 }}>
    <View style={textsViewerStyles.row}>
      <Text style={textsViewerStyles.text} category="h1">
        H1
      </Text>
      <Text style={textsViewerStyles.text} category="h2">
        H2
      </Text>
      <Text style={textsViewerStyles.text} category="h3">
        H3
      </Text>
      <Text style={textsViewerStyles.text} category="h4">
        H4
      </Text>
      <Text style={textsViewerStyles.text} category="h5">
        H5
      </Text>
      <Text style={textsViewerStyles.text} category="h6">
        H6
      </Text>
    </View>

    <View style={textsViewerStyles.row}>
      <Text style={textsViewerStyles.text} category="s1">
        S1
      </Text>
      <Text style={textsViewerStyles.text} category="s2">
        S2
      </Text>
    </View>

    <View style={textsViewerStyles.row}>
      <Text style={textsViewerStyles.text} category="p1">
        P1
      </Text>
      <Text style={textsViewerStyles.text} category="p2">
        P2
      </Text>
    </View>

    <View style={textsViewerStyles.row}>
      <Text style={textsViewerStyles.text} category="c1">
        C1
      </Text>
      <Text style={textsViewerStyles.text} category="c2">
        C2
      </Text>
      <Text style={textsViewerStyles.text} category="label">
        LABEL
      </Text>
    </View>
  </View>
);

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <CreateBookingModal visible={isModalVisible} onClose={toggleModal} />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#479BA7",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            background: "#fff",
          },
        }}
        initialRouteName="Home"
        backBehavior="history"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="text"
          component={TextsViewer}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Horários"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="calendar" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="ActionButton"
          component={EmptyView}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={toggleModal} />
            ),
            tabBarIcon: ({ color, size }) => (
              <Feather name="add" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Reservas"
          component={Bookings}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="archive" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Conta"
          component={Account}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </>
  );
};

const textsViewerStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    margin: 2,
  },
});

const CustomTabBarButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#479BA7",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Feather name="plus" size={30} color="#fff" />
    </View>
  </TouchableOpacity>
);

const EmptyView = () => {
  return null;
};

export default MainNavigator;
