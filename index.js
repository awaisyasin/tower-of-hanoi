// Get elements from HTML
const leftColumn = document.querySelector('.left-column');
const centerColumn = document.querySelector('.center-column');
const rightColumn = document.querySelector('.right-column');
const disks = document.querySelectorAll('.disk');

// Initialize selected disk and selected column variables
let selectedDisk = null;
let selectedColumn = null;

// Add event listeners to columns
leftColumn.addEventListener('click', selectColumn);
centerColumn.addEventListener('click', selectColumn);
rightColumn.addEventListener('click', selectColumn);

// Function to select a column
function selectColumn(event) {
  const column = event.currentTarget;
  
  // If a disk is already selected, try to move it to the clicked column
  if (selectedDisk) {
    moveDisk(selectedDisk, selectedColumn, column);
    selectedDisk = null;
    selectedColumn = null;
    return;
  }
  
  // If no disk is selected, try to select the top disk in the clicked column
  const topDisk = getTopDisk(column);
  if (topDisk) {
    selectedDisk = topDisk;
    selectedColumn = column;
  }
}

// Function to get the top disk in a column
function getTopDisk(column) {
  const disks = column.querySelectorAll('.disk');
  let selectedDisk = null;
  for (let i = disks.length - 1; i >= 0; i--) {
    const disk = disks[i];
    if (!selectedDisk) {
      selectedDisk = disk;
    } else if (parseInt(disk.style.width) > parseInt(selectedDisk.style.width)) {
      selectedDisk = disk;
    }
  }
  return selectedDisk;
}

// Function to move a disk from one column to another
function moveDisk(disk, fromColumn, toColumn) {
  // Check if the move is valid
  const topDisk = getTopDisk(toColumn);
  if (topDisk && parseInt(topDisk.style.width) < parseInt(disk.style.width)) {
    alert('You cannot place larger disk on a smaller disk');
    return;
  }
  
  // Remove the disk from the "from" column and add it to the "to" column
  fromColumn.removeChild(disk);
  toColumn.appendChild(disk);

  // Set the position of the moved disk to be below the largest disk in the new column
  const largestDisk = getTopDisk(toColumn);
  if (largestDisk && largestDisk !== disk) {
    disk.style.bottom = `${parseInt(largestDisk.style.bottom) + parseInt(largestDisk.style.height)}px`;
  } else {
    disk.style.bottom = '0px';
  }
  
  // Check if the game is won
  if (rightColumn.childElementCount === disks.length) {
    const numberOfMoves = Math.pow(2, disks.length) - 1;
    alert(`Congratulations, you won the game in ${numberOfMoves} moves!`);
  }
}