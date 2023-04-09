const pageNumbers = (total, max, current) => {
    const half = Math.round(max / 2);

    let to = max;

    if (current + half >= total) {
        to = total;
    } else if (current > half) {
        to = current + half;
    }

    let from = to - max;

    // _ => undefined
    // i => index
    return Array.from({length: max}, (_, i) => (i + 1) + from);
};

function PaginationButtons(totalPages, maxPageVisible = 10, currentPage = 1) {
    let pages             = pageNumbers(totalPages, maxPageVisible, currentPage);
    let currentPageButton = null;

    const paginationButtonsContainer = document.createElement('div');
    paginationButtonsContainer.className = 'pagination-buttons';
    paginationButtonsContainer.textContent = 'container';

    this.render = (container = document.body) => {
        container.appendChild(paginationButtonsContainer);
    };
}

const paginationButtons = new PaginationButtons(100);

paginationButtons.render();