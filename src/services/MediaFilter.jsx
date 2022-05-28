export default class MediaFilter {
    Filter(collection, filter) {
        const filteredCollection = [];
        for (let i = 0; i < collection.length; i++) {
            let itemDate = parseInt(collection[i].publicationDate.split('-')[0]);
            let rating = parseFloat(collection[i].rating);
            let type = collection[i].type.name === "Book" ? 1 : 2;
            if ((!("yearsFrom" in filter) || itemDate >= filter.yearsFrom)
                && (!("yearsTo" in filter) || itemDate <= filter.yearsTo)
                && (!("ratingFrom" in filter) || rating >= filter.ratingFrom)
                && (!("ratingTo" in filter) || rating <= filter.ratingTo)
                && (!("mediaType" in filter) || (filter.mediaType & type) !== 0)
                && (!("title" in filter) || collection[i].title.startsWith(filter.title))
            ) {
                filteredCollection.push(collection[i]);
            }
        }

        return filteredCollection;
    }
}