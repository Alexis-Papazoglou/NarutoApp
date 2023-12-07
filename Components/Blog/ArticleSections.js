// ArticleSections.js
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useFetchArticleSections } from '../../Hooks/useFetchArticleSections';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ArticleSections({ articleId }) {
    const { sections , loading} = useFetchArticleSections(articleId);
    const [expandedSection, setExpandedSection] = useState(null);

    const handlePress = (index) => {
        setExpandedSection(index === expandedSection ? null : index);
    };

    if (loading) {
        return <ActivityIndicator size="small" color="#FFA500" />; // Orange color
    }

    return (
        <>
            {sections && sections.sort((a, b) => a.order - b.order).map((section, index) => (
                <TouchableOpacity activeOpacity={expandedSection === index ? 1 : 0.2} style={styles.section} key={index} onPress={() => handlePress(index)}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{section.title}</Text>
                        <Icon name={expandedSection === index ? 'chevron-up' : 'chevron-down'} size={20} color='orange' />
                    </View>
                    {expandedSection === index && <Text style={styles.text}>{section.content}</Text>}
                </TouchableOpacity>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        paddingTop: 12,
        paddingHorizontal: 5
    },
    title: {
        color: 'orange',
        fontWeight: 'bold',
        borderColor: 'orange',
    },
    section: {
        backgroundColor: 'black',
        padding: 5,
        margin: 5
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: 'orange'
    }
});