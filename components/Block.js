import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import * as theme from '../constant/theme'

export default class Block extends Component {
  render() {
    const {
      flex,
      center, // align vertically
      middle, // align horizontally
      row,
      space,
      column,
      style,
      card,
      shadow,
      shadowWhite,
      end,
      start,
      children,
      ...props
    } = this.props

    const BlockStyles = [
      styles.Block,
      flex && { flex },
      flex == false && { flex: 0 },
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      end && styles.end,
      start && styles.start,
      card && styles.card,
      shadow && styles.shadow,
      shadowWhite && styles.shadowWhite,
      space && { justifyContent: `space-${space}` },
      style,
    ]

    return (
      <View style={BlockStyles} {...props}>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Block: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  card: {
    borderRadius: theme.sizes.border
  },
  center: {
    alignItems: 'center'
  },
  middle: {
    justifyContent: 'center'
  },
  end: {
    justifyContent: 'flex-end'
  },
  start: {
    justifyContent: 'flex-start'
  },
  space: {
    justifyContent: `space-between`
  },
  shadowWhite: {
    shadowColor: 'goldenrod',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 4,
    shadowRadius: 10,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  }
})


