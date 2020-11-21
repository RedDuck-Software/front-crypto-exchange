module.exports = {
  purge: [],
  theme: {
    extend: {
      marginTop: ['responsive'],
      width: {
        '37%': '37%'
      }
    },
    minWidth: {
      '3/4': '75%'
    },
    color: {
      primary: 'var(--color-color-primary)',
      secondary: 'var(--color-color-secondary)',
      ternary: 'var(--color-color-ternary)'
    },
    copy: {
      primary: 'var(--color-color-primary)',
      secondary: 'var(--color-color-secondary)'
    },
    variants: {
      cursor: ['hover'],
      border: ['hover'],
      width: ['responsive', 'hover'],
      borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover']
    },
    plugins: []
  }
}
