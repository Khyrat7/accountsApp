import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../context/LayoutContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import Colors from '../constants/Colors';
import Constants from '../constants/PhoneDimentions';

export default TextInputField = props => {
  const {
    fieldPressed,
    savePressed,
    cancelPressed,
    deletePressed,
    fieldValue,
    title,
    placeholder,
    keyboardType,
    onChangeText,
    visible,
    fieldStyle,
    onFocus,
  } = props;

  const {themeColors} = useContext(ThemeContext);
  const [inputVisible, setInputVisible] = useState(visible);

  const styles = StyleSheet.create({
    container: {
      // paddingBottom: 10,
      backgroundColor: visible ? themeColors.fieldFocused : themeColors.section,
    },
    cellTextHeader: {
      fontSize: RFPercentage(2.5),
      fontWeight: 'bold',
      color: themeColors.mainFont,
    },
    cellText: {
      fontSize: RFPercentage(2.5),
      color: themeColors.mainFont,
      textAlign: 'left',
      marginHorizontal: 15,
      marginBottom: fieldStyle === 'col' ? 10 : 0,
    },
    cellView: {
      marginHorizontal: 15,
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textInput: {
      color: themeColors.mainFont,
      borderBottomColor: themeColors.border,
      borderBottomWidth: 0.3,
      width: '100%',
      height: '100%',
      fontSize: RFPercentage(2.5),
    },
  });
  return (
    // <View style={{...styles.container, ...props.style}}></View>;
    <View style={{...styles.container, ...props.style}}>
      <TouchableOpacity
        onPress={() => {
          setInputVisible(!inputVisible);
          fieldPressed();
        }}>
        <View
          style={styles.cellView} // Account Note
        >
          {fieldStyle === 'row' ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.cellTextHeader}>
                {title}
                {'  '}
              </Text>
              <Text style={styles.cellText}>{fieldValue}</Text>
            </View>
          ) : (
            <Text style={styles.cellTextHeader}>
              {title}
              {'  '}
            </Text>
          )}
          <Icon
            name="chevron-forward-outline"
            size={RFPercentage(3)}
            color={themeColors.mainFont}
          />
        </View>
        {fieldStyle === 'col' ? (
          <Text style={styles.cellText}>{fieldValue}</Text>
        ) : null}
      </TouchableOpacity>
      {!visible ? null : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <TextInput
              style={styles.textInput}
              placeholder={placeholder}
              // placeholderTextColor={Colors.lightWhite}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              numberOfLines={5}
              autoFocus={true}
              onFocus={onFocus}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                deletePressed();
                setInputVisible(false);
              }}>
              <Icon name="trash" size={RFPercentage(5)} color={Colors.red} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setInputVisible(false);
                cancelPressed();
              }}>
              <Icon name="close" size={RFPercentage(5)} color={Colors.red} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                savePressed();
                setInputVisible(false);
              }}>
              <Icon
                name="checkmark"
                size={RFPercentage(5)}
                color={Colors.green}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
