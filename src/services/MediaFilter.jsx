export default class MediaFilter {
    Filter(collection, filter) {
        let filteredCollection = [];
        for (let i = 0; i < collection.length; i++) {
            let itemDate = parseInt(collection[i].publicationDate.split('-')[0]);
            let rating = parseInt(collection[i].rating);
            let type = collection[i].type.name === "Book" ? 1 : 2;
            if (filter.YearRange !== null && (itemDate >= filter.YearRange.from && itemDate <= filter.YearRange.to)
                && filter.RatingRange !== null && (rating >= filter.RatingRange.from && rating <= filter.RatingRange.to)
                && (filter.MediaType & type) !== 0
                && collection[i].title.startsWith(filter.SearchName)) {

                filteredCollection.push(collection[i]);
            }
        }

        return filteredCollection;
    }
}