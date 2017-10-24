import { ref } from '../config/constants'

export function addGift (gift) {
  let newGiftKey = ref.child('gifts').push().key;
  gift.id = newGiftKey;

  return ref.child(`gifts/${newGiftKey}`)
    .set(gift)
    .then(() => gift)
}

export function editGift (gift) {
  return ref.child(`gifts/${gift.id}`)
    .set(gift)
    .then(() => gift)
}

export function removeGift (giftId) {
  return ref.child(`gifts/${giftId}`)
    .remove()
    .then()
}

export function getUsersGiftList (userId) {
  return ref.child('gifts')
    .orderByChild('userId')
    .equalTo(userId).once('value');
}