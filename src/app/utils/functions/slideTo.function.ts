export function slideTo(id: string ) {
  const itemToScrollTo = document.getElementById(id);
  // null check to ensure that the element actually exists
  if (itemToScrollTo) {
    itemToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth', inline: 'nearest'});
  }
}
