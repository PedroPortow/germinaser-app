import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { useUserContext } from "../../../context/UserContext";
import { Text, RoundCard, Button, Card } from "@components";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

function Account() {
  const { user, logout, isAdminOrOwner } = useUserContext();
  const navigation = useNavigation();

  console.log({isAdminOrOwner})

  return (
    <Fragment>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Olá, {user.name}!</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.roundCardsRow}>
          <RoundCard
            text={`Créditos`}
            value={user.credits}
            icon={
              <FontAwesome5
                name="coins"
                size={24}
                color="black"
                style={styles.icon}
              />
            }
          />
          <RoundCard
            text="Reservas atuais"
            value={user.credits}
            icon={
              <Ionicons
                name="calendar-number-outline"
                size={24}
                style={styles.icon}
              />
            }
          />
        </View>
        <Card>
          <Text>email: {user.email}</Text>
        </Card>
        {isAdminOrOwner && <Button style={styles.marginBottom} onPress={() => navigation.navigate('Admin')}>Área Administrador</Button>}
        <Button 
          onPress={logout} 
          style={styles.buttonBottomPos}
          icon='exit-outline'
          >
          Desconectar
        </Button>
      </View>
    </Fragment>
  );
}
const styles = StyleSheet.create({
  bottomContainer: {
    padding: 10,
  },
  buttonBottomPos: {
    marginTop: "auto",
  },
  roundCardsRow: {
    flexDirection: "row",
    gap: 16,
  },
  icon: {
    marginRight: 10,
    color: "#333",
  },
  topContainer: {
    backgroundColor: "#479BA7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 120,
  },
  topText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    marginTop: "auto",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  marginBottom: {
    marginBottom: 8
  }
});

export default Account;
