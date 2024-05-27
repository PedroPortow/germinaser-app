import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'native-base';

const { height } = Dimensions.get('window');

function FullScreenModal({
  isVisible,
  children,
  onClose,
  title,
  closeIcon = 'close',
}) {
  const [showModal, setShowModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400, 
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic) 
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 400, 
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic) 
      }).start(() => setShowModal(false));
    }
  }, [isVisible]);

  if (!showModal) return null;

  return (
    <View style={styles.modalContainer}>
      <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name={closeIcon} size={26} color="black" />
          </TouchableOpacity>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        <View style={styles.childrenContent}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10
  },
  closeButton: {
    position: 'absolute',
    left: 10,
    top: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 24
  },
  title: {
    fontWeight: 600,
    fontSize: 22
  },
  childrenContent: {
  },
});

export default FullScreenModal;
