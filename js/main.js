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
}