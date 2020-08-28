class UserCard extends HTMLElement {
  constructor(props) {
    super(props);

    // let img = document.createElement('img'),
    //   container = document.createElement('div'),
    //   name = document.createElement('p'),
    //   email = document.createElement('p'),
    //   button = document.createElement('button');

    // img.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png';
    // img.className = 'image';

    // name.className = 'name';
    // name.innerText = 'UserName';

    // email.className = 'email';
    // email.innerText = 'brian.netmad@gmail.com';

    // button.className = 'button';
    // button.innerText = 'Follow';

    // container.append(name, email, button);
    // this.append(img, container)

    let shadow = this.attachShadow({ mode: 'closed' }),
      templageEl = document.querySelector('#userCardTemplate'),
      content = templageEl.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('avatar'));
    content.querySelector('.container>.name').appendChild(document.createTextNode(this.getAttribute('name')));
    content.querySelector('.container>.email').appendChild(document.createTextNode(this.getAttribute('email')));
    shadow.appendChild(content)
  }
}

window.customElements.define('user-card', UserCard);