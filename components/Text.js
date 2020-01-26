import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

import * as theme from '../constant/theme'

export default class Typography extends Component {
  render() {
    const {
      style,
      h1,
      h2,
      h3,
      title,
      body,
      small,
      size,
      bold,
      semibold,
      light,
      center,
      justify,
      children,
      color,
      ...props
    } = this.props

    const TextStyle = [
      styles.Text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      small && styles.small,
      bold && styles.bold,
      semibold && styles.semibold,
      light && styles.light,
      size && { fontSize: size },
      center && styles.center,
      justify && styles.justify,
      color && styles[color],
      color && !styles[color] && { color },
      style
    ]

    return (
      <Text style={TextStyle} {...props}>
        {children}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  // default style
  Text: {
    fontSize: theme.sizes.font,
    color: 'black'
  },
  bold: {
    fontWeight: 'bold'
  },
  semibold: {
    fontWeight: '500'
  },
  light: {
    fontWeight: '200'
  },

  // position
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },

  // Fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  small: theme.fonts.small
})