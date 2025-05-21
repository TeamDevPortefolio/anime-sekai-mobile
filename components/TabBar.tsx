import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    const icon = {
        home: (props: any) => <Ionicons name='home' size={24}{...props} />,
        catalogue: (props: any) => <Ionicons name='book' size={24} {...props}  />,
        detail: (props: any) => <Ionicons name='bookmarks' size={24} {...props} />
    }
    return (
        <View style={styles.tabBar} >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <PlatformPressable key={route.name}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarIcon}
                        
                    >
                       
                        {icon[route.name]({

                            color:isFocused?"#052DA9":'#000'
                        }

                        )}
                        <Text style={{ color: isFocused ? colors.primary : colors.text }}>
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({

    tabBar: {
        position: 'absolute',
        bottom: 25,
        display: 'flex',
        flexDirection: "row",
        justifyContent:"space-between",
        backgroundColor: "#8F8F8F",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal:60,
        alignItems:'center',
        borderRadius:34,
        opacity:0.9
    
    },
    tabBarIcon: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:5

    }


})