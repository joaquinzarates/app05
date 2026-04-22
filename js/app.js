const themeBtn = document.getElementById('theme-toggle')
const htmlelement = document.documentElement;

const applyTheme = (theme) => {

    htmlelement.setAttribute('data-theme',theme)
    localStorage.setItem('iacon-theme',theme)
    
}

const savedTheme = localStorage.getItem('iacon-theme');
if(savedTheme){
    applyTheme(savedTheme);
}else{
    applyTheme('dark');
}

themeToggle.addEventListener('click',() => {

    const currentTheme = htmlelement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
})