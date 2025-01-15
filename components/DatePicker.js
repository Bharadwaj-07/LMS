import DateTimePicker from '@react-native-community/datetimepicker';
import react,{useState} from 'react';
import { StyleSheet ,View} from 'react-native';
export default function DTimePicker() {
  const [date, setDate] = useState(new Date('16-01-2025'));

  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});