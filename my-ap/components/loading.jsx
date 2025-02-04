import React, { useRef, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import CustomBottomSheet from '@/components/customBottomSheet';

const Loading = ({ loading }) => {
  const ref = useRef();

  useEffect(() => {
    if (loading && ref.current) {
      ref.current.snapToIndex(0);
    } else if (!loading && ref.current) {
      ref.current.close();
    }
  }, [loading]);

  return (
        <CustomBottomSheet
          ref={ref}
          components={
           <>
            <ActivityIndicator size="large" color={Colors.primary.DEFAULT} />
            <View className="mt-2">
                <Text className="font-pregular">Loading...</Text>
            </View>
           </>
          }
        />
  );
};

export default Loading;
