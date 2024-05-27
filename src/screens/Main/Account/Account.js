import { StyleSheet, View } from 'react-native'
import { Divider, Text } from 'native-base'
import { Button, Card } from '@components'
import { useNavigation } from '@react-navigation/native'
import { ROLES_LABEL } from '@constants'
import { useUserContext } from '@context'
import { useEffect } from 'react'

function Account({ refetch }) {
  const { user, logout, isAdminOrOwner, getUserData } = useUserContext()
  const navigation = useNavigation()

  useEffect(() => {
    getUserData()
  }, [refetch])

  return (
    <>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Olá, {user.name}!</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Card style={styles.userInfo}>
          <Section label="Nome">{user.name}</Section>
          <Section label="Email">{user.email}</Section>
          <View style={styles.contentRow}>
            <Section label="Cargo">{ROLES_LABEL[user.role]}</Section>
            <Section label="Créditos de Reserva">{user.credits}</Section>
          </View>
          <Divider />
          <View style={styles.contentRow}>
            <Section label="Reservas Agendadas">{user.active_bookings_count}</Section>
            <Section label="Total de Reservas">{user.total_bookings_count}</Section>
          </View>
          <Section label="Reservas Canceladas">{user.canceled_bookings_count}</Section>
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
    marginBottom: 12
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
