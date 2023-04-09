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
    let   pages   = pageNumbers(totalPages, maxPageVisible, currentPage);
    const buttons = new Map();

    let currentPageButton = null;

    const paginationButtonsContainer = document.createElement('div');
    paginationButtonsContainer.className = 'pagination-buttons';

    const createAndSetupButton = (text = '', buttonClass = '') => {
        const button = document.createElement('button');

        button.textContent = text;
        button.className = `page-btn ${buttonClass}`;

        return button;
    };

    buttons.set(
        createAndSetupButton('start', 'start-page'),
        (btn) => {}
    );

    buttons.set(
        createAndSetupButton('prev', 'prev-page'),
        (btn) => {}
    );

    pages.forEach((pageNumber) => {
        const isCurrentPage = pageNumber === currentPage;
        const button        = createAndSetupButton(pageNumber, isCurrentPage ? 'active' : '');

        buttons.set(
            button,
            (btn) => {}
        )
    });

    buttons.set(
        createAndSetupButton('next', 'next-page'),
        (btn) => {}
    );

    buttons.set(
        createAndSetupButton('end', 'end-page'),
        (btn) => {}
    );

    // _   => value
    // btn => key
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach

    buttons.forEach((_, btn) => {
        paginationButtonsContainer.appendChild(btn);
    });

    this.render = (container = document.body) => {
        container.appendChild(paginationButtonsContainer);
    };
}

const paginationButtons = new PaginationButtons(100);

paginationButtons.render();