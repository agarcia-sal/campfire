
const customStyles = {
  control: (provided, state) => ({
      ...provided,
      background: 'transparent',
      borderColor: '#02283B',
      minHeight: '35px',
      height: '35px',
      boxShadow: state.isFocused ? null : null,
    }),

  valueContainer: (provided, state) => ({
  ...provided,
  height: '35px',
  fontFamily: "Open Sans",
  padding: '0 10px'
  }),
  value: (provide, state) => ({
      height: '26px',
      fontFamily: "Open Sans",
  }),
  input: (provided, state) => ({
  ...provided,
  margin: '0px',
  fontFamily: "Open Sans",
  }),
  indicatorSeparator: state => ({
  display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
  ...provided,
  height: '40px',
  }),
  placeholder: base => ({
      color: "#02283B",
      fontFamily: "Open Sans",
      height: "26px",
  }),
  menu: base => ({
    ...base,
    color: "#02283B",
    fontFamily: 'Open Sans',
    background: "transparent",
    // override border radius to match the box
    borderRadius: "15px",
    // kill the gap
    marginTop: "3px",
    // kill the white space on first and last option
    padding: "3px", 
  })
};

export default customStyles;