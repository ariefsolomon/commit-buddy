import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function PartnerDetail() {
    const { partnerId } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Partner Detail: {partnerId}</Text>
        </View>
    );
}