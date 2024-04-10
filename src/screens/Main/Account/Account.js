import { StyleSheet, View } from 'react-native'
import { Text, RoundCard, Button, Card } from '@components'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Divider } from '@ui-kitten/components'
import { ROLES_LABEL } from '@constants'
import { useUserContext } from '../../../context/UserContext'

function Account() {
  const { user, logout, isAdminOrOwner } = useUserContext()
  const navigation = useNavigation()

  return (
    <>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Olá, {user.name}!</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Card style={styles.userInfo}>
          <Section label="Nome">{user.name}</Section>
          <Section label="Email">{user.email}</Section>
          <Section label="Cargo">{ROLES_LABEL[user.role]}</Section>
          <Divider />
          <View style={styles.contentRow}>
            <View style={styles.labelContentColumn}>
              <Text style={styles.label}>Reservas Ativas</Text>
              <Text style={styles.userDataText}>{user.active_bookings_count}</Text>
            </View>
            <View style={styles.labelContentColumn}>
              <Text style={styles.label}>Total de reservas</Text>
              <Text style={styles.userDataText}>{user.active_bookings_count}</Text>
            </View>
          </View>
          <View style={styles.labelContentColumn}>
            <Text style={styles.label}>Reservas Canceladas</Text>
            <Text style={styles.userDataText}>{user.canceled_bookings_count}</Text>
          </View>
        </Card>
        {isAdminOrOwner && (
          <Button style={styles.marginBottom} onPress={() => navigation.navigate('Admin')}>
            Área Administrador
          </Button>
        )}
        <Button onPress={logout} style={styles.buttonBottomPos} icon="exit-outline">
          Desconectar
        </Button>
      </View>
    </>
  )
}

function Section({ label, children }) {
  return (
    <View style={styles.labelContentColumn}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.userDataText}>{children}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  bottomContainer: {
    padding: 10,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 24,
  },
  buttonBottomPos: {
    marginTop: 'auto',
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  userDataText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'column',
    gap: 8,
  },
  topContainer: {
    backgroundColor: '#479BA7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 120,
  },
  topText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    marginTop: 'auto',
  },
  marginBottom: {
    marginBottom: 8,
  },
})

export default Account
