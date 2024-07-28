export default function getButtonsNameArray(currentPage: number, totalPages: number) {
  const maxButtons = 7;
  const array = [];
  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i += 1) {
      array.push(i);
    }
  } else if (currentPage < 5) {
    array.push(1, 2, 3, 4, 5, '...', totalPages);
  } else if (totalPages - currentPage < 4) {
    array.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    array.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
  }

  return array;
}
