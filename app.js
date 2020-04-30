/////// Functionality ////////
var countriesContainer = document.querySelector('.countries_container');
var countryTemplate = document.querySelector('.country_template').childNodes[1];

var url = 'https://restcountries.eu/rest/v2/';
fetchData(url);

function fetchData(url){
  axios.get(url)
  .then(function(data){
    loopCountrys(data.data);
  })
  .catch(function(error){
    console.log(error);
  });
}

function loopCountrys(countries){
  for (var i = 0; i < countries.length; i++) {
    var countryDiv = countryTemplate.cloneNode(true);
    makeCountry(countries[i], countryDiv);
  }
  newCountryContainers();
  return 0;
}

function makeCountry(countryData, countryDiv){
  countryDiv.childNodes[1].style.backgroundImage = 'url(' + countryData.flag +  ')';
  countryDiv.childNodes[3].childNodes[1].textContent = countryData.name;
  countryDiv.childNodes[3].childNodes[3].childNodes[1].textContent = formatNumber(countryData.population);
  countryDiv.childNodes[3].childNodes[5].childNodes[1].textContent = countryData.region;
  countryDiv.childNodes[3].childNodes[7].childNodes[1].textContent = countryData.capital;
  countriesContainer.appendChild(countryDiv);
  return 0;
}


//// Region Filter /////
var region = document.querySelectorAll('.region_filter_option');
var mainPage = document.querySelector('.main_page');
var secondPage = document.querySelector('.second_page');
var countryContainers = document.querySelectorAll('.country_container');
var input = document.querySelector('input');
var regionFilterText = document.querySelector('.region_filter_text');
var dropdown = document.querySelector('.dropdown_background');
var filterButton = document.querySelector('.filter_button');


mainPage.addEventListener('click', function(event){
  event.stopPropagation();
  dropdown.classList.remove('open');
});
filterButton.addEventListener('click', function(event){
  event.stopPropagation();
  dropdown.classList.toggle('open');
});
region.forEach(function(el){
  el.addEventListener('click', function(){
    clearContianer();
    clearInput();
    compareInput('');
    dropdown.classList.remove('open');
    regionFilterText.textContent = el.textContent;
    if (el.textContent !== 'All') {
      var url2 = url + 'region/' + el.textContent;
      fetchData(url2);
    }else {
      fetchData(url);
    }
  });
});

function clearContianer(){
  countriesContainer.innerHTML = '';
}

function newCountryContainers(){
  countryContainers = document.querySelectorAll('.country_container');
  countryContainers.forEach(function(el){
    el.addEventListener('click', renderClicked);
  });
}

function clearInput(){
  input.value = '';
}

/////// Selected Country /////////
var clickedCountryContainer = document.querySelector('.clicked_country_container');

function renderClicked(){
  var url3 = url + 'name/' + this.childNodes[3].childNodes[1].textContent;
  fetchOne(url3);
}

function mainToSecond(){
  mainPage.classList.toggle('open');
  secondPage.classList.toggle('open');
}

function fetchOne(url){
  axios.get(url)
  .then(function(data){
    makeChosenCountry(data.data[0], clickedCountryContainer);
  })
  .then(function(){
    mainToSecond();
    scrollToTop();
  })
  .catch(function(error){
    console.log(error);
  });
}

var backButton = document.querySelector('.back_button');
backButton.addEventListener('click', mainToSecond);

function makeChosenCountry(countryData, countryDiv) {
  countryDiv.childNodes[1].src = countryData.flag;
  countryDiv.childNodes[3].childNodes[1].textContent = countryData.name;
  countryDiv.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[1].textContent = countryData.nativeName;
  countryDiv.childNodes[3].childNodes[3].childNodes[1].childNodes[3].childNodes[1].textContent = formatNumber(countryData.population);
  countryDiv.childNodes[3].childNodes[3].childNodes[1].childNodes[5].childNodes[1].textContent = countryData.region;
  countryDiv.childNodes[3].childNodes[3].childNodes[1].childNodes[7].childNodes[1].textContent = countryData.subregion;
  countryDiv.childNodes[3].childNodes[3].childNodes[1].childNodes[9].childNodes[1].textContent  = countryData.capital;
  countryDiv.childNodes[3].childNodes[3].childNodes[3].childNodes[1].childNodes[1].textContent  = countryData.topLevelDomain[0];
  countryDiv.childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes[1].textContent  = countryData.currencies[0].name;
  var tempLanguages = '';
  for (var i = 0; i < countryData.languages.length; i++) {
    if (i !== countryData.languages.length - 1) {
      tempLanguages += countryData.languages[i].name + ', ';
    }else {
      tempLanguages += countryData.languages[i].name;
    }
  }
  countryDiv.childNodes[3].childNodes[3].childNodes[3].childNodes[5].childNodes[1].textContent = tempLanguages;
  secondPage.appendChild(countryDiv);
}


/////////// Search ///////////
input.addEventListener('input', function(inputText){
  compareInput(inputText.target.value);
});

function compareInput(input){
  countryContainers = document.querySelectorAll('.country_container');
  var countryContainersArray = Array.from(countryContainers);

  countryContainersArray.forEach(function(country){
    var tempCountryName = country.childNodes[3].childNodes[1].textContent.toLowerCase();
    if (tempCountryName.indexOf(input.toLowerCase()) !== -1) {
      country.style.display = 'block';
    }else {
      country.style.display = 'none';
    }

  });
}


////// COLOR MODE ///////
var colorMode = document.querySelector('#color_mode');
var svgOutline = document.querySelectorAll('.svg_outline');
var arrowIconLines = document.querySelectorAll('.arrow_icon_line');
var body = document.querySelector('body');

colorMode.addEventListener('click', function(){
  var elementsText = document.querySelectorAll('.text_color');
  var elementsBackground = document.querySelectorAll('.background_color');
  var backgroundNoHover = document.querySelectorAll('.background_without_hover');
  elementsText.forEach(function(el){
    el.classList.toggle('text_color_light');
  });
  elementsBackground.forEach(function(el){
    el.classList.toggle('background_color_light');
  });
  backgroundNoHover.forEach(function(el){
    el.classList.toggle('background_without_hover_light');
  });
  svgOutline.forEach(function(el){
    el.classList.toggle('svg_outline_light');
  });
  body.classList.toggle('body_lightmode');
  input.classList.toggle('placeholder_class');
  region.forEach(function(el){
    el.classList.toggle('region_filter_option_light');
  });
  arrowIconLines.forEach(function(el){
    el.classList.toggle('arrow_icon_line_light');
  });
});

function scrollToTop(){
  window.scrollTo(0, 0);
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}








