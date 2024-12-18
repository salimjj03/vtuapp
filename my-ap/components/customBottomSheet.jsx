import React, { useCallback, useMemo, forwardRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';

const App = forwardRef((props, ref) => {
  // ref
  const bottomSheetRef = ref || React.createRef();

  // snap points
  const snapPoints = useMemo(() => ['20%', '45%', '70%'], []);

  // Render custom backdrop
  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="none"
        opacity={0.5}
        style={StyleSheet.absoluteFillObject} // Fullscreen backdrop
      />
    ),
    []
  );

  // Handle sheet changes
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index, bottomSheetRef);
  }, []);

  // Render component
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {props.title && (
            <Text className="font-pregular text-2xl">{props.title}</Text>
          )}
          {props.components}
        </ScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.background.DEFAULT,
    alignItems: 'center',
  },
});

export default App;
