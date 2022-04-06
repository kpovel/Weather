const tabs = document.querySelectorAll('.main-tabs__item')
for (let tab of tabs) {
    tab.addEventListener('click', switchTab)
}

function switchTab() {
    const navTab = document.querySelector('.main-tabs__item--active')
    let activeTab = document.querySelector('.main-tabs__block--active')
    navTab.classList.remove('main-tabs__item--active')
    activeTab.classList.remove('main-tabs__block--active')

    this.classList.add('main-tabs__item--active')
    const idClickTab = this.getAttribute('href')
    const idMainTabs = document.querySelector(idClickTab)
    idMainTabs.classList.add('main-tabs__block--active')
}

