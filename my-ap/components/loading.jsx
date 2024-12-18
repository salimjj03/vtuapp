import React, { useRef, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
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
      title="Loading ..."
      ref={ref}
      components={
        <ActivityIndicator size="large" color={Colors.primary.DEFAULT} />
      }
    />
  );
};

export default Loading;
