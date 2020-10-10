const switchInput = document.getElementById('switch');
const styles = document.documentElement.style;

/*
  --dark-mode-elements: hsl(209, 23%, 22%);
  --dark-mode-bg: hsl(207, 26%, 17%);
  --light-mode-text: hsl(200, 15%, 8%);
  --light-mode-input: hsl(0, 0%, 52%);
  --light-mode-bg: hsl(0, 0%, 98%);
  --light-mode-elements: hsl(0, 0%, 100%);
  --sun-light-mode: hsl(39, 100%, 50%);
  --sun-dark-mode: hsl(0, 0%, 98%);
  --moon-dark-mode: hsl(207, 26%, 17%);
*/
const lightTheme = {
  '--bg-color': 'hsl(0, 0%, 98%)',
  '--text-color': 'hsl(200, 15%, 8%)',
  '--moon-bg': ' hsl(0, 0%, 52%)',
  '--sun-bg': 'hsl(41, 64%, 57%)',
  '--card-bg': 'hsl(0, 0%, 98%)'
};

const darkTheme = {
  '--bg-color': 'hsl(207, 26%, 17%)',
  '--text-color': 'hsl(0, 0%, 98%)',
  '--moon-bg': 'hsl(41, 64%, 57%)',
  '--sun-bg': ' hsl(0, 0%, 52%)',
  '--card-bg': 'hsl(209, 23%, 22%)'
};

const changeTheme = theme => {
  const customStyles = Object.keys(theme);
  for (const style of customStyles) {
    styles.setProperty(style, theme[style]);
  }
};

switchInput.addEventListener('click', e => {
  e.target.previousElementSibling.checked
    ? changeTheme(lightTheme)
    : changeTheme(darkTheme);

  //Equivalencia del operador ternario
  // if (e.target.previousElementSibling.checked) {
  //   changeTheme(lightTheme);
  // } else {
  //   changeTheme(darkTheme);
  // }
});
