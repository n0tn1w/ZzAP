import { StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme, Button } from 'react-native-paper';
import { Icon } from "react-native-paper";


export default function LevelDescription({ navigation }: StackScreenProps<any>) {
    const { colors } = useTheme();

    return (<View style={{
        flex: 1,
        gap: 20,
        paddingVertical: 26,
        paddingHorizontal: 26,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    }}>
        <Text variant="titleLarge">Level 1</Text>
        <Text variant="bodyLarge">This level is nice level, very nice, very math.
            Gg go next. Easy win for jidjkadjiq. dominos. i must scream and i have no mouth</Text>
        <Icon source="graphql" size={200} color={colors.primary}></Icon>
    </View>);
}
