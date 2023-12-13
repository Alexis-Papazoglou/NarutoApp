import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';

const ProfilePicture = ({ userId }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onSnapshot(doc(db, 'Users', userId), (doc) => {
            const data = doc.data();
            if (data && data.profilePictureUrl) {
                setImage(data.profilePictureUrl);
            } else {
                setImage(null);
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, [userId]);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (result.cancelled || !result.assets) {
                console.log('Image picker was closed without selecting an image.');
                return;
            }

            setImage(result.assets[0].uri);

            // Upload the selected image to Firebase Storage
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();

            var storage = getStorage();
            var storageRef = ref(storage, 'profilePictures/' + new Date().getTime());
            var uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Upload error', error);
                },
                async () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImage(downloadURL);

                        // Update the user's profilePictureUrl attribute in Firestore
                        const db = getFirestore();
                        console.log(userId)
                        await setDoc(doc(db, 'Users', userId), { profilePictureUrl: downloadURL }, { merge: true });
                        console.log('Updated profilePictureUrl attribute in Firestore')
                    });
                }
            );
        } catch (error) {
            console.error('Error picking image: ', error);
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
                <AntDesign name="edit" size={18} color="black" />
            </TouchableOpacity>
            {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text>No profile image</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: 'orange',
        borderWidth: 1,
    },
    btn: {
        position: 'absolute',
        top: 0,
        right: -5,
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        borderRadius: 15,
        zIndex: 1,
    }
});

export default ProfilePicture;