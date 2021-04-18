// Helper functions
function createNode(element) {
  // Create the type of element you pass in the parameters
  return document.createElement(element);
}

function append(parent, el) {
  // Append the second parameter(element) to the first
  return parent.appendChild(el);
}

const superHeroFeed = document.getElementById('superheroes_feed');
const url = `../assets/data/superheroes.json`

fetch(url, {
  method: 'GET'
})
.then((resp) => resp.json())
  .then(data => {
    data.results.forEach(superhero_available => {
      console.log(superhero_available);
      let photoSlide = createNode('div');
      photoSlide.classList.add('image-slide');
      let photo = createNode('img');
      photo.src = `${superhero_available.image.url}`;
      photo.alt = `${superhero_available.name}`;
      let photoDesc = createNode('div');
      photoDesc.classList.add('photo-description');
      let name = createNode('p');
      name.classList.add('name');
      name.innerHTML = `${superhero_available.name}`
      let bio = createNode('p');
      bio.classList.add('bio');
      bio.innerHTML = `${superhero_available.biography["place-of-birth"]}`
      console.log(bio);
      append(superHeroFeed, photoSlide);
      append(photoSlide, photo);
      append(photoSlide, photoDesc);
      append(photoDesc, name);
      if (bio.innerHTML !== "-") {
        append(photoDesc, bio);
      }
    })
  })
  .catch(function(error) {
    console.log(error);
  });

  setTimeout(function() {
    function Slider(slider) {
      if (!(slider instanceof Element)) {
        throw new Error('No slider passed in');
      }

      // select elements needed for slider
      this.slides = slider.querySelector('.image-slides');
      this.slider = slider;
      const prevButton = slider.querySelector('.image-goToPrev');
      const nextButton = slider.querySelector('.image-goToNext');

      // when this slider is created, run the start slider function
      this.startSlider();
      this.applyClasses();

      // Event listeners
      prevButton.addEventListener('click', () => this.move('back'));
      nextButton.addEventListener('click', () => this.move());
    }

    Slider.prototype.startSlider = function() {
      this.current = this.slider.querySelector('.image-current') || this.slides.firstElementChild;
      this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
      this.next = this.current.nextElementSibling || this.slides.firstElementChild;
    };

    Slider.prototype.applyClasses = function() {
      this.current.classList.add('image-current');
      this.prev.classList.add('image-prev');
      this.next.classList.add('image-next');
    };

    Slider.prototype.move = function(direction) {
      // first strip all of the classes off the current slides
      const classesToRemove = ['image-prev', 'image-current', 'image-next'];
      this.prev.classList.remove(...classesToRemove);
      this.current.classList.remove(...classesToRemove);
      this.next.classList.remove(...classesToRemove);

      if (direction === 'back') {
        // make a new array of the new values, and destructure them over and into the prev, current, and next variables
        [this.prev, this.current, this.next] = [
          // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
          this.prev.previousElementSibling || this.slides.lastElementChild,
          this.prev,
          this.current,
        ];
      } else {
        [this.prev, this.current, this.next] = [
          this.current,
          this.next,
          // get the next slide, or if it's at the end, loop around and grab the first slide
          this.next.nextElementSibling || this.slides.firstElementChild,
        ];
      }

      this.applyClasses();
    };

    const mySlider = new Slider(document.querySelector('.image-slider'));

    window.addEventListener('keyup', function(e) {
      if (e.key === 'ArrowRight') {
        mySlider.move();
      }
      if (e.key === 'ArrowLeft') {
        mySlider.move('back');
      }
    });
  }, 1000);
