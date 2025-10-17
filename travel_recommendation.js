const serachInput = document.querySelector('#search-input');

serachInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    fectData();
  }
});

function fectData() {
  if (serachInput.value === null || serachInput.value === '') {
    console.log('Please enter an input');
  } else {
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        switch(serachInput.value.toLowerCase().substring(0,5)) {
          case 'beach':
            console.log(data.beaches);
            break;
          case 'count':
            console.log(data.countries);
            break;
          case 'templ':
            console.log(data.temples);
            break;
          default:
            console.log('No data found!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

function clearData() {
  serachInput.value = '';
}
