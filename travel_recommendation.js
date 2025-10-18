const serachInput = document.querySelector('#search-input');

const sectionDetails = document.querySelector('.section-details');

serachInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sectionDetails.innerHTML = '';
    fectData();
  }
});

function fectData() {
  if (serachInput.value === null || serachInput.value === '') {
    sectionDetails.innerHTML = '';
    const emptySearch = document.createElement('div');
    emptySearch.className = 'place-details';

    const h3 = document.createElement('h3');
    h3.textContent = 'Please enter an input';

    emptySearch.appendChild(h3);
    sectionDetails.appendChild(emptySearch);
  } else {
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let datas = null;
        switch (serachInput.value.toLowerCase().substring(0, 5)) {
          case 'beach':
            datas = data.beaches;
            break;
          case 'count':
            datas = data.countries.map(d => d.cities).flat();
            break;
          case 'templ':
            datas = data.temples;
            break;
          default:
            datas = 'No data found!';
        }
        sectionDetails.innerHTML = '';
        if (datas === 'No data found!') {
          sectionDetails.innerHTML = '';
          const noDatas = document.createElement('div');
          noDatas.className = 'place-details';

          const h3 = document.createElement('h3');
          h3.textContent = 'No data found!';

          noDatas.appendChild(h3);
          sectionDetails.appendChild(noDatas);
        } else {
          datas.forEach(data => {
            const placeDetails = document.createElement('div');
            placeDetails.className = 'place-details';

            const img = document.createElement('img');
            img.src = `./${data.imageUrl}`;
            img.alt = data.name;

            const h3 = document.createElement('h3');
            h3.textContent = data.name;

            const p = document.createElement('p');
            p.textContent = data.description;

            placeDetails.appendChild(img);
            placeDetails.appendChild(h3);
            placeDetails.appendChild(p);

            sectionDetails.appendChild(placeDetails);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

function clearData() {
  serachInput.value = '';
  sectionDetails.innerHTML = '';
}
