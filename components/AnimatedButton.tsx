import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";


export interface AnimatedButtonProps {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
    title: string;
    width: any;
    color?: any;
    textColor?: any;
    shadowColor?: any;
}

const DURATION = 300;
const BORDER_RADIUS = 8;
const HEIGHT = 40;
const SHADOW_HEIGHT = 4;


const AnimatedButton = ({
    accessibilityHint,
    accessibilityLabel,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
    width,
    color = "#ff7f2a",
    textColor = "#fff",
    shadowColor = "#d56a22",
}: AnimatedButtonProps) => {
    const transition = useSharedValue(0);
    const isActive = useSharedValue(false);

    const animatedStyle = useAnimatedStyle(() => ({
        top: interpolate(transition.value, [0, 1], [0, SHADOW_HEIGHT]),
    }));

    return (
        <Pressable
            style={{position: "relative", width: "100%",}}
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{
                busy: isLoading,
                disabled: isDisabled || isLoading,
            }}
            disabled={isDisabled || isLoading}
            hitSlop={16}
            onPress={onPress}
            onPressIn={() => {
                isActive.value = true;
                transition.value = withTiming(1, { duration: DURATION }, () => {
                    if (!isActive.value) {
                        transition.value = withTiming(0, {
                            duration: DURATION,
                        });
                    }
                });
            }}
            onPressOut={() => {
                if (transition.value === 1) {
                    transition.value = withTiming(0, { duration: DURATION });
                }
                isActive.value = false;
            }}
        >
            <View style={{ width }}>
                <View style={[styles.shadow, {backgroundColor: shadowColor}]} />
                <Animated.View
                    style={[
                        styles.container,
                        animatedStyle,
                        {
                          backgroundColor: color,
                          opacity: isDisabled ? 0.5 : 1,
                        },
                    ]}
                >
                    {isLoading ? (
                        <ActivityIndicator
                            color={"white"}
                            size={18}
                        />
                    ) : (
                        <>
                          <Text numberOfLines={1} style={[styles.title, {color: textColor}]}>
                            {title}
                          </Text>
                        </>
                    )}
                </Animated.View>
            </View>
        </Pressable>
    );
};

export default AnimatedButton

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ff7f2a",
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    gap: 8,
    height: HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    width: "100%",
  },
  shadow: {
    backgroundColor: "#d56a22",
    borderRadius: BORDER_RADIUS + 1,
    height: HEIGHT,
    top: SHADOW_HEIGHT,
  },
  title: {
    flexShrink: 1,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});