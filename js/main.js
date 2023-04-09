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

    const createAndSetupButton = (text = '', buttonClass = '', disabled = false, handleClick = () => {}) => {
        const button = document.createElement('button');

        button.textContent = text;
        button.className   = `page-btn ${buttonClass}`;
        button.disabled    = disabled;

        button.addEventListener('click', e => {
            handleClick(e);
            this.update();
        });

        return button;
    };

    // Get the value of the button text and assign it to the value of the currentPage variable
    const onPageButtonClick = e => currentPage = Number(e.currentTarget.textContent);

    const onPageButtonUpdate = index => button => {
        button.textContent = pages[index];

        if (pages[index] === currentPage) {
            currentPageButton.classList.remove('active');
            button.classList.add('active');

            currentPageButton = button;
            currentPageButton.focus();
        }
    };

    buttons.set(
        createAndSetupButton('start', 'start-page', disabled.start(), () => currentPage = 1),
        (btn) => btn.disabled = disabled.start()
    );

    buttons.set(
        createAndSetupButton('prev', 'prev-page', disabled.prev(), () => currentPage -= 1),
        (btn) => btn.disabled = disabled.prev()
    );

    pages.forEach((pageNumber, index) => {
        const isCurrentPage = pageNumber === currentPage;
        const button        = createAndSetupButton(pageNumber, isCurrentPage ? 'active' : '', false, onPageButtonClick);

        if (isCurrentPage) {
            currentPageButton = button;
        }

        buttons.set(button, onPageButtonUpdate(index))
    });

    buttons.set(
        createAndSetupButton('next', 'next-page', disabled.next(), () => currentPage += 1),
        (btn) => btn.disabled = disabled.next()
    );

    buttons.set(
        createAndSetupButton('end', 'end-page', disabled.end(), () => currentPage = totalPages),
        (btn) => btn.disabled = disabled.end()
    );

    // _   => value
    // btn => key
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach

    buttons.forEach((_, btn) => fragment.appendChild(btn));

    this.render = (container = document.body) => {
        paginationButtonsContainer.appendChild(fragment);
        container.appendChild(paginationButtonsContainer);
    };

    this.update = (newPageNumber = currentPage) => {
        currentPage = newPageNumber;

        console.log('current page', currentPage);

        pages = pageNumbers(totalPages, maxPageVisible, currentPage);

        buttons.forEach((updateButton, button) => updateButton(button));
    }
}

const paginationButtons = new PaginationButtons(100);

paginationButtons.render();