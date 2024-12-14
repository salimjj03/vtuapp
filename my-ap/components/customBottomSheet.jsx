import React, { useCallback, useMemo, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetTextInput,
    BottomSheetBackdrop, BottomSheetScrollView  } from '@gorhom/bottom-sheet';
import Pin from "@/components/pin"
import {Colors} from "@/constants/Colors"

const App = forwardRef((props, ref) => {
  // ref
  const bottomSheetRef = ref || React.createRef();

  // variables
  const snapPoints = useMemo(() => ["20%", "70%"], []);

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
      //bottomSheetRef.current.snapToPosition(250)
    console.log('handleSheetChanges', index, bottomSheetRef);
  }, []);

  // renders
  return (
    //<GestureHandlerRootView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        //onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        //enableBackdropPress={false}
        enablePanDownToClose={false}
        //style={styles.container}
      >
{/*         <BottomSheetTextInput style={styles.input} /> */}
         <ScrollView contentContainerStyle={styles.contentContainer}>
             {props.title &&
                 <Text className="font-pregular text-2xl"> {props.title} </Text>
                 }
             {props.components}
        </ScrollView>
      </BottomSheet>
   //</GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
   flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.background.DEFAULT,
    alignItems: "center"

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
