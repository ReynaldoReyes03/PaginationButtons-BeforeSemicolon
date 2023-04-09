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
    let pages = pageNumbers(totalPages, maxPageVisible, currentPage);
    console.log(pages);

    const buttons  = new Map();
    const fragment = document.createDocumentFragment();

    const disabled = {
        start: () => pages[0] === 1,
        prev : () => currentPage === 1,
        end  : () => pages.slice(-1)[0] === totalPages,
        next : () => currentPage === totalPages
    }

    const paginationButtonsContainer = document.createElement('div');
    paginationButtonsContainer.className = 'pagination-buttons';

    const createAndSetupButton = (text = '', buttonClass = '', disabled = false) => {
        const button = document.createElement('button');

        button.textContent = text;
        button.className   = `page-btn ${buttonClass}`;
        button.disabled    = disabled;

        return button;
    };

    buttons.set(
        createAndSetupButton('start', 'start-page', disabled.start()),
        (btn) => {}
    );

    buttons.set(
        createAndSetupButton('prev', 'prev-page', disabled.prev()),
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
        createAndSetupButton('next', 'next-page', disabled.next()),
        (btn) => {}
    );

    buttons.set(
        createAndSetupButton('end', 'end-page', disabled.end()),
        (btn) => {}
    );

    // _   => value
    // btn => key
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach

    buttons.forEach((_, btn) => fragment.appendChild(btn));

    this.render = (container = document.body) => {
        paginationButtonsContainer.appendChild(fragment);
        container.appendChild(paginationButtonsContainer);
    };
}

const paginationButtons = new PaginationButtons(100);

paginationButtons.render();