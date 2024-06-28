import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../assets/colors/Colors';
import {Calendar} from 'react-native-calendars';
import AppointHeader from '../components/AppointHeader';
import {Fonts} from '../assets/fonts/Fonts';
import Time from '../components/Time';
import CartButton from '../components/CartButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';

export default function Appointments() {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedService} = route.params;
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateSelect = day => {
    setSelectedDate(day.dateString);
  };

  const handleTimeSelect = time => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate('BookingCheckOut', {
        date: selectedDate,
        time: selectedTime,
        selectedService,
      });
    } else {
      alert('Please select a date and time.');
    }
  };

  const getCurrentDateAndDay = () => {
    return `${moment().format('YYYY-MM-DD')} (${moment().format('dddd')})`;
  };

  return (
    <View style={styles.cont}>
      <AppointHeader />
      <Calendar
        onDayPress={handleDateSelect}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
        }}
        minDate={new Date().toISOString().split('T')[0]}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: Colors.black,
            selectedTextColor: Colors.white,
          },
        }}
      />
      <View style={styles.cont1}>
        <Text style={styles.text}>Available Slot {getCurrentDateAndDay()}</Text>
        <Text style={styles.text}>Morning</Text>
        <View style={styles.timeView}>
          <TouchableOpacity onPress={() => handleTimeSelect('9:00 AM')}>
            <Time title="9:00 AM" isSelected={selectedTime === '9:00 AM'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelect('10:00 AM')}>
            <Time title="10:00 AM" isSelected={selectedTime === '10:00 AM'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelect('11:00 AM')}>
            <Time title="11:00 AM" isSelected={selectedTime === '11:00 AM'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelect('11:50 AM')}>
            <Time title="11:50 AM" isSelected={selectedTime === '11:50 AM'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Afternoon</Text>
        <View style={styles.timeView}>
          <TouchableOpacity onPress={() => handleTimeSelect('12:00 PM')}>
            <Time title="12:00 PM" isSelected={selectedTime === '12:00 PM'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelect('2:00 PM')}>
            <Time title="2:00 PM" isSelected={selectedTime === '2:00 PM'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelect('4:00 PM')}>
            <Time title="4:00 PM" isSelected={selectedTime === '4:00 PM'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelect('6:00 PM')}>
            <Time title="6:00 PM" isSelected={selectedTime === '6:00 PM'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnView}>
        <CartButton title="Book Appointment" onPress={handleBooking} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  cont1: {
    padding: 20,
  },
  text: {
    fontFamily: Fonts.osBold,
    fontSize: 20,
    color: Colors.blackDark,
  },
  timeView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  btnView: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
