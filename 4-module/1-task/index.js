function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  document.body.append(ul);

  for (let item of friends) {
    ul.innerHTML += `<li>${item.firstName} ${item.lastName}</li>`
  }
  return ul;
}
