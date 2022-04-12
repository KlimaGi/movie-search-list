# movie-search-list
This project is an improvisation of the WCC Academy task.

A search engine _autocomplete_ web component has been created that allows the user to select a movie from the matches of the entered phrase. The search component communicates with the Movie Information API.

The search box allows you to enter search text and provides possible options.
When you select one of the results, the component input text is updated as you choose.
The maximum number of dynamic search results to display is 8 movie listings.
The minimum number of characters that can trigger a dynamic search is 3. If this condition is met, any change to the character cancels the previous results and reactivates the dynamic search.
The component uses information obtained dynamically from the Movie Data API:
`GET: https://api.themoviedb.org/3/search/movie?api_key=**{api_key}**&language=en-US&query=**{search_text}**`

\_to_do:

1. Keep style descriptions tidy while avoiding unnecessary commands.
2. Use the _debounce_ function to prevent unnecessary queries to the movie database.
3. Do _error handling_ or _loading_.
4. Deploy.

Load project: npm start
