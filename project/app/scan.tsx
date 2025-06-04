import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { Camera, ArrowLeft, X } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScanScreen() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraRef, setCameraRef] = useState<any>(null);

  const handleBack = () => {
    if (photo) {
      setPhoto(null);
    } else if (showCamera) {
      setShowCamera(false);
    } else {
      router.back();
    }
  };

  const handleTakePhoto = async () => {
    if (Platform.OS === 'web') {
      alert('Camera functionality is not available in the web preview. Please use a mobile device to test this feature.');
      return;
    }

    try {
      if (!permission?.granted) {
        const result = await requestPermission();
        if (!result.granted) {
          alert('Camera permission is required to take photos');
          return;
        }
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      alert('Failed to access camera. Please check your device settings.');
    }
  };

  const takePicture = async () => {
    if (!cameraRef) {
      console.error('Camera reference is not available');
      return;
    }

    try {
      const photo = await cameraRef.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });
      setPhoto(photo.uri);
      setShowCamera(false);
    } catch (error) {
      console.error('Error taking picture:', error);
      alert('Failed to take picture. Please try again.');
    }
  };

  const confirmPhoto = () => {
    router.push('/upload');
  };

  const retakePhoto = () => {
    setPhoto(null);
    setShowCamera(true);
  };

  const renderCamera = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webCameraPlaceholder}>
          <Text style={styles.webCameraText}>Camera preview not available on web</Text>
        </View>
      );
    }

    return (
      <CameraView
        ref={(ref) => setCameraRef(ref)}
        style={styles.camera}
        onMountError={(error) => console.error(error)}
      >
        <View style={styles.overlay}>
          <View style={styles.scanWindow}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={takePicture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    );
  };

  const renderPreview = () => (
    <View style={styles.previewContainer}>
      {photo && <Image source={{ uri: photo }} style={styles.preview} />}
      <View style={styles.previewActions}>
        <TouchableOpacity 
          style={[styles.previewButton, styles.retakeButton]} 
          onPress={retakePhoto}
        >
          <X color={COLORS.primary} size={24} />
          <Text style={styles.retakeButtonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.previewButton, styles.confirmButton]}
          onPress={confirmPhoto}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan your ID</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      {showCamera ? (
        renderCamera()
      ) : photo ? (
        renderPreview()
      ) : (
        <View style={styles.content}>
          <View style={styles.cardContainer}>
            <View style={styles.cardFrame}>
              <View style={styles.cardGuideLines}>
                <View style={styles.cardGuideLine} />
                <View style={styles.cardGuideLine} />
                <View style={styles.cardGuideLine} />
              </View>
              <View style={styles.cardIconContainer}>
                <Camera color={COLORS.white} size={32} />
              </View>
            </View>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Scan your ID</Text>
            <Text style={styles.description}>
              Position your ID card within the frame and ensure all corners are visible
            </Text>
            <Text style={styles.reminder}>
              Your data is encrypted and secure
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleTakePhoto}
          >
            <Camera color={COLORS.white} size={24} />
            <Text style={styles.buttonText}>TAKE PHOTO</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  progressDot: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    aspectRatio: 1.6,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFrame: {
    width: '90%',
    aspectRatio: 1.6,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardGuideLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  cardGuideLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1,
  },
  cardIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  reminder: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.white,
    opacity: 0.6,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 12,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanWindow: {
    width: '80%',
    aspectRatio: 1.6,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: COLORS.white,
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.white,
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: COLORS.white,
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.white,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.white,
  },
  webCameraPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webCameraText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    padding: 20,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  preview: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  previewButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  retakeButton: {
    backgroundColor: COLORS.white,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  retakeButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});