import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Image } from 'react-native';
import { X, Camera, Upload, Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

interface CompletionModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (photoUrl: string) => void;
  itemTitle: string;
}

export default function CompletionModal({ visible, onClose, onComplete, itemTitle }: CompletionModalProps) {
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleComplete = () => {
    if (photo) {
      onComplete(photo);
      setPhoto(null);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Congratulations! 🎉</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#64748b" />
            </Pressable>
          </View>

          <Text style={styles.completionText}>
            Did you really complete "{itemTitle}"?
          </Text>
          
          <Text style={styles.subtitle}>
            If so, that's amazing! Share a photo of your achievement!
          </Text>

          {!photo ? (
            <Pressable style={styles.uploadButton} onPress={handlePickImage}>
              <Camera size={24} color="#2563EB" />
              <Text style={styles.uploadText}>Upload Photo Proof</Text>
            </Pressable>
          ) : (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <Pressable style={styles.retakeButton} onPress={handlePickImage}>
                <Upload size={20} color="#2563EB" />
                <Text style={styles.retakeText}>Change Photo</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button, 
                styles.completeButton,
                !photo && styles.disabledButton
              ]}
              onPress={handleComplete}
              disabled={!photo}
            >
              <Check size={20} color="#fff" />
              <Text style={styles.completeButtonText}>Complete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  closeButton: {
    padding: 8,
  },
  completionText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 24,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#eff6ff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#2563EB',
    marginBottom: 24,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  photoContainer: {
    marginBottom: 24,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },
  retakeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
  completeButton: {
    backgroundColor: '#2563EB',
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});