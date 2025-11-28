import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function HabitDetail() {
    const { id } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Habit Detail: {id}</Text>
        </View>
    );
}