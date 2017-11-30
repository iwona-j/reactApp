import { ref } from '../config/constants'

export function addFriendRequest (userId, friendId) {
  let newFriendshipKey = ref.child('friends').push().key;
  let friendship = {
      userId,
      friendId,
      status: 'NEW'
  }

  return ref.child(`friends/${newFriendshipKey}`)
    .set(friendship)
    .then(() => friendship)
}

export function acceptFriendshipRequest (userId, friendId) {
    
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

export function getGift (giftId) {
  return ref.child(`gifts/${giftId}`)
    .once('value');
}

export function getUsersGiftList (userId) {
  return ref.child('gifts')
    .orderByChild('ownerId')
    .equalTo(userId).once('value');
}
