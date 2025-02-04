import React, { useCallback, useMemo, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import BottomSheet, { BottomSheetView, BottomSheetTextInput,
    BottomSheetBackdrop, BottomSheetScrollView  } from '@gorhom/bottom-sheet';
import Pin from "@/components/pin"
import {Colors} from "@/constants/Colors"

const App = forwardRef((props, ref) => {
  // ref
  const bottomSheetRef = ref;

  // variables
  const snapPoints = useMemo(() => ["30%", "45", "70%", "90"], []);

    const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="none"
				opacity={0.5}
			/>
		),
		[]
	);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index, bottomSheetRef);
  }, []);

  // renders
  return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
      >
         <View style={styles.contentContainer}>
             {props.title &&
                 <Text className="font-pregular text-2xl"> {props.title} </Text>
                 }
             {props.components}
        </View>
      </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
   flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.background.DEFAULT,
    alignItems: "center",

  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});

export default App
