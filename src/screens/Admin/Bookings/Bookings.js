import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Select, SelectItem } from '@ui-kitten/components'
import { Feather } from '@expo/vector-icons'
import { Loader, Card, Text } from '@components'
import { formatDate, getWeekDay } from '@helpers'
import Table from '../components/Table'
import { apiGetBookings } from '../../../services/bookings'
import { apiGetClinics } from '../../../services/clinics'

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [bookingModalVisible, setBookingModalVisible] = useState(false)

  const [selectedBooking, setSelectedBooking] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [metadata, setMetadata] = useState({})

  const [clinic, setClinic] = useState()
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(null)

  const [clinicOptions, setClinicOptions] = useState([])

  const getBookings = async (page) => {
    setIsLoading(true)

    try {
      const perPage = 7
      const response = await apiGetBookings({ page, perPage })

      if (page === 1) {
        setBookings(response.data.bookings)
      } else {
        setBookings((prev) => [...prev, ...response.data.bookings])
      }
      setMetadata(response.data.meta)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (!isLoading && metadata.current_page < metadata.total_pages) {
      getBookings(metadata.current_page + 1)
    }
  }

  useEffect(() => {
    getBookings(1)
    getClinicOptions()
  }, [])

  const getClinicOptions = async () => {
    try {
      const response = await apiGetClinics()

      const formattedResponse = response.data.map((clinic) => ({
        label: clinic.name,
        value: clinic.id,
      }))

      setClinicOptions(formattedResponse)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onChooseClinic = (selectedClinic) => {
    const selectedClinicId = clinicOptions[selectedClinic.row].value
    setClinic(selectedClinicId)
    setSelectedClinicIndex(selectedClinic)
  }

  console.log({ bookings })

  const renderItem = ({ item }) => {
    const dateSubtitle = `${getWeekDay(item.date)}, ${formatDate(item.date)}`

    return (
      <ListItem
        title={item.name}
        description={`${item.room_name} - ${dateSubtitle}`}
        style={styles.listItem}
        accessoryRight={() => (
          <Feather
            name="edit"
            size={18}
            color="black"
            onPress={() => {
              setSelectedBooking(item)
              setBookingModalVisible(true)
            }}
          />
        )}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      {/* <BookingModal
        booking={selectedBooking}
        visible={bookingModalVisible}
        close={() => setBookingModalVisible(false)}
        onSubmit={() => getBookings(1)}
      /> */}
      <Card style={styles.cardContent}>
        <View style={styles.selectWrapper}>
          <Text style={styles.selectLabel}>Clínica</Text>
          <Select
            onSelect={onChooseClinic}
            value={clinicOptions[selectedClinicIndex?.row]?.label}
            placeholder="Selecione a clínica"
          >
            {clinicOptions.map((clinic) => (
              <SelectItem key={clinic.value} title={clinic.label} />
            ))}
          </Select>
        </View>
        <View style={styles.selectWrapper}>
          <Text style={styles.selectLabel}>Usuário</Text>
          <Select
            onSelect={onChooseClinic}
            value={clinicOptions[selectedClinicIndex?.row]?.label}
            placeholder="Selecione a clínica"
          >
            {clinicOptions.map((clinic) => (
              <SelectItem key={clinic.value} title={clinic.label} />
            ))}
          </Select>
        </View>
      </Card>
      <View style={styles.tableWrapper}>
        <Table
          data={bookings}
          listItem={renderItem}
          style={styles.tableMargin}
          onEndReached={handleLoadMore}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  selectWrapper: {
    flexDirection: 'column',
    gap: 4,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  cardContent: {
    flexDirection: 'column',
    gap: 16,
  },
  listItem: {
    height: 50,
  },
  tableWrapper: {
    marginBottom: 232,
  },
})

export default Bookings
