import { StackScreenProps } from "@react-navigation/stack";
import { Text } from "react-native-paper";
import { useTheme, Button } from 'react-native-paper';


export default function Levels({ navigation }: StackScreenProps<any>) {
    const { colors } = useTheme();

    return (<Button
        mode="contained"
        onPress={() => { navigation.navigate("connect") }} // give param
    >
        Level 1
    </Button>);
}
