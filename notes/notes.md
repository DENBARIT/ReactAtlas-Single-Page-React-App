Matching of different URLs to differnet UI Views
=>User clicks router link->URL is changed->DOM is updated:within that page no need of reloading the entired page 

we can use the global() function for the purpose of using css module designs in the app with out the need of importing the module 
:global(className)
as we used for the active
Part of the UI based on part of url
Nested Routes and  Index routes
part 10
using <Outlet> for the nested routes
we use index element for the default path

13.Params and QueryStrings 
Are used to pass data to the next  page to 
QueryString=>to store global state easily accessible 
useParams is for the dynamic path variables defined with a colon (/:id).                  useSearchParams is for the filtering options that come after the question mark (?).Here is a quick summary of how they operate in your code:1. useParams (The /:id path)It captures the ID of the specific city you click on. Without this parameter, the page cannot exist because it doesn't know which city details to load.URL: /app/cities/98443197Code: const { id } = useParams();Result: id equals "98443197".
2. useSearchParams (The ?lat=...&lng=... filters)It captures optional configurations like map locations or search sorting filters. If you delete these from the URL, the page still loads perfectly fine—it just resets your view.URL: /app/cities/98443197?lat=52.53&lng=13.37Code: const lat = searchParams.get("lat");Result: lat equals "52.53".

One Extra Bonus Difference
useParams is read-only: You can only change it by clicking a link to a new page.                 useSearchParams can write: You can use setSearchParams({ lat: 40, lng: -74 }) to programmatically update the URL filters without making the user leave the current page.